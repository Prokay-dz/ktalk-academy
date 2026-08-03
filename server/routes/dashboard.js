const express = require('express');
const db = require('../db');
const { requireRole } = require('../middleware/auth');

const router = express.Router();

// GET /api/dashboard/stats  -- admin only
router.get('/stats', requireRole('admin'), (req, res) => {
  const confirmedCount = db.prepare(`SELECT COUNT(*) AS n FROM payments WHERE status = 'confirmed'`).get().n;
  const pendingCount = db.prepare(`SELECT COUNT(*) AS n FROM payments WHERE status = 'pending'`).get().n;
  const confirmedRevenue = db.prepare(`SELECT COALESCE(SUM(amount), 0) AS total FROM payments WHERE status = 'confirmed'`).get().total;
  const totalStudents = db.prepare(`SELECT COUNT(*) AS n FROM students`).get().n;

  res.json({
    confirmedStudents: confirmedCount,
    pendingPayments: pendingCount,
    confirmedRevenue,
    totalStudents
  });
});

module.exports = router;
