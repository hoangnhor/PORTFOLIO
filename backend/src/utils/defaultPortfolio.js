export const defaultPortfolio = {
  fullName: "Trần Văn Hoàng",
  headline: "Web Developer",
  intro:
    "Web Developer định hướng Fullstack, có nền tảng xây dựng ứng dụng web từ frontend đến backend qua các dự án thực tế.",
  careerObjective:
    "Web Developer định hướng Fullstack, có nền tảng xây dựng ứng dụng web từ frontend đến backend qua các dự án thực tế. Đã phát triển và triển khai hệ thống CMMS với workflow nghiệp vụ rõ ràng, RESTful API và realtime communication. Mục tiêu trong 1-2 năm tới là đảm nhiệm vị trí Fresher/Intern để tham gia phát triển sản phẩm thật, nâng cao tư duy kỹ thuật và năng lực làm việc trong môi trường chuyên nghiệp.",
  location: "Thành phố Hồ Chí Minh, Việt Nam",
  email: "hoangtranvan999@gmail.com",
  phone: "0837271203",
  birthDate: "27/12/2003",
  resumeUrl: "/Fresher Fullstack Developer_TranVanHoang.pdf",
  cvRawText: `Trần Văn Hoàng
Web Developer
THÔNG TIN CÁ NHÂN
27/12/2003
0837271203
hoangtranvan999@gmail.com
https://github.com/hoangnhor
Thành phố Hồ Chí Minh, Việt Nam
HỌC VẤN
Trường Đại học Công nghệ Sài Gòn (STU)
2021-2025
Chuyên ngành: Công nghệ Thông tin
Định hướng: Fullstack Web Developer
KỸ NĂNG
FRONTEND: ReactJS, Tailwind CSS, Bootstrap, HTML, CSS, JavaScript
BACKEND: Node.js (ExpressJS)
DATABASE: MongoDB, MySQL
TOOLS & OTHERS: Git, GitHub, Postman, Figma
MỤC TIÊU NGHỀ NGHIỆP
Web Developer định hướng Fullstack, có nền tảng xây dựng ứng dụng web từ frontend đến backend qua các dự án thực tế. Đã phát triển và triển khai hệ thống CMMS với workflow nghiệp vụ rõ ràng, RESTful API và realtime communication. Mục tiêu trong 1-2 năm tới là đảm nhiệm vị trí Fresher/Intern để tham gia phát triển sản phẩm thật, nâng cao tư duy kỹ thuật và năng lực làm việc trong môi trường chuyên nghiệp.
KINH NGHIỆM LÀM VIỆC
TTP Solutions JSC Company | 03/2026-05/2026 | INTERN WEB DEVELOPER
- Phân tích bài toán quản lý tài sản và bảo trì trong môi trường doanh nghiệp.
- Tham gia xây dựng hệ thống CMMS phục vụ demo nghiệp vụ thực tế.
- Phát triển fullstack với ReactJS (Frontend) và Node.js/Express (Backend).
- Thiết kế và tích hợp RESTful API, kết nối frontend-backend và kiểm thử luồng chức năng chính.
DỰ ÁN
CMMS – Asset & Maintenance Management System | 03/2026-05/2026
Role: Fullstack Developer (Independent Project)
Demo: https://cmms-fe-opal.vercel.app
GitHub FE: https://github.com/hoangnhor/CMMS-FE
GitHub BE: https://github.com/hoangnhor/CMMS-BE
- Phát triển hệ thống CMMS fullstack để quản lý tài sản, bảo trì và Work Order theo quy trình doanh nghiệp.
- Xây dựng RBAC 4 vai trò (admin, site_manager, technician, accountant) ở cả backend authorization và frontend route guard.
- Thiết kế workflow Work Order 7 bước: create -> submit -> approve -> assign -> execute -> complete -> sign-off.
- Tích hợp realtime notifications bằng Socket.IO để đồng bộ thay đổi dữ liệu giữa nhiều client.
- Tự động tạo Work Order định kỳ bằng node-cron theo lịch bảo trì PM.
- Triển khai production: Frontend trên Vercel, Backend trên Render.
Tech Stack: ReactJS, Tailwind CSS, Axios, Node.js, Express, MongoDB, Socket.IO, node-cron.
E-Commerce Pet Shop Website (MVP) | 09/2024-12/2024
Role: Fullstack Developer
GitHub FE: https://github.com/hoangnhor/petshopFE
GitHub BE: https://github.com/hoangnhor/petshopBE
- Phát triển website thương mại điện tử MVP cho cửa hàng thú cưng theo kiến trúc fullstack.
- Xây dựng frontend SPA bằng ReactJS cho các luồng chính: duyệt sản phẩm, quản lý tài khoản, quản trị cơ bản.
- Thiết kế và triển khai backend RESTful API với Node.js/Express cho xác thực và quản lý dữ liệu sản phẩm.
- Triển khai chức năng đăng ký/đăng nhập người dùng và phân quyền User/Admin.
- Xây dựng module CRUD sản phẩm phục vụ vận hành cửa hàng.
Tech Stack: ReactJS, Node.js, Express, MongoDB.`,
  socials: [
    { label: "GitHub", url: "https://github.com/hoangnhor" },
    { label: "CMMS Demo", url: "https://cmms-fe-opal.vercel.app" },
    { label: "CMMS FE", url: "https://github.com/hoangnhor/CMMS-FE" },
    { label: "CMMS BE", url: "https://github.com/hoangnhor/CMMS-BE" },
    { label: "Pet Shop FE", url: "https://github.com/hoangnhor/petshopFE" },
    { label: "Pet Shop BE", url: "https://github.com/hoangnhor/petshopBE" }
  ],
  education: [
    {
      school: "Trường Đại học Công nghệ Sài Gòn (STU)",
      period: "2021-2025",
      major: "Công nghệ Thông tin",
      track: "Fullstack Web Developer"
    }
  ],
  skills: [
    {
      category: "Frontend",
      items: ["ReactJS", "Tailwind CSS", "Bootstrap", "HTML", "CSS", "JavaScript"]
    },
    {
      category: "Backend",
      items: ["Node.js (ExpressJS)"]
    },
    {
      category: "Database",
      items: ["MongoDB", "MySQL"]
    },
    {
      category: "Tools & Others",
      items: ["Git", "GitHub", "Postman", "Figma"]
    }
  ],
  projects: [
    {
      title: "CMMS - Asset & Maintenance Management System",
      role: "Fullstack Developer (Independent Project)",
      period: "03/2026-05/2026",
      summary:
        "Phát triển hệ thống CMMS fullstack để quản lý tài sản, bảo trì và Work Order theo quy trình doanh nghiệp.",
      stack: ["ReactJS", "Tailwind CSS", "Axios", "Node.js", "Express", "MongoDB", "Socket.IO", "node-cron"],
      links: [
        { label: "Demo", url: "https://cmms-fe-opal.vercel.app" },
        { label: "GitHub FE", url: "https://github.com/hoangnhor/CMMS-FE" },
        { label: "GitHub BE", url: "https://github.com/hoangnhor/CMMS-BE" }
      ],
      highlights: [
        "Phát triển hệ thống CMMS fullstack để quản lý tài sản, bảo trì và Work Order theo quy trình doanh nghiệp.",
        "Xây dựng RBAC 4 vai trò (admin, site_manager, technician, accountant) ở cả backend authorization và frontend route guard.",
        "Thiết kế workflow Work Order 7 bước: create -> submit -> approve -> assign -> execute -> complete -> sign-off.",
        "Tích hợp realtime notifications bằng Socket.IO để đồng bộ thay đổi dữ liệu giữa nhiều client.",
        "Tự động tạo Work Order định kỳ bằng node-cron theo lịch bảo trì PM.",
        "Triển khai production: Frontend trên Vercel, Backend trên Render."
      ],
      featured: true
    },
    {
      title: "Portfolio cá nhân (đang phát triển)",
      role: "Fullstack Developer (Independent Project)",
      period: "05/2026-nay",
      summary: "Xây dựng và hoàn thiện website portfolio cá nhân fullstack để trình bày hồ sơ, dự án và kỹ năng.",
      stack: ["ReactJS", "Vite", "Node.js", "Express", "MongoDB"],
      links: [{ label: "GitHub", url: "https://github.com/hoangnhor" }],
      highlights: [
        "Thiết kế giao diện portfolio theo hướng hiện đại, tối ưu trải nghiệm đọc nội dung.",
        "Kết nối dữ liệu profile/dự án từ backend API.",
        "Liên tục cập nhật nội dung và cải tiến UI/UX theo phản hồi thực tế."
      ],
      featured: true
    },
    {
      title: "E-Commerce Pet Shop Website (MVP)",
      role: "Fullstack Developer",
      period: "09/2024-12/2024",
      summary: "Phát triển website thương mại điện tử MVP cho cửa hàng thú cưng theo kiến trúc fullstack.",
      stack: ["ReactJS", "Node.js", "Express", "MongoDB"],
      links: [
        { label: "GitHub FE", url: "https://github.com/hoangnhor/petshopFE" },
        { label: "GitHub BE", url: "https://github.com/hoangnhor/petshopBE" }
      ],
      highlights: [
        "Phát triển website thương mại điện tử MVP cho cửa hàng thú cưng theo kiến trúc fullstack.",
        "Xây dựng frontend SPA bằng ReactJS cho các luồng chính: duyệt sản phẩm, quản lý tài khoản, quản trị cơ bản.",
        "Thiết kế và triển khai backend RESTful API với Node.js/Express cho xác thực và quản lý dữ liệu sản phẩm.",
        "Triển khai chức năng đăng ký/đăng nhập người dùng và phân quyền User/Admin.",
        "Xây dựng module CRUD sản phẩm phục vụ vận hành cửa hàng."
      ],
      featured: false
    }
  ],
  experiences: [
    {
      company: "TTP Solutions JSC Company",
      role: "Intern Web Developer",
      period: "03/2026-05/2026",
      description:
        "Phân tích bài toán quản lý tài sản và bảo trì trong môi trường doanh nghiệp, tham gia xây dựng CMMS phục vụ demo nghiệp vụ thực tế.",
      details: [
        "Phân tích bài toán quản lý tài sản và bảo trì trong môi trường doanh nghiệp.",
        "Tham gia xây dựng hệ thống CMMS phục vụ demo nghiệp vụ thực tế.",
        "Phát triển fullstack với ReactJS (Frontend) và Node.js/Express (Backend).",
        "Thiết kế và tích hợp RESTful API, kết nối frontend-backend và kiểm thử luồng chức năng chính."
      ]
    }
  ]
};
