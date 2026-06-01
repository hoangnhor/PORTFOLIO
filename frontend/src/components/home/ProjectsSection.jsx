function ProjectsSection({ displayPortfolio, getProjectActionLinks, getProjectTypeTag, localizeRoleText }) {
  return (
    <div className="projects-section" id="projects">
      <div className="projects-header">
        <div className="section-number">03 - Projects</div>
        <div className="projects-title">
          Dự án
          <br />
          <em>nổi bật</em>
        </div>
        <div className="projects-count">{String(displayPortfolio.projects.length).padStart(2, "0")} projects</div>
      </div>

      {displayPortfolio.projects.map((project, index) => {
        const actionLinks = getProjectActionLinks(project);
        return (
          <div className="project-item" key={`${project.title}-${index}`}>
            <div className="project-num-col">{String(index + 1).padStart(2, "0")}</div>
            <div className="project-main-col">
              <div className="project-tag-row">
                <span className={`project-tag ${project.featured ? "red" : ""}`}>{getProjectTypeTag(project, index)}</span>
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
  );
}

export default ProjectsSection;
