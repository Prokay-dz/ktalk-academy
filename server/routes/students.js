const express = require('express');
const db = require('../db');
const { requireRole } = require('../middleware/auth');

const router = express.Router();

// GET /api/students/me -- student only. Lets the logged-in student check
// their own latest payment status (so the dashboard can show real state
// instead of just trusting the client after they submit a PIX payment).
router.get('/me', requireRole('student'), (req, res) => {
  const student = db.prepare('SELECT id, full_name, email, created_at FROM students WHERE id = ?').get(req.user.studentId);
  if (!student) return res.status(404).json({ error: 'Student not found' });

  const latestPayment = db.prepare(`
    SELECT plan_name, amount, status, created_at
    FROM payments WHERE student_id = ?
    ORDER BY created_at DESC LIMIT 1
  `).get(student.id);

  res.json({ ...student, latestPayment: latestPayment || null });
});

// GET /api/students -- admin only. Lists every registered student along with
// their most recent payment status, so Judy can see who's paid at a glance.
router.get('/', requireRole('admin'), (req, res) => {
  const rows = db.prepare(`
    SELECT
      students.id,
      students.full_name,
      students.email,
      students.created_at,
      (
        SELECT status FROM payments
        WHERE payments.student_id = students.id
        ORDER BY payments.created_at DESC
        LIMIT 1
      ) AS latest_payment_status,
      (
        SELECT plan_name FROM payments
        WHERE payments.student_id = students.id
        ORDER BY payments.created_at DESC
        LIMIT 1
      ) AS latest_plan
    FROM students
    ORDER BY students.created_at DESC
  `).all();
  res.json(rows);
});

module.exports = router;
