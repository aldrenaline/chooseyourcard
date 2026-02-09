# 📋 CYC Deployment Checklist

Follow these steps exactly, switching between your open tabs.

## 🟢 Tab 1: MongoDB Atlas (Database)
1.  **Log in** and select your cluster.
2.  Click **"Connect"** (Green button).
3.  Select **"Drivers"** (Node.js).
4.  **Copy connection string**. It looks like: `mongodb+srv://...`
5.  *Important*: Ensure your password is correct in the string.
6.  Go to **"Network Access"** (Left menu).
7.  Click **"Add IP Address"** -> **"Allow Access From Anywhere"** (`0.0.0.0/0`).
8.  Confirm/Save.

## 🟢 Tab 2: GitHub (Source Code)
1.  Verify `server/package.json` exists (we just created it).
2.  Verify `vercel.json` exists.
3.  **Commit and Push** all changes if you haven't already.

## 🟢 Tab 3: Railway (Backend)
1.  Go to **Dashboard** -> **New Project** -> **Deploy from GitHub**.
2.  Select your `cyc` repository.
3.  **Important**: It will auto-detect the app.
4.  Click **Settings** -> **Variables**.
5.  Click **New Variable**:
    *   Key: `MONGODB_URI`
    *   Value: (Paste string from Tab 1)
6.  Add another variable:
    *   Key: `IP_SALT`
    *   Value: `any_random_text_here`
7.  Go to **Settings** -> **General** -> **Build Command**.
    *   Set Root Directory to: `/server` (if it asks) or ensure it detects `server/package.json`.
    *   *Note*: If Railway tries to build the root, go to Settings -> General -> Root Directory and set it to `/server`.
8.  Go to **Networking** -> **Generate Domain**.
    *   Copy this URL (e.g., `https://cyc-production.up.railway.app`).

## 🟢 Tab 4: Local Code (Update Frontend)
1.  Open `services/analyticsService.ts`.
2.  Replace `PROD_API_BASE_URL` with the **Railway URL** from Tab 3.
    *   Example: `const PROD_API_BASE_URL = 'https://cyc-production.up.railway.app/api';`
3.  **Commit and Push** this change to GitHub.

## 🟢 Tab 5: Vercel (Frontend)
1.  Go to **Dashboard** -> **Add New...** -> **Project**.
2.  Import `cyc` repository.
3.  **Framework Preset**: Select "Other" or "Vite" (since we use ES modules).
4.  **Root Directory**: `./` (Default).
5.  Click **Deploy**.
6.  Once live, click the domain (e.g., `cyc.vercel.app`).

## 🟢 Tab 6: Hostinger (Optional Domain)
1.  Go to **DNS Zone Editor**.
2.  Add a **CNAME** record:
    *   Name: `www`
    *   Target: `cname.vercel-dns.com`
3.  Or an **A Record** (Vercel provides the IP in their settings).
4.  Go to Vercel -> Settings -> Domains and add `yourdomain.com`.

## ✅ Final Verification
1.  Open your Vercel App URL.
2.  Search for "Swiggy".
3.  Check the browser console (F12) for: `[Analytics] ✅ Log success`.
4.  Go to MongoDB Atlas -> Browse Collections -> `searchlogs`. You should see the entry!
