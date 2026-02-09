# 🍃 MongoDB Atlas Setup Guide

Follow these steps to get your connection string for the backend.

### Step 1: Create an Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).
2. Sign up (you can use Google).

### Step 2: Deploy a Free Cluster
1. After login, click **"Build a Database"**.
2. Select **M0 Free** (Shared).
3. Choose a provider (AWS) and a region near you (e.g., Mumbai `ap-south-1` for India).
4. Click **"Create"**.

### Step 3: Create a Database User
1. You will be prompted to create a user.
2. **Username**: `cyc_admin` (or similar).
3. **Password**: Click "Autogenerate Secure Password" and **COPY IT** immediately.
4. Click **"Create User"**.

### Step 4: Network Access (Whitelist IP)
1. In "Network Access", choose **"My Local Environment"** to add your current IP.
2. **IMPORTANT for Production**: Also add `0.0.0.0/0` (Allow Access from Anywhere) so your deployed server (Railway/Vercel) can connect.
   - Click "Add IP Address" -> "Allow Access from Anywhere".
3. Click **"Finish and Close"**.

### Step 5: Get Connection String
1. On your Database Dashboard, click **"Connect"**.
2. Select **"Drivers"** (Node.js).
3. Copy the connection string. It looks like:
   ```
   mongodb+srv://cyc_admin:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   ```
4. Replace `<password>` with the password you generated in Step 3.

### Step 6: Use in App
1. Create a `.env` file in the root folder.
2. Add: `MONGODB_URI=your_connection_string_here`
