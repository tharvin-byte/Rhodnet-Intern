# Deploying Bang & Olufsen "Pure" to Render

This project is fully prepared for instant deployment on [Render](https://render.com) as a high-performance **Static Site**.

---

## Prerequisites: Push to GitHub / GitLab

If you haven't pushed this repository to GitHub yet:

1. Create a new repository on [GitHub](https://github.com/new) (e.g. `bno-pure-experience`).
2. In your terminal in this directory (`e:\PROJECTS\animation`), run:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

---

## Deployment Options on Render

### Option 1: Render Blueprint (Recommended — 100% Automated)
A [`render.yaml`](./render.yaml) is already included at the root of the project.

1. Log in to [dashboard.render.com](https://dashboard.render.com).
2. Click **New +** in the top navigation bar and select **Blueprint**.
3. Connect your GitHub/GitLab repository.
4. Render will automatically detect [`render.yaml`](./render.yaml) and set up:
   - **Service Name:** `bno-pure-experience`
   - **Runtime:** Static Site
   - **Root Directory:** `react-app`
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `./dist`
   - **SPA Rewrite Rule:** `/*` → `/index.html`
   - **Asset Caching Headers:** `max-age=31536000` on static assets
5. Click **Apply**. Render will build and deploy your site to a live URL (e.g. `https://bno-pure-experience.onrender.com`).

---

### Option 2: Manual Static Site Setup

If you prefer to create the service manually in the Render dashboard:

1. In [Render Dashboard](https://dashboard.render.com), click **New +** → **Static Site**.
2. Connect your GitHub repository.
3. In the configuration form, specify:
   | Setting | Value |
   |---|---|
   | **Name** | `bno-pure-experience` |
   | **Branch** | `main` (or `master`) |
   | **Root Directory** | `react-app` |
   | **Build Command** | `npm install && npm run build` |
   | **Publish Directory** | `dist` |
4. *(Optional SPA Rewrite)* Under **Redirects/Rewrites**:
   - **Source:** `/*`
   - **Action:** `Rewrite`
   - **Destination:** `/index.html`
5. Click **Create Static Site**.
