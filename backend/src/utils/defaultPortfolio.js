export const defaultPortfolio = {
  fullName: "Trần Văn Hoàng",
  headline: "Fresher Fullstack Developer",
  intro:
    "Fresher Fullstack Developer với kinh nghiệm thực tế tại môi trường doanh nghiệp, đã thiết kế và triển khai 2 hệ thống fullstack hoàn chỉnh theo hướng production-ready: CMMS và PetShop.",
  careerObjective:
    "Fresher Fullstack Developer với kinh nghiệm thực tế tại môi trường doanh nghiệp, đã thiết kế và triển khai 2 hệ thống fullstack hoàn chỉnh theo hướng production-ready: CMMS (quản lý tài sản & bảo trì) và PetShop (e-commerce website). Có khả năng tham gia toàn bộ vòng đời phát triển sản phẩm, từ xây dựng giao diện, thiết kế schema, phát triển RESTful API, xử lý authentication/authorization đến deploy hệ thống lên môi trường public. Sẵn sàng làm việc full-time trong vai trò Fullstack Developer.",
  location: "TP. Hồ Chí Minh, Việt Nam",
  email: "hoangtranvan999@gmail.com",
  phone: "0837271203",
  birthDate: "27/12/2003",
  resumeUrl: "Tran-Van-Hoang-Fresher-Fullstack-Developer-CV.pdf",
  cvRawText: `Trần Văn Hoàng
Fresher Fullstack Developer
Ngày sinh: 27/12/2003
Giới tính: Nam
Số điện thoại: 0837271203
Email: hoangtranvan999@gmail.com
Portfolio: https://tranvanhoang.vercel.app/
Địa chỉ: TP. Hồ Chí Minh, Việt Nam
MỤC TIÊU NGHỀ NGHIỆP
Fresher Fullstack Developer với kinh nghiệm thực tế tại môi trường doanh nghiệp. Đã thiết kế và triển khai 2 hệ thống fullstack hoàn chỉnh: CMMS — quản lý tài sản & bảo trì và PetShop — e-commerce website. Có khả năng tham gia toàn bộ vòng đời phát triển sản phẩm, từ xây dựng giao diện, thiết kế schema, phát triển RESTful API, xử lý authentication/authorization đến triển khai hệ thống lên môi trường demo/public. Sẵn sàng làm việc full-time trong vai trò Fullstack Developer.
HỌC VẤN
09/2021 — 04/2027 Trường Đại học Công nghệ Sài Gòn
Chuyên ngành: Công nghệ Thông tin
Kỹ sư Công nghệ Thông tin — Dự kiến
KỸ NĂNG
Frontend: React.js, JavaScript, HTML5, CSS3, Tailwind CSS, Ant Design, Bootstrap
Backend: Node.js, Express.js, RESTful API, JWT, RBAC, Socket.IO, node-cron
Database: MongoDB, Mongoose, SQL Server
Tools: Git, GitHub, Postman, Vercel, Render, Playwright, GitHub Actions, Figma
Tiếng Anh: Đọc hiểu tài liệu kỹ thuật tiếng Anh
KINH NGHIỆM LÀM VIỆC
01/2026 - 05/2026 TTP Solutions JSC Company - Intern Fullstack Developer
DỰ ÁN
01/2026 - 05/2026 CMMS – Asset & Maintenance Management System
08/2025 - 12/2025 PetShop – E-Commerce Pet Store Website
05/2026 - Hiện tại Portfolio Website – Personal Branding Platform`,
  socials: [
    { label: "GitHub", url: "https://github.com/hoangnhor" },
    { label: "CMMS Demo", url: "https://htcmms.vercel.app/auth" },
    { label: "PetShop Demo", url: "https://htpetshop.vercel.app/" },
    { label: "Website", url: "https://tranvanhoang.vercel.app" }
  ],
  education: [
    {
      school: "Trường Đại học Công nghệ Sài Gòn",
      period: "09/2021 — 04/2027",
      major: "Công nghệ Thông tin",
      track: "Kỹ sư CNTT",
      details: ["Chuyên ngành: Công nghệ Thông tin.", "Dự kiến tốt nghiệp: 04/2027 | Có thể làm việc full-time."]
    }
  ],
  skills: [
    {
      category: "Frontend",
      items: ["React.js", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Ant Design", "Bootstrap"]
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
      items: ["Git", "GitHub", "Postman", "Vercel", "Render", "Playwright", "GitHub Actions", "Figma"]
    },
    {
      category: "Tiếng Anh",
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
        "Xây dựng hệ thống quản lý tài sản và bảo trì gồm: Dashboard, Asset Management, Work Order Workflow, Preventive Maintenance, User Administration.",
        "Triển khai workflow Work Order đa trạng thái (draft -> pending_approval -> approved -> in_progress -> done/rejected) theo RBAC 4 vai trò.",
        "Xây dựng logic phân quyền theo nghiệp vụ: tạo/cập nhật/duyệt/hoàn thành/sign-off Work Order theo vai trò và trạng thái.",
        "Tối ưu backend với transaction handling khi complete Work Order (maintenance log + spare parts), và idempotency cho PM Work Order để tránh tạo trùng.",
        "Hoàn thiện lớp bảo mật và ổn định hệ thống: JWT cookie auth, CSRF, rate limiting (Redis fallback memory), request validation/sanitization, structured logging."
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
        "Xây dựng hệ thống e-commerce fullstack gồm 5 module chính: catalog sản phẩm, cart/wishlist, checkout, order lifecycle và admin panel.",
        "Triển khai xác thực JWT dual-token (access + refresh) với refresh token lưu qua httpOnly cookie, hỗ trợ auto refresh session và refresh token rotation (kèm grace window).",
        "Phát triển cart/wishlist hybrid (local + server), đồng bộ dữ liệu sau đăng nhập và rollback optimistic update khi API lỗi.",
        "Xây dựng coupon engine với giới hạn sử dụng theo từng user, kiểm tra tồn kho khi checkout, cùng các lớp bảo vệ CORS allowlist, rate limiting và sanitize payload.",
        "Xây dựng middleware phân quyền user/admin, kiểm tra token, trạng thái tài khoản blocked từ database, và xác thực chữ ký payment webhook (HMAC) cho luồng cập nhật thanh toán."
      ],
      featured: true
    },
    {
      title: "Portfolio Website – Personal Branding Platform",
      role: "Fullstack Developer",
      period: "05/2026 - Hiện tại",
      summary: "Xây dựng website portfolio cá nhân để trình bày CV, dự án và dữ liệu nghề nghiệp theo hướng production-ready.",
      stack: ["React.js", "Vite", "Node.js", "Express.js", "MongoDB", "Mongoose", "Playwright"],
      links: [
        { label: "GitHub Repo", url: "https://github.com/hoangnhor/PORTFOLIO" },
        { label: "Repository", url: "https://github.com/hoangnhor/portfolio" }
      ],
      highlights: [
        "Thiết kế giao diện responsive theo hướng CV online hiện đại, tối ưu hiển thị trên desktop và mobile.",
        "Tách lớp backend theo route/controller/service/repository, có validation payload, rate limiting, CORS allowlist và request logging.",
        "Tích hợp cơ chế fallback dữ liệu local khi API lỗi để đảm bảo website luôn hiển thị ổn định.",
        "Chuẩn hóa luồng cập nhật dữ liệu portfolio qua API bảo vệ bằng admin token.",
        "Thiết lập kiểm thử tự động gồm lint, API test và E2E/UI smoke bằng Playwright."
      ],
      featured: true
    }
  ],
  experiences: [
    {
      company: "TTP Solutions JSC Company",
      role: "Intern Fullstack Developer",
      period: "01/2026 - 05/2026",
      description:
        "Phát triển chính cả frontend và backend cho hệ thống CMMS - Asset & Maintenance Management System dưới sự hướng dẫn và review từ mentor.",
      details: [
        "Thiết kế schema cho 10+ MongoDB collections và xây dựng RESTful API cho 6 module: Authentication, Dashboard, Asset, Work Order, Preventive Maintenance, User Administration.",
        "Tích hợp Socket.IO cho realtime dashboard và đồng bộ dữ liệu tức thời (work order, maintenance log, user events).",
        "Xây dựng cơ chế tự động kiểm tra PM bằng node-cron và sinh Work Order theo các trigger vận hành (days/hours/shots/usage count).",
        "Áp dụng bảo mật nhiều lớp: JWT httpOnly cookie, CSRF protection, RBAC 4 vai trò (admin, site manager, technician, accountant), CORS allowlist, rate limiting, payload validation/sanitization.",
        "Triển khai hệ thống lên môi trường public, kiểm thử API và chạy E2E với Playwright."
      ]
    }
  ]
};













