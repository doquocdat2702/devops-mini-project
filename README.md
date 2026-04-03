# 📋 DevOps Mini Project — Todo App

Ứng dụng quản lý công việc (Todo App) được triển khai với Docker Compose, bao gồm Backend (Node.js), Frontend (HTML/Nginx) và Database (MySQL).

---

## 👤 Thông tin sinh viên

| Họ tên | MSSV | Lớp |
|--------|------|-----|
| Đỗ Quốc Ddạt | 2251220192 | 22ct4 |

---

## 🛠 Công nghệ sử dụng

- **Backend**: Node.js + Express
- **Frontend**: HTML/CSS/JS + Nginx
- **Database**: MySQL 8.0
- **Container**: Docker + Docker Compose

---

## 🚀 Chạy project

### Yêu cầu
- Docker Desktop đã cài đặt

### Khởi động
```bash
docker-compose up -d
```

### Kiểm tra
- Frontend: http://localhost:3000
- Health check: http://localhost:3001/health
- About: http://localhost:3001/about

### Dừng
```bash
docker-compose down
```

---

## 📡 API Endpoints

| Method | URL | Mô tả |
|--------|-----|-------|
| GET | /health | Kiểm tra trạng thái server |
| GET | /about | Thông tin sinh viên |
| GET | /tasks | Lấy danh sách tasks |
| POST | /tasks | Tạo task mới |
| PUT | /tasks/:id | Cập nhật trạng thái task |
| DELETE | /tasks/:id | Xóa task |

---

## 🌿 Git Branches

- `main` — production-ready code
- `develop` — integration branch
- `feature/frontend` — frontend development

---

## 🐳 Docker Hub

- Backend: `dockerhub_username/devops-backend:latest`
- Frontend: `dockerhub_username/devops-frontend:latest`

---

## 📁 Cấu trúc project

```
devops-project/
├── backend/
│   ├── index.js          # Express server
│   ├── package.json
│   ├── .env              # Environment variables
│   ├── .env.example
│   └── Dockerfile
├── frontend/
│   ├── index.html        # Single page app
│   └── Dockerfile
├── init.sql              # MySQL init script
├── docker-compose.yml
├── .gitignore
└── README.md
```
