# KTalk Academy

## What's in here

- `LEFLedited.html` — the whole frontend (single file, React via CDN + Babel — no build step needed). This is the file you open in a browser / deploy as your site.
- `server/` — the real backend (Node.js + Express + SQLite). Handles admin login, student accounts, PIX payment records, and course content.
- `public/` — favicon files generated from your logo.

## How payment actually works (no payment gateway)

When someone wants to pay, they get two choices:
1. **Chat with Judy on WhatsApp** — opens a WhatsApp conversation directly. No account, no record — just a conversation.
2. **Pay via PIX** — shows the PIX key (`favy20@gmail.com`), lets them propose their own amount (R$25 minimum, enforced both in the browser and on the server), and has them create an account (name, email, password) at the same time. Submitting:
   - Creates their student account in the database
   - Creates a **pending** payment record
   - Opens WhatsApp with a message to Judy so she knows to check for it

Judy is the one confirming everything — nothing is automatic. She sees pending payments in her dashboard and clicks **Confirm** once she's checked her account and actually seen the money land.

## Admin Dashboard

Judy's dashboard (after logging in with the admin password) has three tabs:
- **Payments** — every PIX submission, with Confirm/Reject buttons
- **Students** — every account created, with their latest plan and payment status
- **Courses** — full CRUD (add/edit/delete) for the course cards shown on the site's homepage. Whatever she edits here is exactly what visitors see.

## Running it locally (read this if you're new to this — it's simple, just needs 2 steps in order)

There are two separate pieces that both need to be "on" at the same time: the backend (a program that runs in a terminal window and has to **stay open**), and the frontend (the HTML file you view in your browser). Opening the HTML file by itself does **not** start the backend — that's a separate step, and it's the #1 cause of "could not reach the server" errors.

**Step 1 — Start the backend (do this first, and leave this terminal window open):**
```
cd server
npm install
cp .env.example .env
npm run seed       # hashes the admin password in .env into the database
npm run dev        # starts the API on http://localhost:4000
```
You'll know it worked when you see: `KTalk Academy API listening on http://localhost:4000`
Leave this terminal window open the whole time you're testing the site — closing it (or the terminal app) stops the backend, and the site will go right back to showing "could not reach the server."

You can double-check it's really running by opening `http://localhost:4000/api/health` in a browser tab — it should show `{"ok":true}`.

**Step 2 — Open the frontend:**
With the backend still running, open `LEFLedited.html` in your browser. It's already pointed at `http://localhost:4000/api`.

**Step 3 — Log in as admin:**
Password: `lefl2026` (change it in `server/.env`, then re-run `npm run seed`, to update it).

**Step 4 — Log in as a student:**
Students don't have a preset password — pay via PIX on the site once to create an account, then log in with that email/password.

## Deploying this for real

Right now both pieces run on your machine only. To make the site live on the internet, you need to host both parts:

- **Frontend** (`LEFLedited.html` + `public/`): any static host — Netlify, Vercel, GitHub Pages, etc. Free tier is fine.
- **Backend** (`server/`): needs a host that runs a Node.js process continuously — Render, Railway, or Fly.io all have free/cheap tiers that work well. After deploying, you'll get a URL like `https://your-app.onrender.com`.
- Once the backend is deployed, open `LEFLedited.html` and change the `API_BASE_URL` constant near the top of the `<script>` block from `http://localhost:4000/api` to your deployed backend's URL.
- On the backend host, set the environment variables from `.env.example` (especially a strong, random `JWT_SECRET`, your real `ADMIN_PASSWORD`, and `CORS_ORIGIN` set to your frontend's deployed URL) — then run `npm run seed` once on that host too.
- **Important:** the SQLite database file (`server/ktalk.db`) lives on whatever server the backend runs on. Some hosts (like Render's free tier) wipe the filesystem on restart/redeploy — check whether they offer a persistent disk add-on, or your student/payment/course data won't survive a redeploy.

## Troubleshooting

**"Could not reach the server" / "Failed to fetch"** — This always means the browser couldn't complete the request to the backend at all (it's a connectivity issue, never a "did they actually pay" issue — payment/validation problems show a specific message instead, like "amount must be at least 25"). Most likely cause:
1. The backend isn't running — see Step 1 above. It has to be running in an open terminal window the whole time you're using the site.
2. It's running, but on a different port than `4000` — check the `API_BASE_URL` constant near the top of `LEFLedited.html`'s `<script>` block matches wherever your server actually is.
3. Once deployed live: the frontend is on `https://` but still pointed at a `http://localhost:...` backend — browsers block that. Update `API_BASE_URL` to your deployed backend's `https://` URL.

(There used to also be a bug where a real connectivity failure showed the raw browser error message instead of a clear one, and a separate CORS issue blocking file:// access — both are fixed now.)

## Honest limitations to know about

- No automatic payment verification — Judy manually confirms every PIX payment after checking her own account. This is by design (no payment gateway), but it does mean there's a manual step every time.
- Passwords are hashed (bcrypt) and never stored in plain text, but there's no "forgot password" flow yet — if a student forgets theirs, Judy would need to help via the database directly, or a reset flow would need to be added later.
- The SQLite database is a single file. Back it up periodically once real student/payment data is in it.
