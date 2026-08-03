# Deploy Checklist (one pass, in order)

This project now has `render.yaml` and `netlify.toml` in it, so both hosts
auto-detect their settings — you don't need to type in build/start commands
by hand.

## 1. Push this folder to GitHub
Both Render and Netlify deploy from a git repo. Create a new repo and push
this whole folder to it.

## 2. Deploy the backend on Render
1. Go to https://dashboard.render.com → **New → Blueprint**.
2. Connect your GitHub repo. Render will read `render.yaml` automatically
   and pre-fill the service (root dir `server`, build `npm install`,
   start `npm start`).
3. It'll ask you to fill in two values it can't guess:
   - `ADMIN_PASSWORD` — Judy's real admin login password
   - `CORS_ORIGIN` — leave blank for now, come back and set it in step 4
4. Click **Apply**. Wait for it to finish deploying.
5. Copy the URL Render gives you, e.g. `https://ktalk-academy-api.onrender.com`

The admin password is set automatically from the `ADMIN_PASSWORD` you typed
in step 3 every time the server starts — no shell/SSH access needed (that's
a paid-plan-only feature on Render anyway).

⚠️ Free tier has no persistent disk — the database resets on every
redeploy/restart. Fine for testing; upgrade to a paid plan before you have
real student/payment data you care about (see the commented `disk:` block
in `render.yaml`).

## 3. Point the frontend at your backend
Open `LEFLedited.html`, find the line marked `>>> DEPLOY STEP` near the top
of the `<script>` block, and change:
```js
const API_BASE_URL = 'http://localhost:4000/api';
```
to your Render URL + `/api`, e.g.:
```js
const API_BASE_URL = 'https://ktalk-academy-api.onrender.com/api';
```

## 4. Deploy the frontend on Netlify
1. Go to https://app.netlify.com → drag this whole folder onto the deploy
   area (or connect the same GitHub repo — Netlify will read `netlify.toml`
   automatically and serve `LEFLedited.html` at your root URL).
2. Copy the URL Netlify gives you, e.g. `https://ktalk-academy.netlify.app`

## 5. Close the loop
Go back to Render → your service → **Environment** → set `CORS_ORIGIN` to
your Netlify URL from step 4 → save (this triggers a redeploy automatically).

## Done
Visit your Netlify URL. Log in as admin with the password you set in step 2
to confirm the dashboard can reach the backend.
