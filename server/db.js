const path = require('path');
const Database = require('better-sqlite3');

const DB_PATH = path.join(__dirname, 'ktalk.db');
const db = new Database(DB_PATH);

db.pragma('journal_mode = WAL');

// --- Schema ---
db.exec(`
  CREATE TABLE IF NOT EXISTS auth_credentials (
    role TEXT PRIMARY KEY,          -- only 'admin' now (students have individual accounts below)
    password_hash TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER REFERENCES students(id),
    full_name TEXT NOT NULL,
    plan_name TEXT NOT NULL,
    amount REAL NOT NULL,
    method TEXT NOT NULL DEFAULT 'pix',
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending' | 'confirmed' | 'rejected'
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    confirmed_at TEXT
  );

  CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL DEFAULT '📘',
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

// Seed a starter set of courses so the site isn't empty before Judy edits
// them from the admin dashboard. Checks by title so it also fills in any
// newly-added defaults (like Travel English) on a database that already exists
// from an earlier version, without duplicating courses Judy already has.
const defaultCourses = [
  ['Business English', 'Negotiation, presentations, and professional writing for the global workplace.', '💼'],
  ['IELTS & TOEFL Prep', 'Structured, exam-focused coaching to hit your target band score.', '📝'],
  ['Conversational Fluency', 'Real-world speaking practice to think and respond naturally in English.', '💬'],
  ['Kids & Teens English', 'Engaging, age-appropriate lessons that build confidence early.', '🎈'],
  ['Travel English', 'Order food, ask directions, and connect with locals confidently on any trip.', '✈️']
];
const insertCourse = db.prepare('INSERT INTO courses (title, description, icon) VALUES (?, ?, ?)');
const findCourseByTitle = db.prepare('SELECT id FROM courses WHERE title = ?');
for (const [title, description, icon] of defaultCourses) {
  if (!findCourseByTitle.get(title)) {
    insertCourse.run(title, description, icon);
  }
}

module.exports = db;
