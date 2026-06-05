export const HOME_UI = {
  navItems: [
    { key: "about", label: "About", target: "about" },
    { key: "skills", label: "Skills", target: "skills" },
    { key: "projects", label: "Projects", target: "projects" },
    { key: "exp", label: "Experience", target: "exp" },
    { key: "contact", label: "Contact", target: "contact" }
  ],
  navCta: {
    label: "Hire Me",
    target: "contact"
  },
  apiStatus: {
    live: "Dữ liệu đang lấy trực tiếp từ BE.",
    cached: "Đang dùng dữ liệu đã lưu tạm.",
    local: "Đang hiển thị dữ liệu local fallback.",
    loading: "Đang tải dữ liệu từ BE..."
  }
};
