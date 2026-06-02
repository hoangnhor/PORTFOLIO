import { useEffect, useMemo, useState } from "react";
import "../assets/styles/homePage.css";
import MainLayout from "../layouts/MainLayout";
import { useActiveSection } from "../hooks/useActiveSection";
import { useOverflowGuard } from "../hooks/useOverflowGuard";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { HOME_UI } from "../config/homeUiConfig";
import ContactSection from "../components/home/ContactSection";
import ExperienceSection from "../components/home/ExperienceSection";
import HeroSection from "../components/home/HeroSection";
import ProjectsSection from "../components/home/ProjectsSection";
import SkillsSection from "../components/home/SkillsSection";
import {
  formatLinkValue,
  getProjectActionLinks,
  getProjectTypeTag,
  isHttpUrl,
  localizeRoleText,
  localizeSkillCategory,
  localizeSkillItem,
  smoothScrollTo
} from "../utils/homePageUtils";

function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { activeSection, setActiveSection } = useActiveSection();
  const hasHorizontalOverflow = useOverflowGuard();
  const { displayPortfolio, errorMessage, usingLocalFallback, loadProjects } = usePortfolioData();

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
      label: "EMAIL",
      content: displayPortfolio.email ? <a href={`mailto:${displayPortfolio.email}`}>{displayPortfolio.email}</a> : "Chưa cập nhật"
    },
    {
      label: "PHONE",
      content: displayPortfolio.phone ? <a href={`tel:${displayPortfolio.phone}`}>{displayPortfolio.phone}</a> : "Chưa cập nhật"
    },
    ...(githubLink
      ? [
          {
            label: "GITHUB",
            content: (
              <a href={githubLink.url} target="_blank" rel="noopener noreferrer">
                {formatLinkValue(githubLink.url)}
              </a>
            )
          }
        ]
      : []),
    ...(websiteLink
      ? [
          {
            label: "WEBSITE",
            content: (
              <a href={websiteLink.url} target="_blank" rel="noopener noreferrer">
                {formatLinkValue(websiteLink.url)}
              </a>
            )
          }
        ]
      : []),
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
    {
      label: "LOCATION",
      content: displayPortfolio.location
    },
    {
      label: "STATUS",
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
            {HOME_UI.navItems.map((item) => (
              <a
                key={item.key}
                href={`#${item.target}`}
                className={`nav-link ${activeSection === item.key ? "is-active" : ""}`}
                onClick={(event) => handleNavScroll(event, item.target)}
              >
                {item.label}
              </a>
            ))}
            <a
              href={`#${HOME_UI.navCta.target}`}
              className={`nav-cta ${activeSection === HOME_UI.navCta.target ? "is-active" : ""}`}
              onClick={(event) => handleNavScroll(event, HOME_UI.navCta.target)}
            >
              {HOME_UI.navCta.label}
            </a>
          </div>
        </nav>

        {errorMessage ? (
          <div className="data-status data-status-error" role="alert" aria-live="assertive">
            {errorMessage}
            <span style={{ marginLeft: 12 }}>{HOME_UI.apiStatus.fallback}</span>
            <button
              type="button"
              className="project-action-link"
              onClick={() => loadProjects(true)}
              style={{ marginLeft: 12 }}
              aria-label="Thử tải lại dữ liệu kỹ năng, dự án và kinh nghiệm"
            >
              Thử lại
            </button>
          </div>
        ) : null}
        {!errorMessage && usingLocalFallback ? (
          <div className="data-status data-status-error" role="status" aria-live="polite">
            {HOME_UI.apiStatus.fallback}
          </div>
        ) : null}
        {import.meta.env.DEV && hasHorizontalOverflow ? (
          <div className="data-status data-status-error" role="status" aria-live="polite">
            Responsive warning: horizontal overflow detected.
          </div>
        ) : null}
        <main id="main-content">
          <HeroSection
            displayPortfolio={displayPortfolio}
            localizedHeadline={localizedHeadline}
            githubLink={githubLink}
            heroLinks={heroLinks}
            formatLinkValue={formatLinkValue}
            isHttpUrl={isHttpUrl}
            handleNavScroll={handleNavScroll}
          />

          <div className="divider-bar">
          <div className="divider-text">Technologies</div>
          <div className="divider-ticker">
            <span className="ticker-item">{tickerText}</span>
            <span className="ticker-item">{tickerText}</span>
          </div>
          </div>

          <SkillsSection
            displayPortfolio={displayPortfolio}
            localizeSkillCategory={localizeSkillCategory}
            localizeSkillItem={localizeSkillItem}
          />

          <ProjectsSection
            displayPortfolio={displayPortfolio}
            getProjectActionLinks={getProjectActionLinks}
            getProjectTypeTag={getProjectTypeTag}
            localizeRoleText={localizeRoleText}
          />

          <ExperienceSection expEntries={expEntries} localizeRoleText={localizeRoleText} />

          <ContactSection displayPortfolio={displayPortfolio} contactRows={contactRows} />
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



