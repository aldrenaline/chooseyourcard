# 🚀 CYC Production Deployment Guide

This guide covers deploying the backend to **Railway** and the frontend to **Vercel**.

---

## Part 1: Backend Deployment (Railway)

1. **Push Code to GitHub**:
   - Ensure your project is in a GitHub repository.

2. **Sign up on Railway**:
   - Go to [railway.app](https://railway.app/) and login with GitHub.

3. **Create New Project**:
   - Click **"New Project"** -> **"Deploy from GitHub repo"**.
   - Select your CYC repository.
   - Click **"Deploy Now"**.

4. **Add Environment Variables**:
   - Once the project is created, go to the **"Settings"** or **"Variables"** tab.
   - Add the following variable:
     - `MONGODB_URI`: (Paste your connection string from `MONGODB_GUIDE.md`)
   - Railway handles the `PORT` automatically.

5. **Get Production URL**:
   - Go to **"Settings"** -> **"Networking"**.
   - Click **"Generate Domain"**.
   - You will get a URL like `https://cyc-backend-production.up.railway.app`.
   - **Copy this URL**.

---

## Part 2: Frontend Configuration

1. **Update API URL**:
   - Open `services/analyticsService.ts`.
   - Find `PROD_API_BASE_URL`.
   - Replace the placeholder with your **Railway URL** + `/api`.
   - Example:
     ```typescript
     const PROD_API_BASE_URL = 'https://cyc-backend-production.up.railway.app/api';
     ```

2. **Commit Changes**:
   - Push this change to GitHub so Vercel picks it up.

---

## Part 3: Frontend Deployment (Vercel)

1. **Sign up on Vercel**:
   - Go to [vercel.com](https://vercel.com).

2. **Import Project**:
   - Click **"Add New..."** -> **"Project"**.
   - Import your GitHub repository.

3. **Configure Build**:
   - Framework Preset: **Create React App** (or Vite if you switched).
   - *Note: Since this project currently uses `index.html` with no build step in the root, simply deploying it as a static site works.*
   - If Vercel asks for build settings, just leave defaults.

4. **Deploy**:
   - Click **"Deploy"**.

---

## Part 4: Verification

1. Open your Vercel URL (e.g., `https://choose-your-card.vercel.app`).
2. Perform a search (e.g., "Swiggy").
3. Scroll down to the Footer.
4. Click the small **Bar Chart icon** next to the copyright text.
5. If the dashboard loads data, your full-stack app is live! 
