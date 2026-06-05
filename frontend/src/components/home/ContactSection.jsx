import { useMemo, useState } from "react";

function ContactSection({ displayPortfolio, contactRows }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "Portfolio contact",
    message: ""
  });

  const mailtoHref = useMemo(() => {
    if (!displayPortfolio.email) {
      return "";
    }

    const lines = [
      `Name: ${formState.name || "N/A"}`,
      `Email: ${formState.email || "N/A"}`,
      "",
      formState.message || ""
    ].join("\n");

    const params = new globalThis.URLSearchParams();
    if (formState.subject.trim()) {
      params.set("subject", formState.subject.trim());
    }
    if (lines.trim()) {
      params.set("body", lines);
    }

    return `mailto:${displayPortfolio.email}?${params.toString()}`;
  }, [displayPortfolio.email, formState.email, formState.message, formState.name, formState.subject]);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormState((current) => ({
      ...current,
      [name]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!mailtoHref) {
      return;
    }

    window.location.href = mailtoHref;
  }

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
          <>
            <button type="button" className="contact-cta" onClick={() => setIsFormOpen((prev) => !prev)}>
              {isFormOpen ? "Close Form" : "Send Email →"}
            </button>
            {isFormOpen ? (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-form-row">
                  <label className="contact-form-label" htmlFor="contact-name">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={formState.name}
                    onChange={handleInputChange}
                    className="contact-form-input"
                    placeholder="Your name"
                  />
                </div>
                <div className="contact-form-row">
                  <label className="contact-form-label" htmlFor="contact-email">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    className="contact-form-input"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div className="contact-form-row">
                  <label className="contact-form-label" htmlFor="contact-subject">
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    value={formState.subject}
                    onChange={handleInputChange}
                    className="contact-form-input"
                    placeholder="Message subject"
                  />
                </div>
                <div className="contact-form-row">
                  <label className="contact-form-label" htmlFor="contact-message">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows="5"
                    value={formState.message}
                    onChange={handleInputChange}
                    className="contact-form-input contact-form-textarea"
                    placeholder="Write your message here"
                    required
                  />
                </div>
                <button type="submit" className="contact-form-submit">
                  Open Email App
                </button>
              </form>
            ) : null}
          </>
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
