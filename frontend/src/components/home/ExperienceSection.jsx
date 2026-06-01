function ExperienceSection({ expEntries, localizeRoleText }) {
  return (
    <div className="exp-section" id="exp">
      <div className="exp-sidebar fade-in">
        <div className="section-number">04 - Experience</div>
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
  );
}

export default ExperienceSection;
