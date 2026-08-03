const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db');
const { requireRole } = require('../middleware/auth');

const router = express.Router();
const MINIMUM_AMOUNT = 25;

// POST /api/payments  { fullName, email, password, planName, amount }
// Public. Called when a visitor says "I've paid via PIX" - creates their
// student account (if new) and a pending payment record in one step.
router.post('/', (req, res) => {
  const { fullName, email, password, planName, amount } = req.body || {};

  if (!fullName || !email || !password || !planName || amount === undefined) {
    return res.status(400).json({ error: 'fullName, email, password, planName, and amount are required' });
  }
  const numericAmount = Number(amount);
  if (Number.isNaN(numericAmount)) {
    return res.status(400).json({ error: 'amount must be a number' });
  }
  if (numericAmount < MINIMUM_AMOUNT) {
    return res.status(400).json({ error: `amount must be at least ${MINIMUM_AMOUNT}` });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'password must be at least 6 characters' });
  }

  const normalizedEmail = email.toLowerCase().trim();
  let student = db.prepare('SELECT * FROM students WHERE email = ?').get(normalizedEmail);

  if (student) {
    // Existing student paying for another plan - verify the password matches
    // their account instead of silently reusing someone else's account.
    if (!bcrypt.compareSync(password, student.password_hash)) {
      return res.status(409).json({ error: 'That email is already registered. Please use the matching password, or log in instead.' });
    }
  } else {
    const passwordHash = bcrypt.hashSync(password, 10);
    const result = db.prepare(`
      INSERT INTO students (full_name, email, password_hash) VALUES (?, ?, ?)
    `).run(fullName, normalizedEmail, passwordHash);
    student = { id: result.lastInsertRowid, full_name: fullName, email: normalizedEmail };
  }

  const paymentResult = db.prepare(`
    INSERT INTO payments (student_id, full_name, plan_name, amount, method, status)
    VALUES (?, ?, ?, ?, 'pix', 'pending')
  `).run(student.id, fullName, planName, numericAmount);

  res.status(201).json({ id: paymentResult.lastInsertRowid, studentId: student.id });
});

// GET /api/payments  -- admin only, list all payments (most recent first)
router.get('/', requireRole('admin'), (req, res) => {
  const rows = db.prepare(`
    SELECT payments.*, students.email AS student_email
    FROM payments
    LEFT JOIN students ON students.id = payments.student_id
    ORDER BY payments.created_at DESC
  `).all();
  res.json(rows);
});

// PATCH /api/payments/:id/status  { status: 'confirmed' | 'rejected' }  -- admin only
router.patch('/:id/status', requireRole('admin'), (req, res) => {
  const { id } = req.params;
  const { status } = req.body || {};

  if (status !== 'confirmed' && status !== 'rejected') {
    return res.status(400).json({ error: 'status must be "confirmed" or "rejected"' });
  }

  const confirmedAt = status === 'confirmed' ? new Date().toISOString() : null;
  const result = db.prepare(`
    UPDATE payments SET status = ?, confirmed_at = ? WHERE id = ?
  `).run(status, confirmedAt, id);

  if (result.changes === 0) {
    return res.status(404).json({ error: 'Payment not found' });
  }

  res.json({ ok: true });
});

module.exports = router;
