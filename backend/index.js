require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const APP_NAME = process.env.APP_NAME || 'DevOps Mini App';

// MySQL connection pool
let pool;
async function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'db',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || 'secret',
      database: process.env.DB_NAME || 'devopsdb',
      waitForConnections: true,
      connectionLimit: 10,
    });
  }
  return pool;
}

// ✅ GET /health
app.get('/health', (req, res) => {
  res.json({ status: 'ok', app: APP_NAME, timestamp: new Date().toISOString() });
});

// ✅ GET /about
app.get('/about', (req, res) => {
  res.json({
    name: 'ĐỖ QUỐC ĐẠT ',
    student_id: '2251220192',
    class: '22CT1',
    app: APP_NAME,
    description: 'Ứng dụng quản lý công việc (Todo App)',
    version: '1.0.0'
  });
});

// ✅ GET /tasks — lấy tất cả tasks
app.get('/tasks', async (req, res) => {
  try {
    const db = await getPool();
    const [rows] = await db.query('SELECT * FROM tasks ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error', detail: err.message });
  }
});

// ✅ POST /tasks — tạo task mới
app.post('/tasks', async (req, res) => {
  const { title, priority } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });
  try {
    const db = await getPool();
    const [result] = await db.query(
      'INSERT INTO tasks (title, priority) VALUES (?, ?)',
      [title, priority || 'medium']
    );
    const [rows] = await db.query('SELECT * FROM tasks WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error', detail: err.message });
  }
});

// ✅ PUT /tasks/:id — cập nhật trạng thái task
app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { done } = req.body;
  try {
    const db = await getPool();
    await db.query('UPDATE tasks SET done = ? WHERE id = ?', [done ? 1 : 0, id]);
    const [rows] = await db.query('SELECT * FROM tasks WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Task not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error', detail: err.message });
  }
});

// ✅ DELETE /tasks/:id
app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const db = await getPool();
    await db.query('DELETE FROM tasks WHERE id = ?', [id]);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error', detail: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 ${APP_NAME} running on port ${PORT}`);
});
