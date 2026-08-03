require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const db = require('./db');

const authRoutes = require('./routes/auth');
const paymentsRoutes = require('./routes/payments');
const dashboardRoutes = require('./routes/dashboard');
const studentsRoutes = require('./routes/students');
const coursesRoutes = require('./routes/courses');

const app = express();
const PORT = process.env.PORT || 4000;

// Auto-seed/refresh the admin password every time the server boots, using
// ADMIN_PASSWORD from the environment. This means you never need shell/SSH
// access (a paid-plan-only feature on Render) just to set up the admin
// login - it's handled automatically on every deploy and restart.
const adminPassword = process.env.ADMIN_PASSWORD || 'lefl2026';
db.prepare(`
  INSERT INTO auth_credentials (role, password_hash) VALUES ('admin', ?)
  ON CONFLICT(role) DO UPDATE SET password_hash = excluded.password_hash
`).run(bcrypt.hashSync(adminPassword, 10));
console.log('Admin credentials ready (from ADMIN_PASSWORD env var).');

const allowedOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map(o => o.trim())
  .filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // No allowlist configured -> allow everything (fine for local/dev use).
    if (allowedOrigins.length === 0) return callback(null, true);
    // No Origin header (curl, some server-to-server calls) or "null" (what
    // browsers send when the page is opened directly as a file:// page) -
    // always allow, since there's nothing meaningful to check against.
    if (!origin || origin === 'null') return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error(`Origin ${origin} not allowed by CORS`));
  }
}));
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ ok: true }));
app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/students', studentsRoutes);
app.use('/api/courses', coursesRoutes);

app.listen(PORT, () => {
  console.log(`KTalk Academy API listening on http://localhost:${PORT}`);
});
