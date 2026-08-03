require('dotenv').config();
const bcrypt = require('bcryptjs');
const db = require('./db');

const adminPassword = process.env.ADMIN_PASSWORD || 'lefl2026';

const upsert = db.prepare(`
  INSERT INTO auth_credentials (role, password_hash) VALUES (?, ?)
  ON CONFLICT(role) DO UPDATE SET password_hash = excluded.password_hash
`);

upsert.run('admin', bcrypt.hashSync(adminPassword, 10));

console.log('Seeded/updated admin credentials.');
console.log('(Students now create their own accounts with email + password when they pay - nothing to seed for them.)');
console.log('Re-run `npm run seed` any time you change ADMIN_PASSWORD in .env');
