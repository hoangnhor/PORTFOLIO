import { useEffect, useMemo, useState } from "react";
import "../assets/styles/homePage.css";
import { staticProfile } from "../data/staticProfile";
import MainLayout from "../layouts/MainLayout";
import { getPortfolioProjects } from "../services/portfolioApi";

const emptyPortfolio = {
  ...staticProfile,
  projects: []
};

function normalizeProjects(projects) {
  return Array.isArray(projects) ? projects : [];
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
  if (!text) {
    return "";
  }

  return String(text)
    .replaceAll("Web Developer", "Lập trình viên Website")
    .replaceAll("Fullstack Developer", "Lập trình viên Fullstack")
    .replaceAll("Intern", "Thực tập sinh")
    .replaceAll("(Independent Project)", "(Dự án cá nhân)");
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
  const githubGeneral = githubCandidates.find((link) => /^github$/i.test(String(link?.label || "").trim())) || null;
  const githubFe = githubCandidates.find((link) => /fe|frontend/i.test(String(link?.label || ""))) || null;
  const githubBe = githubCandidates.find((link) => /be|backend/i.test(String(link?.label || ""))) || null;
  const githubLink = githubGeneral || githubFe || githubBe || githubCandidates[0] || null;

  const actions = [];
  if (demoLink) {
    actions.push({ label: "Demo", url: demoLink.url, kind: "demo" });
  }
  if (githubLink && githubLink.url !== demoLink?.url) {
    const githubOptions = [];
    if (githubFe) {
      githubOptions.push({ label: "GitHub FE", url: githubFe.url });
    }
    if (githubBe && githubBe.url !== githubFe?.url) {
      githubOptions.push({ label: "GitHub BE", url: githubBe.url });
    }

    actions.push({
      label: "GitHub",
      url: githubLink.url,
      kind: "github",
      options: githubOptions.length >= 2 ? githubOptions : []
    });
  }
  if (!actions.length && links[0]) {
    actions.push({ label: links[0].label || "Link", url: links[0].url, kind: "link" });
  }

  return actions;
}

function HomePage() {
  const [portfolio, setPortfolio] = useState(emptyPortfolio);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isActive = true;

    async function loadProjects() {
      try {
        const projects = await getPortfolioProjects();
        if (!isActive) {
          return;
        }
        setPortfolio({ ...staticProfile, projects: normalizeProjects(projects) });
      } catch {
        if (!isActive) {
          return;
        }
        setErrorMessage("Không tải được dữ liệu dự án từ cơ sở dữ liệu.");
        setPortfolio(emptyPortfolio);
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    loadProjects();
    return () => {
      isActive = false;
    };
  }, []);

  const displayPortfolio = useMemo(() => ({ ...staticProfile, ...portfolio, projects: normalizeProjects(portfolio.projects) }), [portfolio]);

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

  const { firstName, lastName } = useMemo(() => splitDisplayName(displayPortfolio.fullName), [displayPortfolio.fullName]);

  const techList = useMemo(() => {
    const allItems = displayPortfolio.skills.flatMap((skill) => (Array.isArray(skill.items) ? skill.items : []));
    return Array.from(new Set(allItems.map((item) => String(item).trim()).filter(Boolean)));
  }, [displayPortfolio.skills]);

  const tickerText = techList.length ? `${techList.join(" · ")} ·` : "Đang cập nhật ·";
  const localizedHeadline = localizeRoleText(displayPortfolio.headline);

  const githubLink = displayPortfolio.socials.find((item) => String(item.label || "").toLowerCase().includes("github")) || null;
  const liveLink =
    displayPortfolio.socials.find((item) => {
      const label = String(item.label || "").toLowerCase();
      return label.includes("demo") || label.includes("live");
    }) || displayPortfolio.socials[0] || null;
  const emailLink = displayPortfolio.email ? { label: "Email", url: `mailto:${displayPortfolio.email}` } : null;
  const heroLinks = [githubLink, liveLink, emailLink].filter(Boolean);

  const expEntries = [
    ...displayPortfolio.experiences,
    ...displayPortfolio.education.map((edu) => ({
      company: edu.school,
      role: edu.track ? `Cử nhân CNTT - ${edu.track}` : "Cử nhân CNTT",
      period: edu.period,
      description: edu.major ? `Chuyên ngành: ${edu.major}` : "Học vấn",
      details: []
    }))
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
  }

  return (
    <MainLayout>
      <div className="portfolio-page">
        <nav>
          <div className="nav-mark">{displayPortfolio.fullName}</div>
          <div className="nav-right">
            <a href="#skills" className="nav-link" onClick={(event) => handleNavScroll(event, "skills")}>
              Kỹ năng
            </a>
            <a href="#projects" className="nav-link" onClick={(event) => handleNavScroll(event, "projects")}>
              Dự án
            </a>
            <a href="#exp" className="nav-link" onClick={(event) => handleNavScroll(event, "exp")}>
              Kinh nghiệm
            </a>
            <a href="#contact" className="nav-link" onClick={(event) => handleNavScroll(event, "contact")}>
              Liên hệ
            </a>
            <div className="nav-avail">
              <div className="nav-avail-dot" />
              Sẵn sàng làm việc
            </div>
          </div>
        </nav>

        {isLoading ? <div className="data-status">Đang tải dữ liệu dự án...</div> : null}
        {!isLoading && errorMessage ? <div className="data-status data-status-error">{errorMessage}</div> : null}

        <div className="hero">
          <div className="hero-left fade-in">
            <div className="hero-eyebrow">Hồ sơ 2026</div>
            <div className="hero-name-block">
              <div>
                <div className="hero-fname">{firstName}</div>
                <div className="hero-lname">{lastName}</div>
              </div>
              <div className="hero-label">
                <div className="hero-label-text">{localizedHeadline}</div>
                <div className="hero-label-sub">{displayPortfolio.location}</div>
              </div>
            </div>
            <div className="hero-bottom">
              <div className="hero-stat">
                <div className="hero-stat-n">{displayPortfolio.projects.length}+</div>
                <div className="hero-stat-l">Dự án thực tế</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-n">{expEntries.length}</div>
                <div className="hero-stat-l">Kinh nghiệm</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-n">{techList.length}+</div>
                <div className="hero-stat-l">Công nghệ</div>
              </div>
            </div>
          </div>

          <div className="hero-right fade-in">
            <p className="hero-desc">
              {displayPortfolio.intro} {displayPortfolio.careerObjective || ""}
            </p>
            <div className="hero-links">
              {heroLinks.map((link) => {
                const openInNewTab = isHttpUrl(link.url);
                return (
                  <a
                    key={`${link.label}-${link.url}`}
                    href={link.url}
                    className="hero-link"
                    target={openInNewTab ? "_blank" : undefined}
                    rel={openInNewTab ? "noreferrer" : undefined}
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
                    {actionLinks.map((action) => {
                      const hasOptions = Array.isArray(action.options) && action.options.length > 0;
                      if (!hasOptions) {
                        return (
                          <a
                            key={`${project.title}-${action.kind}-${action.url}`}
                            href={action.url}
                            className="project-action-link"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <span>{action.label}</span>
                            <span className="project-action-arrow">↗</span>
                          </a>
                        );
                      }

                      return (
                        <details className="project-action-menu" key={`${project.title}-${action.kind}-${action.url}`}>
                          <summary className="project-action-link project-action-link-parent">
                            <span>{action.label}</span>
                            <span className="project-action-arrow">▾</span>
                          </summary>
                          <div className="project-action-submenu">
                            {action.options.map((option) => (
                              <a
                                key={`${project.title}-${action.kind}-${option.url}`}
                                href={option.url}
                                className="project-action-sublink"
                                target="_blank"
                                rel="noreferrer"
                              >
                                {option.label}
                              </a>
                            ))}
                          </div>
                        </details>
                      );
                    })}
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
                  <div className="exp-bullet">{entry.description}</div>
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
                Tìm kiếm cơ hội Fresher / Intern.
                <br />
                Sẵn sàng bắt đầu ngay.
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
              <div className="contact-row">
                <div className="contact-row-label">Email</div>
                <div className="contact-row-val">
                  {displayPortfolio.email ? <a href={`mailto:${displayPortfolio.email}`}>{displayPortfolio.email}</a> : "Chưa cập nhật"}
                </div>
              </div>
              <div className="contact-row">
                <div className="contact-row-label">Điện thoại</div>
                <div className="contact-row-val">
                  {displayPortfolio.phone ? <a href={`tel:${displayPortfolio.phone}`}>{displayPortfolio.phone}</a> : "Chưa cập nhật"}
                </div>
              </div>
              {githubLink ? (
                <div className="contact-row">
                  <div className="contact-row-label">GitHub</div>
                  <div className="contact-row-val">
                    <a href={githubLink.url} target="_blank" rel="noreferrer">
                      {formatLinkValue(githubLink.url)}
                    </a>
                  </div>
                </div>
              ) : null}
              <div className="contact-row">
                <div className="contact-row-label">Địa điểm</div>
                <div className="contact-row-val">{displayPortfolio.location}</div>
              </div>
              <div className="contact-row">
                <div className="contact-row-label">Trạng thái</div>
                <div className="contact-row-val contact-status">Sẵn sàng làm việc - Fresher / Intern</div>
              </div>
            </div>
          </div>
        </div>

        <footer>
          <div className="footer-copy">© 2026 {displayPortfolio.fullName}</div>
          <div className="footer-made">Thành phố Hồ Chí Minh, Việt Nam</div>
        </footer>
      </div>
    </MainLayout>
  );
}

export default HomePage;
