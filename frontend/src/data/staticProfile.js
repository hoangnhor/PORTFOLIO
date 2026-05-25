export const staticProfile = {
  fullName: "Trần Văn Hoàng",
  headline: "Fresher Fullstack Developer",
  intro:
    "Fresher Fullstack Developer, đã xây dựng và triển khai 2 dự án fullstack hoàn chỉnh: CMMS và E-commerce.",
  careerObjective:
    "Fresher Fullstack Developer với kinh nghiệm thực tế tại môi trường doanh nghiệp. Đã thiết kế và triển khai 2 hệ thống fullstack hoàn chỉnh: CMMS — quản lý tài sản & bảo trì và PetShop — e-commerce website. Có khả năng tham gia toàn bộ vòng đời phát triển sản phẩm, từ xây dựng giao diện, thiết kế schema, phát triển RESTful API, xử lý authentication/authorization đến deploy hệ thống lên môi trường public. Sẵn sàng làm việc full-time trong vai trò Fullstack Developer.",
  location: "TP. Hồ Chí Minh, Việt Nam",
  email: "hoangtranvan999@gmail.com",
  phone: "0837271203",
  birthDate: "27/12/2003",
  resumeUrl: "Tran-Van-Hoang-Fresher-Fullstack-Developer-CV.pdf",
  socials: [
    { label: "GitHub", url: "https://github.com/hoangnhor" },
    { label: "CMMS Demo", url: "https://htcmms.vercel.app/auth" },
    { label: "PetShop Demo", url: "https://htpetshop.vercel.app/" },
    { label: "Website", url: "https://tranvanhoang.vercel.app/" }
  ],
  education: [
    {
      school: "Trường Đại học Công nghệ Sài Gòn",
      period: "09/2021 — 04/2027",
      major: "Công nghệ Thông tin",
      track: "Kỹ sư Công nghệ Thông tin — Dự kiến",
      details: ["Chuyên ngành: Công nghệ Thông tin.", "Dự kiến tốt nghiệp: 04/2027 | Có thể làm việc full-time."]
    }
  ],
  skills: [
    {
      category: "Frontend",
      items: ["React.js", "Vite", "Redux Toolkit", "Zustand", "React Query", "Ant Design", "Tailwind CSS", "Axios"]
    },
    {
      category: "Backend",
      items: ["Node.js", "Express.js", "RESTful API", "JWT", "RBAC", "Socket.IO", "node-cron"]
    },
    {
      category: "Database",
      items: ["MongoDB", "Mongoose", "SQL Server"]
    },
    {
      category: "Tools",
      items: ["Git", "GitHub", "Postman", "Figma", "Vercel", "Render", "Playwright", "GitHub Actions"]
    },
    {
      category: "English",
      items: ["Đọc hiểu tài liệu kỹ thuật tiếng Anh"]
    }
  ],
  projects: [
    {
      title: "CMMS – Asset & Maintenance Management System",
      role: "Fullstack Developer",
      period: "01/2026 - 05/2026",
      summary: "Phát triển hệ thống CMMS fullstack trong thời gian intern tại TTP Solutions JSC.",
      stack: ["React.js", "Vite", "Zustand", "Node.js", "Express.js", "MongoDB", "Socket.IO", "JWT", "node-cron", "Playwright", "GitHub Actions"],
      links: [
        { label: "Demo", url: "https://htcmms.vercel.app/auth" },
        { label: "Frontend", url: "https://github.com/hoangnhor/CMMS-FE" },
        { label: "Backend", url: "https://github.com/hoangnhor/CMMS-BE" }
      ],
      highlights: [
        "Xây dựng 6 module nghiệp vụ: Authentication, Dashboard, Asset, Work Order, Preventive Maintenance và User Administration.",
        "Thiết kế schema 10+ collections và xây dựng RESTful API cho các luồng nghiệp vụ chính.",
        "Tích hợp Socket.IO cho realtime dashboard, KPI vận hành, cảnh báo quá hạn và đồng bộ dữ liệu tức thời.",
        "Xây dựng cơ chế tự động tạo lịch bảo trì bằng node-cron với 4 kiểu trigger: days, hours, shots và usage count.",
        "Tối ưu backend với JWT httpOnly cookie, RBAC 4 vai trò, rate limiting và validation/sanitization dữ liệu đầu vào."
      ],
      featured: true
    },
    {
      title: "PetShop – E-Commerce Pet Store Website",
      role: "Fullstack Developer",
      period: "08/2025 - 12/2025",
      summary: "Phát triển hệ thống e-commerce fullstack với đầy đủ luồng mua hàng và quản trị.",
      stack: ["React.js", "Redux Toolkit", "React Query", "Ant Design", "Node.js", "Express.js", "MongoDB", "JWT"],
      links: [
        { label: "Demo", url: "https://htpetshop.vercel.app/" },
        { label: "Frontend", url: "https://github.com/hoangnhor/PETSHOP-FE" },
        { label: "Backend", url: "https://github.com/hoangnhor/PETSHOP-BE" }
      ],
      highlights: [
        "Xây dựng 5 module chính: catalog, cart/wishlist, checkout, order lifecycle và admin panel.",
        "Triển khai JWT dual-token qua httpOnly cookie, hỗ trợ auto refresh session khi access token hết hạn.",
        "Phát triển cart/wishlist hybrid local + server, đồng bộ sau đăng nhập và rollback optimistic update khi API lỗi.",
        "Xây dựng coupon engine với usage limit per user, kiểm tra inventory khi checkout.",
        "Phát triển middleware phân quyền user/admin, kiểm tra token, role và trạng thái blocked từ database."
      ],
      featured: true
    }
  ],
  experiences: [
    {
      company: "TTP Solutions JSC Company",
      role: "Intern Fullstack Developer",
      period: "01/2026 - 05/2026",
      description: "Đảm nhiệm chính phần frontend và backend cho hệ thống CMMS — Asset & Maintenance Management System dưới sự hướng dẫn và review từ mentor.",
      details: [
        "Thiết kế schema 10+ collections và xây dựng RESTful API cho 6 module nghiệp vụ chính.",
        "Tích hợp Socket.IO, node-cron, JWT cookie-based auth, RBAC, rate limiting và kiểm thử E2E bằng Playwright."
      ]
    }
  ]
};







