import { useEffect, useMemo, useRef, useState } from "react";
import "../assets/styles/homePage.css";
import { portfolioData } from "../data/portfolioData";
import MainLayout from "../layouts/MainLayout";
import { getPortfolioDynamicSections } from "../services/portfolioApi";

const emptyPortfolio = {
  skills: portfolioData.skills || [],
  projects: portfolioData.projects || [],
  experiences: portfolioData.experiences || []
};

function normalizeProjectTitle(title) {
  return String(title || "")
    .toLowerCase()
    .replace(/[–—]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeProjects(projects) {
  if (!Array.isArray(projects)) {
    return [];
  }

  const projectPriority = {
    "cmms - asset & maintenance management system": 1,
    "cmms – asset & maintenance management system": 1,
    "petshop - e-commerce pet store website": 2,
    "petshop – e-commerce pet store website": 2
  };

  return projects
    .filter((project) => {
      const title = normalizeProjectTitle(project?.title);
      return Boolean(projectPriority[title]);
    })
    .sort((a, b) => {
    const aPriority = projectPriority[normalizeProjectTitle(a?.title)] || 99;
    const bPriority = projectPriority[normalizeProjectTitle(b?.title)] || 99;
    return aPriority - bPriority;
  });
}

function mergeProjectsWithStatic(apiProjects) {
  const apiMap = new Map(
    (Array.isArray(apiProjects) ? apiProjects : []).map((project) => [normalizeProjectTitle(project?.title), project])
  );

  return (portfolioData.projects || []).map((staticProject) => {
    const apiProject = apiMap.get(normalizeProjectTitle(staticProject.title));
    if (!apiProject) {
      return staticProject;
    }
    return {
      ...apiProject,
      ...staticProject
    };
  });
}

function splitDisplayName(fullName) {
  const safeName = (fullName || "").trim();
  if (!safeName) {
    return { firstName: "", lastName: "" };
  }

  const parts = safeName.split(/\s+/);
  return {
    firstName: parts[0] || "",
    lastName: parts.slice(1).join(" ")
  };
}

function formatLinkValue(url) {
  if (!url) {
    return "";
  }
  if (url.startsWith("mailto:")) {
    return url.slice(7);
  }
  if (url.startsWith("tel:")) {
    return url.slice(4);
  }
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function isHttpUrl(url) {
  return /^https?:\/\//i.test(String(url || "").trim());
}

function localizeRoleText(text) {
  return text || "";
}

function smoothScrollTo(targetTop, duration = 650) {
  const startY = window.scrollY;
  const deltaY = targetTop - startY;
  if (Math.abs(deltaY) < 2) {
    return;
  }

  let startTime = null;
  const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  const step = (timestamp) => {
    if (startTime === null) {
      startTime = timestamp;
    }
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);
    window.scrollTo(0, startY + deltaY * eased);

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };

  window.requestAnimationFrame(step);
}

function getProjectActionLinks(project) {
  const links = Array.isArray(project?.links)
    ? project.links.filter((link) => isHttpUrl(link?.url))
    : [];

  const demoLink = links.find((link) => /demo|live/i.test(String(link?.label || ""))) || null;
  const githubCandidates = links.filter((link) => {
    const label = String(link?.label || "").toLowerCase();
    const url = String(link?.url || "").toLowerCase();
    return label.includes("github") || url.includes("github.com");
  });
  const githubFe = githubCandidates.find((link) => /fe|frontend/i.test(String(link?.label || ""))) || null;
  const githubBe = githubCandidates.find((link) => /be|backend/i.test(String(link?.label || ""))) || null;
  const githubGeneral = githubCandidates.find((link) => /^github$/i.test(String(link?.label || "").trim())) || null;

  const actions = [];
  if (demoLink) {
    actions.push({ label: "Demo", url: demoLink.url, kind: "demo" });
  }
  if (githubFe) {
    actions.push({ label: "Frontend", url: githubFe.url, kind: "frontend" });
  }
  if (githubBe && githubBe.url !== githubFe?.url) {
    actions.push({ label: "Backend", url: githubBe.url, kind: "backend" });
  }
  if (!githubFe && !githubBe && githubGeneral) {
    actions.push({ label: "GitHub", url: githubGeneral.url, kind: "github" });
  }
  if (!actions.length && links[0]) {
    actions.push({ label: links[0].label || "Link", url: links[0].url, kind: "link" });
  }

  return actions;
}

function toFriendlyError(error) {
  if (error?.code === "TIMEOUT") {
    return "Kết nối đến máy chủ quá chậm. Vui lòng thử lại.";
  }
  if (error?.code === "HTTP_ERROR") {
    return `Không tải được dữ liệu dự án (HTTP ${error.status || "?"}).`;
  }
  return "Không tải được dữ liệu dự án từ cơ sở dữ liệu.";
}

function HomePage() {
  const [portfolio, setPortfolio] = useState(emptyPortfolio);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("skills");
  const isMountedRef = useRef(true);

  async function loadProjects(skipCache = false) {
    if (!isMountedRef.current) {
      return;
    }
    setIsLoading(true);
    setErrorMessage("");

    try {
      const dynamicData = await getPortfolioDynamicSections({ skipCache });
      const normalizedProjects = normalizeProjects(dynamicData.projects);
      const mergedProjects = mergeProjectsWithStatic(normalizedProjects);
      if (!isMountedRef.current) {
        return;
      }

      setPortfolio({
        skills: Array.isArray(dynamicData.skills) && dynamicData.skills.length ? dynamicData.skills : portfolioData.skills || [],
        projects: mergedProjects.length ? mergedProjects : portfolioData.projects || [],
        experiences:
          Array.isArray(dynamicData.experiences) && dynamicData.experiences.length
            ? dynamicData.experiences
            : portfolioData.experiences || []
      });
    } catch (error) {
      if (!isMountedRef.current) {
        return;
      }
      setErrorMessage(toFriendlyError(error));
      setPortfolio({
        skills: portfolioData.skills || [],
        projects: portfolioData.projects || [],
        experiences: portfolioData.experiences || []
      });
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  }

  useEffect(() => {
    isMountedRef.current = true;
    loadProjects(false);

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const displayPortfolio = useMemo(
    () => ({
      ...portfolioData,
      skills: Array.isArray(portfolio.skills) && portfolio.skills.length ? portfolio.skills : portfolioData.skills,
      projects: normalizeProjects(portfolio.projects),
      experiences: Array.isArray(portfolio.experiences) && portfolio.experiences.length ? portfolio.experiences : portfolioData.experiences
    }),
    [portfolio]
  );

  useEffect(() => {
    const fadeInElements = document.querySelectorAll(".fade-in");
    if (!fadeInElements.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    fadeInElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [displayPortfolio]);

  useEffect(() => {
    const sectionIds = ["skills", "projects", "exp", "contact"];
    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sectionElements.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length) {
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0.15, 0.35, 0.6]
      }
    );

    sectionElements.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const techList = useMemo(() => {
    const allItems = displayPortfolio.skills.flatMap((skill) => (Array.isArray(skill.items) ? skill.items : []));
    return Array.from(new Set(allItems.map((item) => String(item).trim()).filter(Boolean)));
  }, [displayPortfolio.skills]);

  const tickerText = techList.length ? `${techList.join(" · ")} ·` : "Đang cập nhật ·";
  const localizedHeadline = localizeRoleText(displayPortfolio.headline);

  const githubLink = displayPortfolio.socials.find((item) => String(item.label || "").toLowerCase().includes("github")) || null;
  const websiteLink = displayPortfolio.socials.find((item) => String(item.label || "").toLowerCase().includes("website")) || null;
  const cmmsDemoLink =
    displayPortfolio.socials.find((item) => String(item.label || "").toLowerCase().includes("cmms demo")) || null;
  const petshopDemoLink =
    displayPortfolio.socials.find((item) => String(item.label || "").toLowerCase().includes("petshop demo")) || null;
  const emailLink = displayPortfolio.email ? { label: "Email", url: `mailto:${displayPortfolio.email}` } : null;
  const cvLink = displayPortfolio.resumeUrl ? { label: "CV", url: displayPortfolio.resumeUrl } : null;
  const heroLinks = [githubLink, cmmsDemoLink, petshopDemoLink, cvLink, emailLink].filter(Boolean);

  const expEntries = [
    ...displayPortfolio.experiences,
    ...displayPortfolio.education.map((edu) => ({
      company: edu.school,
      role: edu.track || "Kỹ sư Công nghệ Thông tin",
      period: edu.period,
      description: "",
      details: Array.isArray(edu.details) ? edu.details : []
    }))
  ];
  const contactRows = [
    {
      label: "Email",
      content: displayPortfolio.email ? <a href={`mailto:${displayPortfolio.email}`}>{displayPortfolio.email}</a> : "Chưa cập nhật"
    },
    {
      label: "Phone",
      content: displayPortfolio.phone ? <a href={`tel:${displayPortfolio.phone}`}>{displayPortfolio.phone}</a> : "Chưa cập nhật"
    },
    ...(displayPortfolio.resumeUrl
      ? [
          {
            label: "CV",
            content: (
              <a href={displayPortfolio.resumeUrl} target="_blank" rel="noopener noreferrer">
                Xem CV
              </a>
            )
          }
        ]
      : []),
    ...(websiteLink
      ? [
          {
            label: "Website",
            content: (
              <a href={websiteLink.url} target="_blank" rel="noopener noreferrer">
                {formatLinkValue(websiteLink.url)}
              </a>
            )
          }
        ]
      : []),
    ...(githubLink
      ? [
          {
            label: "GitHub",
            content: (
              <a href={githubLink.url} target="_blank" rel="noopener noreferrer">
                {formatLinkValue(githubLink.url)}
              </a>
            )
          }
        ]
      : []),
    {
      label: "Location",
      content: displayPortfolio.location
    },
    {
      label: "Availability",
      content: "Available full-time — Fresher Fullstack Developer",
      valueClassName: "contact-status"
    }
  ];

  function handleNavScroll(event, targetId) {
    event.preventDefault();
    const target = document.getElementById(targetId);
    if (!target) {
      return;
    }

    const navbar = document.querySelector(".portfolio-page nav");
    const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 0;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 12;

    smoothScrollTo(targetTop);
    setActiveSection(targetId);
    setIsMobileMenuOpen(false);
  }

  return (
    <MainLayout>
      <div className="portfolio-page">
        <a className="skip-link" href="#main-content">
          Bỏ qua điều hướng
        </a>
        <nav aria-label="Điều hướng hồ sơ">
          <div className="nav-mark">{displayPortfolio.fullName}</div>
          <button
            type="button"
            className="nav-mobile-toggle"
            aria-label="Mở menu điều hướng"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            <span className={`hamburger ${isMobileMenuOpen ? "is-open" : ""}`} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
          <button
            type="button"
            className={`nav-mobile-overlay ${isMobileMenuOpen ? "is-open" : ""}`}
            aria-label="Đóng menu"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className={`nav-right ${isMobileMenuOpen ? "is-open" : ""}`}>
            <a
              href="#skills"
              className={`nav-link ${activeSection === "skills" ? "is-active" : ""}`}
              onClick={(event) => handleNavScroll(event, "skills")}
            >
              Kỹ năng
            </a>
            <a
              href="#projects"
              className={`nav-link ${activeSection === "projects" ? "is-active" : ""}`}
              onClick={(event) => handleNavScroll(event, "projects")}
            >
              Dự án
            </a>
            <a
              href="#exp"
              className={`nav-link ${activeSection === "exp" ? "is-active" : ""}`}
              onClick={(event) => handleNavScroll(event, "exp")}
            >
              Kinh nghiệm
            </a>
            <a
              href="#contact"
              className={`nav-link ${activeSection === "contact" ? "is-active" : ""}`}
              onClick={(event) => handleNavScroll(event, "contact")}
            >
              Liên hệ
            </a>
            <a
              href="#contact"
              className={`nav-cta ${activeSection === "contact" ? "is-active" : ""}`}
              onClick={(event) => handleNavScroll(event, "contact")}
            >
              Hire Me
            </a>
          </div>
        </nav>

        {isLoading ? (
          <div className="data-status" role="status" aria-live="polite">
            Đang tải dữ liệu kỹ năng, dự án, kinh nghiệm...
          </div>
        ) : null}
        {!isLoading && errorMessage ? (
          <div className="data-status data-status-error" role="alert" aria-live="assertive">
            {errorMessage}
            <button
              type="button"
              className="project-action-link"
              onClick={() => loadProjects(true)}
              style={{ marginLeft: 12 }}
              aria-label="Thử tải lại dữ liệu kỹ năng, dự án và kinh nghiệm"
              disabled={isLoading}
            >
              Thử lại
            </button>
          </div>
        ) : null}
        <main id="main-content">
          <div className="hero">
          <div className="hero-left fade-in">
            <div className="hero-eyebrow">Hồ sơ 2026</div>
            <div className="hero-name-block">
              <div>
                <div className="hero-fname">{displayPortfolio.fullName}</div>
              </div>
              <div className="hero-label">
                <div className="hero-label-text">{localizedHeadline}</div>
                <div className="hero-label-sub">{displayPortfolio.location}</div>
              </div>
            </div>
            <div className="hero-bottom">
              <div className="hero-stat">
                <div className="hero-stat-n">{displayPortfolio.projects.length}</div>
                <div className="hero-stat-l">Hệ thống fullstack</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-n">6</div>
                <div className="hero-stat-l">Module CMMS</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-n">10+</div>
                <div className="hero-stat-l">MongoDB collections</div>
              </div>
            </div>
          </div>

          <div className="hero-right fade-in">
            <p className="hero-desc">{displayPortfolio.careerObjective || displayPortfolio.intro}</p>
            <div className="hero-quick-actions">
              {displayPortfolio.resumeUrl ? (
                <a href={displayPortfolio.resumeUrl} className="hero-quick-btn hero-quick-btn-primary" target="_blank" rel="noopener noreferrer">
                  Download CV
                </a>
              ) : null}
              {githubLink ? (
                <a href={githubLink.url} className="hero-quick-btn" target="_blank" rel="noopener noreferrer">
                  View GitHub
                </a>
              ) : null}
              {displayPortfolio.email ? (
                <a href={`mailto:${displayPortfolio.email}`} className="hero-quick-btn">
                  Contact Me
                </a>
              ) : null}
            </div>
            <div className="hero-links">
              {heroLinks.map((link) => {
                const openInNewTab = isHttpUrl(link.url);
                return (
                  <a
                    key={`${link.label}-${link.url}`}
                    href={link.url}
                    className="hero-link"
                    target={openInNewTab ? "_blank" : undefined}
                    rel={openInNewTab ? "noopener noreferrer" : undefined}
                  >
                    <div className="hero-link-left">
                      <span className="hero-link-label">{link.label}</span>
                      <span className="hero-link-val">{formatLinkValue(link.url)}</span>
                    </div>
                    <span className="hero-link-arrow">↗</span>
                  </a>
                );
              })}
            </div>
          </div>
          </div>

          <div className="divider-bar">
          <div className="divider-text">Công nghệ</div>
          <div className="divider-ticker">
            <span className="ticker-item">{tickerText}</span>
            <span className="ticker-item">{tickerText}</span>
          </div>
          </div>

          <div className="skills-section" id="skills">
          <div className="skills-sidebar fade-in">
            <div>
              <div className="section-number">02 - Kỹ năng</div>
              <div className="section-title-v">
                Kỹ
                <br />
                <em>năng</em>
              </div>
            </div>
          </div>
          <div className="skills-body">
            {displayPortfolio.skills.map((skillGroup) => (
              <div className="skill-row" key={skillGroup.category}>
                <div className="skill-row-head">
                  <div className="skill-row-cat">{skillGroup.category}</div>
                  <div className="skill-row-line" />
                </div>
                <div className="skill-chips">
                  {skillGroup.items.map((item, itemIndex) => (
                    <div className={`chip ${itemIndex < 2 ? "accent" : ""}`} key={`${skillGroup.category}-${item}`}>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          </div>

          <div className="projects-section" id="projects">
          <div className="projects-header">
            <div className="projects-title">
              Dự án
              <br />
              <em>nổi bật</em>
            </div>
            <div className="projects-count">{String(displayPortfolio.projects.length).padStart(2, "0")} dự án</div>
          </div>

          {displayPortfolio.projects.map((project, index) => {
            const actionLinks = getProjectActionLinks(project);
            return (
              <div className="project-item" key={`${project.title}-${index}`}>
                <div className="project-num-col">{String(index + 1).padStart(2, "0")}</div>
                <div className="project-main-col">
                  <div className="project-tag-row">
                    <span className={`project-tag ${project.featured ? "red" : ""}`}>{project.featured ? "Thực tế" : "Dự án"}</span>
                    <span className="project-tag">{localizeRoleText(project.role) || "Đang cập nhật"}</span>
                    <span className="project-tag">{project.period || "Chưa cập nhật"}</span>
                  </div>
                  <div className="project-name">{project.title}</div>
                  <p className="project-desc">{project.summary}</p>
                  {Array.isArray(project.highlights) && project.highlights.length ? (
                    <div className="project-highlights">
                      {project.highlights.map((highlight, highlightIndex) => (
                        <div className="project-highlight" key={`${project.title}-highlight-${highlightIndex}`}>
                          {highlight}
                        </div>
                      ))}
                    </div>
                  ) : null}
                  <div className="project-stack-row">
                    {(project.stack || []).map((stackItem) => (
                      <span className="stack-tag" key={`${project.title}-${stackItem}`}>
                        {stackItem}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="project-action-col">
                  <div className="project-action-list">
                    {actionLinks.map((action) => (
                      <a
                        key={`${project.title}-${action.kind}-${action.url}`}
                        href={action.url}
                        className="project-action-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>{action.label}</span>
                        <span className="project-action-arrow">↗</span>
                      </a>
                    ))}
                    {!actionLinks.length ? <span className="project-action-link project-action-link-disabled">Chưa có link</span> : null}
                  </div>
                </div>
              </div>
            );
          })}
          </div>

          <div className="exp-section" id="exp">
          <div className="exp-sidebar fade-in">
            <div className="section-number">03 - Kinh nghiệm</div>
            <div className="section-title-v">
              Kinh
              <br />
              <em>nghiệm</em>
            </div>
          </div>
          <div className="exp-body">
            {expEntries.map((entry, index) => (
              <div className="exp-entry" key={`${entry.company}-${index}`}>
                <div className="exp-meta">
                  <div className="exp-co">{entry.company}</div>
                  <div className="exp-period">{entry.period}</div>
                </div>
                <div className="exp-role">{localizeRoleText(entry.role)}</div>
                <div className="exp-bullets">
                  {entry.description ? <div className="exp-bullet">{entry.description}</div> : null}
                  {(entry.details || []).map((detail, detailIndex) => (
                    <div className="exp-bullet" key={`${entry.company}-detail-${detailIndex}`}>
                      {detail}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          </div>

          <div className="contact-section" id="contact">
          <div className="contact-left fade-in">
            <div>
              <div className="contact-big">
                Cùng
                <br />
                <em>xây dựng</em>
                <br />
                sản phẩm.
              </div>
              <p className="contact-sub">
                Tìm kiếm cơ hội Fresher Fullstack Developer.
                <br />
                Sẵn sàng làm việc full-time.
              </p>
            </div>
            {displayPortfolio.email ? (
              <a href={`mailto:${displayPortfolio.email}`} className="contact-cta">
                Gửi email ngay →
              </a>
            ) : (
              <span className="contact-cta">Email đang cập nhật</span>
            )}
          </div>

          <div className="contact-right fade-in">
            <div className="contact-info-rows">
              {contactRows.map((row) => (
                <div className="contact-row" key={row.label}>
                  <div className="contact-row-label">{row.label}</div>
                  <div className={`contact-row-val ${row.valueClassName || ""}`.trim()}>{row.content}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </main>

        <footer>
          <div className="footer-copy">© 2026 {displayPortfolio.fullName}</div>
          <div className="footer-made">Thành phố Hồ Chí Minh, Việt Nam</div>
        </footer>
      </div>
    </MainLayout>
  );
}

export default HomePage;


