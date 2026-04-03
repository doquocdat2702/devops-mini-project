CREATE DATABASE IF NOT EXISTS devopsdb;
USE devopsdb;

CREATE TABLE IF NOT EXISTS tasks (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  title      VARCHAR(255) NOT NULL,
  priority   ENUM('low', 'medium', 'high') DEFAULT 'medium',
  done       TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Dữ liệu mẫu ban đầu
INSERT INTO tasks (title, priority) VALUES
  ('Hoàn thành báo cáo DevOps', 'high'),
  ('Cài đặt Docker Desktop', 'medium'),
  ('Push image lên Docker Hub', 'high'),
  ('Tạo 3 branch trên GitHub', 'medium'),
  ('Viết README cho project', 'low');
