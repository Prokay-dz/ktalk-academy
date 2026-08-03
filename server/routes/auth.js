const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();

// POST /api/auth/login
//   Admin:   { role: 'admin', password }
//   Student: { role: 'student', email, password }
router.post('/login', (req, res) => {
  const { role, password } = req.body || {};

  if (role === 'admin') {
    if (!password) return res.status(400).json({ error: 'password is required' });

    const row = db.prepare('SELECT password_hash FROM auth_credentials WHERE role = ?').get('admin');
    if (!row) return res.status(500).json({ error: 'Server not seeded yet - run `npm run seed`' });

    if (!bcrypt.compareSync(password, row.password_hash)) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '12h' });
    return res.json({ token, role: 'admin' });
  }

  if (role === 'student') {
    const { email } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: 'email and password are required' });

    const student = db.prepare('SELECT * FROM students WHERE email = ?').get(email.toLowerCase().trim());
    if (!student || !bcrypt.compareSync(password, student.password_hash)) {
      return res.status(401).json({ error: 'Incorrect email or password' });
    }

    const token = jwt.sign({ role: 'student', studentId: student.id }, process.env.JWT_SECRET, { expiresIn: '12h' });
    return res.json({ token, role: 'student', studentName: student.full_name });
  }

  return res.status(400).json({ error: 'role must be "student" or "admin"' });
});

module.exports = router;
