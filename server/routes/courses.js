const express = require('express');
const db = require('../db');
const { requireRole } = require('../middleware/auth');

const router = express.Router();

// GET /api/courses -- public, used to render the courses section on the site
router.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM courses ORDER BY id ASC').all();
  res.json(rows);
});

// POST /api/courses  { title, description, icon }  -- admin only
router.post('/', requireRole('admin'), (req, res) => {
  const { title, description, icon } = req.body || {};
  if (!title || !description) {
    return res.status(400).json({ error: 'title and description are required' });
  }
  const result = db.prepare(`
    INSERT INTO courses (title, description, icon) VALUES (?, ?, ?)
  `).run(title, description, icon || '📘');
  res.status(201).json({ id: result.lastInsertRowid });
});

// PUT /api/courses/:id  { title, description, icon }  -- admin only
router.put('/:id', requireRole('admin'), (req, res) => {
  const { id } = req.params;
  const { title, description, icon } = req.body || {};
  if (!title || !description) {
    return res.status(400).json({ error: 'title and description are required' });
  }
  const result = db.prepare(`
    UPDATE courses SET title = ?, description = ?, icon = ?, updated_at = datetime('now') WHERE id = ?
  `).run(title, description, icon || '📘', id);
  if (result.changes === 0) return res.status(404).json({ error: 'Course not found' });
  res.json({ ok: true });
});

// DELETE /api/courses/:id  -- admin only
router.delete('/:id', requireRole('admin'), (req, res) => {
  const { id } = req.params;
  const result = db.prepare('DELETE FROM courses WHERE id = ?').run(id);
  if (result.changes === 0) return res.status(404).json({ error: 'Course not found' });
  res.json({ ok: true });
});

module.exports = router;
