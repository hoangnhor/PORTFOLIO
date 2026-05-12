export const defaultPortfolio = {
  fullName: "Trần Văn Hoàng",
  headline: "Fresher Fullstack Developer",
  intro:
    "Fresher Fullstack Developer với thiên hướng backend, đã tự hoàn thiện 2 dự án thực tế từ đầu đến cuối: hệ thống e-commerce và CMMS công nghiệp với realtime, workflow đa vai trò và bảo mật nhiều lớp.",
  careerObjective:
    "Đang học năm cuối, có thể đi làm full-time. Mong muốn tham gia team để phát triển sản phẩm thực tế và nâng cao năng lực trong môi trường chuyên nghiệp.",
  location: "TP. Hồ Chí Minh, Việt Nam",
  email: "hoangtranvan999@gmail.com",
  phone: "0837271203",
  birthDate: "27/12/2003",
  resumeUrl: "/cv-tran-van-hoang.pdf",
  cvRawText: `Trần Văn Hoàng
Fresher Fullstack Developer
Ngày sinh: 27/12/2003
Giới tính: Nam
Số điện thoại: 0837271203
Email: hoangtranvan999@gmail.com
Website: https://tranvanhoang.vercel.app
Địa chỉ: TP. Hồ Chí Minh, Việt Nam
MỤC TIÊU NGHỀ NGHIỆP
Fresher Fullstack Developer với thiên hướng backend, đã tự hoàn thiện 2 dự án thực tế từ đầu đến cuối: hệ thống e-commerce và CMMS công nghiệp với realtime, workflow đa vai trò và bảo mật nhiều lớp. Đang học năm cuối, có thể đi làm full-time. Mong muốn tham gia team để phát triển sản phẩm thực tế và nâng cao năng lực trong môi trường chuyên nghiệp.
HỌC VẤN
09/2021-04/2027 Trường Đại học Công nghệ Sài Gòn
Chuyên ngành: Công nghệ Thông tin
Đang học năm cuối — có thể đi làm full-time
KỸ NĂNG
Frontend: React.js, Redux Toolkit, Zustand, Tailwind CSS, Bootstrap, JavaScript, HTML5, CSS3, Axios
Backend: Node.js, Express.js, RESTful API, JWT Authentication, Socket.IO, node-cron
Database: MongoDB (Mongoose), SQL Server
Tools: Git, GitHub, Postman, Figma, Vercel, Render
Tiếng Anh: Đọc tài liệu kỹ thuật
KINH NGHIỆM LÀM VIỆC
01/2026-05/2026 TTP Solutions JSC Company - Intern Web Developer
DỰ ÁN
01/2026-05/2026 CMMS – Asset & Maintenance Management System
08/2025-12/2025 PetShop — E-Commerce Pet Store Website`,
  socials: [
    { label: "GitHub", url: "https://github.com/hoangnhor" },
    { label: "Website", url: "https://tranvanhoang.vercel.app" },
    { label: "CMMS Demo", url: "https://htcmms.vercel.app/auth" },
    { label: "PetShop Demo", url: "https://htpetshop.vercel.app/" }
  ],
  education: [
    {
      school: "Trường Đại học Công nghệ Sài Gòn",
      period: "09/2021-04/2027",
      major: "Công nghệ Thông tin",
      track: "Đang học năm cuối - có thể đi làm full-time"
    }
  ],
  skills: [
    {
      category: "Frontend",
      items: ["React.js", "Redux Toolkit", "Zustand", "Tailwind CSS", "Bootstrap", "JavaScript", "HTML5", "CSS3", "Axios"]
    },
    {
      category: "Backend",
      items: ["Node.js", "Express.js", "RESTful API", "JWT Authentication", "Socket.IO", "node-cron"]
    },
    {
      category: "Database",
      items: ["MongoDB (Mongoose)", "SQL Server"]
    },
    {
      category: "Tools",
      items: ["Git", "GitHub", "Postman", "Figma", "Vercel", "Render"]
    },
    {
      category: "Tiếng Anh",
      items: ["Đọc tài liệu kỹ thuật"]
    }
  ],
  projects: [
    {
      title: "CMMS - Asset & Maintenance Management System",
      role: "Fullstack Developer",
      period: "01/2026-05/2026",
      summary: "Phát triển hệ thống CMMS fullstack với kiến trúc FE/BE tách lớp rõ ràng.",
      stack: ["React.js", "Vite", "Zustand", "Node.js", "Express.js", "MongoDB", "Socket.IO", "JWT", "node-cron"],
      links: [
        { label: "Demo", url: "https://htcmms.vercel.app/auth" },
        { label: "GitHub FE", url: "https://github.com/hoangnhor/CMMS-FE" },
        { label: "GitHub BE", url: "https://github.com/hoangnhor/CMMS-BE" }
      ],
      highlights: [
        "Xây dựng 6 module nghiệp vụ: Authentication, Dashboard, Asset, Work Order, Preventive Maintenance, User Administration.",
        "Dashboard realtime qua Socket.IO với KPI, biểu đồ tổng hợp và cảnh báo quá hạn.",
        "Bảo mật nhiều lớp: JWT, RBAC, rate limiting và payload sanitization.",
        "Tối ưu vận hành: pagination, smart filter, export CSV, seed 500+ assets thực tế."
      ],
      featured: true
    },
    {
      title: "Portfolio cá nhân",
      role: "Fullstack Developer",
      period: "05/2026-nay",
      summary: "Xây dựng website portfolio fullstack để trình bày hồ sơ, kỹ năng và dự án cá nhân.",
      stack: ["React.js", "Vite", "Node.js", "Express.js", "MongoDB"],
      links: [
        { label: "Demo", url: "https://tranvanhoang.vercel.app/" },
        { label: "GitHub", url: "https://github.com/hoangnhor/PORTFOLIO" }
      ],
      highlights: [
        "Thiết kế giao diện portfolio theo hướng hiện đại, tối ưu trải nghiệm đọc nội dung.",
        "Tách dữ liệu động/tĩnh để tăng tốc độ tải trang.",
        "Triển khai production Frontend trên Vercel và Backend trên Render."
      ],
      featured: true
    },

    {
      title: "PetShop - E-Commerce Pet Store Website",
      role: "Fullstack Developer",
      period: "08/2025-12/2025",
      summary: "Phát triển nền tảng e-commerce fullstack với đầy đủ luồng mua hàng và quản trị.",
      stack: ["React.js", "Redux Toolkit", "React Query", "Ant Design", "Node.js", "Express.js", "MongoDB", "JWT"],
      links: [
        { label: "Demo", url: "https://htpetshop.vercel.app/" },
        { label: "GitHub FE", url: "https://github.com/hoangnhor/PETSHOP-FE" },
        { label: "GitHub BE", url: "https://github.com/hoangnhor/PETSHOP-BE" }
      ],
      highlights: [
        "JWT authentication: access token 15 phút + refresh token httpOnly cookie, tự động refresh qua Axios interceptor.",
        "CRUD Product, Category, User - tìm kiếm từ khóa, lọc nâng cao, phân trang.",
        "Quản lý vòng đời đơn hàng: xem, cập nhật trạng thái, hủy đơn, xóa theo phân quyền.",
        "Tối ưu UX với React Query (cache, retry, refetch); CORS, rate limit, sanitize payload."
      ],
      featured: true
    }
  ],
  experiences: [
    {
      company: "TTP Solutions JSC Company",
      role: "Intern Web Developer",
      period: "01/2026-05/2026",
      description: "Nhận spec từ mentor, tự thiết kế kiến trúc và xây dựng hệ thống CMMS hoàn chỉnh từ đầu đến cuối.",
      details: [
        "Thiết kế database schema với 10 collections, xây dựng RESTful API cho toàn bộ module nghiệp vụ.",
        "Triển khai realtime với Socket.IO và tự động hóa bảo trì định kỳ bằng cron job.",
        "Tự debug, test và tối ưu luồng chức năng, đảm bảo hệ thống chạy ổn định trên môi trường production."
      ]
    }
  ]
};




