function HeroSection({
  displayPortfolio,
  localizedHeadline,
  githubLink,
  heroLinks,
  formatLinkValue,
  isHttpUrl,
  handleNavScroll
}) {
  return (
    <div className="hero" id="about">
      <div className="hero-left fade-in">
        <div className="hero-eyebrow">Portfolio 2026</div>
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
            <div className="hero-stat-l">Fullstack Systems</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-n">2</div>
            <div className="hero-stat-l">Public Demos</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-n">10+</div>
            <div className="hero-stat-l">MongoDB Collections</div>
          </div>
        </div>
      </div>

      <div className="hero-right fade-in">
        <p className="hero-desc">{displayPortfolio.careerObjective || displayPortfolio.intro}</p>
        <div className="hero-quick-actions">
          {displayPortfolio.resumeUrl ? (
            <a
              href={displayPortfolio.resumeUrl}
              className="hero-quick-btn hero-quick-btn-primary"
              download="Tran-Van-Hoang-Fresher-Fullstack-Developer-CV.pdf"
            >
              Download CV
            </a>
          ) : null}
          {githubLink ? (
            <a href={githubLink.url} className="hero-quick-btn" target="_blank" rel="noopener noreferrer">
              View GitHub
            </a>
          ) : null}
          {displayPortfolio.email ? (
            <a href="#contact" className="hero-quick-btn" onClick={(event) => handleNavScroll(event, "contact")}>
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
  );
}

export default HeroSection;
