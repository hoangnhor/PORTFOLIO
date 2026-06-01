function ContactSection({ displayPortfolio, contactRows }) {
  return (
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
            Send Email →
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
  );
}

export default ContactSection;
