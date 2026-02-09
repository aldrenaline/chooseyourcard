# 🧪 CYC Backend Testing Guide

This guide helps you verify the MongoDB backend, analytics logging, and API endpoints.

## 🚀 Quick Start (Mock Mode)

You can test the entire backend flow **without** setting up MongoDB. The server has an in-memory "Mock Mode".

1. **Install Dependencies**:
   ```bash
   cd server
   npm install express mongoose cors dotenv express-rate-limit
   ```

2. **Start Server**:
   ```bash
   node server/index.js
   ```
   *You will see a warning: "Falling back to MOCK MODE". This is expected.*

3. **Open API Tester**:
   Open `test/api_tester.html` in your browser.
   
4. **Verify**:
   - Click **"Ping Server"** -> Should show ONLINE.
   - Click **"Seed Mock Data"** -> Adds 50 dummy records to memory.
   - Click **"Fetch Top Stats"** -> Should show the generated data.

---

## 🐘 Real MongoDB Setup (Production Test)

To test with a real database:

1. **Get Connection String**:
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
   - Create a free cluster.
   - Get the connection string (e.g., `mongodb+srv://user:pass@cluster.mongodb.net/cyc`).

2. **Configure Environment**:
   Create a `.env` file in the project root:
   ```env
   MONGODB_URI=your_connection_string_here
   PORT=5000
   ```

3. **Restart Server**:
   ```bash
   node server/index.js
   ```
   *Should verify "MongoDB Connected".*

---

## 💻 CLI Testing (curl)

You can also test endpoints directly from the terminal.

**1. Log a Search**
```bash
curl -X POST http://localhost:5000/api/search/log \
  -H "Content-Type: application/json" \
  -d '{"merchant": "CLI Test", "category": "Test", "amount": 500, "recommendedCard": "cli-card", "recommendedCardName": "CLI Card"}'
```

**2. Get Analytics**
```bash
curl http://localhost:5000/api/search/analytics
```

**3. Seed Data (Mock Mode Only)**
```bash
curl -X POST http://localhost:5000/api/test/seed \
  -H "Content-Type: application/json" \
  -d '{"count": 100}'
```

---

## 🔍 Frontend Verification

1. Open the Browser Console (F12).
2. Use the app to search for a card (e.g., "Swiggy").
3. Look for logs:
   - `[Analytics] Logging search: Swiggy`
   - `[Analytics] Log success`

If the backend is offline, the app handles it gracefully (no errors shown to user, but logged in console as warning).
