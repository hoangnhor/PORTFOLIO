function SkillsSection({ displayPortfolio, localizeSkillCategory, localizeSkillItem }) {
  return (
    <div className="skills-section" id="skills">
      <div className="skills-sidebar fade-in">
        <div>
          <div className="section-number">02 - Skills</div>
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
              <div className="skill-row-cat">{localizeSkillCategory(skillGroup.category)}</div>
              <div className="skill-row-line" />
            </div>
            <div className="skill-chips">
              {skillGroup.items.map((item, itemIndex) => (
                <div className={`chip ${itemIndex < 2 ? "accent" : ""}`} key={`${skillGroup.category}-${item}`}>
                  <span>{localizeSkillItem(skillGroup.category, item)}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillsSection;
