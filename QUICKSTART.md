# 🚀 Quick Start Guide - HealthShare Platform

Complete setup guide for running the HealthShare platform locally.

## 📋 Prerequisites

Before you begin, make sure you have:

- ✅ **Node.js 18+** installed ([Download](https://nodejs.org/))
- ✅ **Git** installed ([Download](https://git-scm.com/))
- ✅ **Supabase account** ([Sign up free](https://supabase.com/))
- ✅ **Groq API key** ([Get free key](https://console.groq.com/))
- ✅ **LiveKit account** ([Sign up free](https://livekit.io/))

---

## 🎯 Step-by-Step Setup

### **Step 1: Clone the Repositories**

```bash
# Create a project folder
mkdir healthshare-app
cd healthshare-app

# Clone frontend
git clone https://github.com/Ashwath2103/health-frontend.git

# Clone backend
git clone https://github.com/Ashwath2103/health-backend.git
```

---

### **Step 2: Setup Supabase Database**

1. **Go to [supabase.com](https://supabase.com)** and create a new project
2. **Wait for database to initialize** (~2 minutes)
3. **Go to SQL Editor** (left sidebar)
4. **Copy the contents** of `health-backend/schema.sql`
5. **Paste and Run** in SQL Editor
6. **Get your credentials:**
   - Go to **Settings** → **API**
   - Copy `Project URL` (e.g., `https://xyz.supabase.co`)
   - Copy `anon/public` key

---

### **Step 3: Get API Keys**

#### **Groq API (for AI features):**
1. Go to [console.groq.com](https://console.groq.com/)
2. Sign up / Login
3. Go to **API Keys**
4. Click **Create API Key**
5. Copy the key (starts with `gsk_...`)

#### **LiveKit (for video calls):**
1. Go to [livekit.io](https://livekit.io/)
2. Sign up / Login
3. Create a new project
4. Copy:
   - **WebSocket URL** (e.g., `wss://your-project.livekit.cloud`)
   - **API Key**
   - **API Secret**

---

### **Step 4: Configure Backend**

```bash
cd health-backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your credentials
nano .env  # or use any text editor
```

**Fill in your `.env` file:**
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_supabase_anon_key_here
PORT=8000
JWT_SECRET=any-random-secret-string-here
GROQ_API_KEY=gsk_your_groq_key_here
LIVEKIT_URL=wss://your-project.livekit.cloud
LIVEKIT_API_KEY=your_livekit_api_key
LIVEKIT_API_SECRET=your_livekit_api_secret
```

**Start the backend:**
```bash
npm run dev
```

✅ Backend should now be running on **http://localhost:8000**

---

### **Step 5: Configure Frontend**

**Open a new terminal window:**

```bash
cd health-frontend

# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Edit .env.local
nano .env.local  # or use any text editor
```

**Fill in your `.env.local` file:**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_LIVEKIT_URL=wss://your-project.livekit.cloud
```

**Start the frontend:**
```bash
npm run dev
```

✅ Frontend should now be running on **http://localhost:3000**

---

## 🎉 You're Ready!

Open your browser and go to: **http://localhost:3000**

### **Demo Login Credentials:**

**Citizen (Patient):**
- ABHA ID: `12-3456-7890-0000`
- Password: `password123`

**Doctor:**
- License ID: `DOC-88219`
- Password: `password123`

---

## 🧪 Test the Features

### **1. AI Chatbot**
- Login as Citizen
- Click the **floating robot icon** (bottom-right)
- Ask: *"I have a fever, what should I take?"*

### **2. AI Clinical Notes**
- Login as Doctor
- Go to **Dashboard**
- Fill in symptoms/diagnosis
- Click **"Generate Clinical Note"**

### **3. Video Consultation**
- **Doctor:** Search patient → Click **"Start Video Call"**
- **Copy Room ID** from purple banner
- **Patient:** Go to **"Video Consultation"** → Paste Room ID → Join

---

## 🐛 Troubleshooting

### **Backend won't start:**
```bash
# Check if port 8000 is already in use
lsof -i :8000

# Kill the process if needed
kill -9 <PID>

# Restart backend
npm run dev
```

### **Frontend won't start:**
```bash
# Check if port 3000 is already in use
lsof -i :3000

# Kill the process if needed
kill -9 <PID>

# Restart frontend
npm run dev
```

### **Database connection error:**
- Double-check your `SUPABASE_URL` and `SUPABASE_KEY`
- Make sure you ran `schema.sql` in Supabase SQL Editor

### **AI not working:**
- Verify your `GROQ_API_KEY` is correct
- Check Groq console for API limits

### **Video call not working:**
- Verify `LIVEKIT_URL`, `LIVEKIT_API_KEY`, and `LIVEKIT_API_SECRET`
- Make sure both users are using the **same Room ID**
- Allow camera/microphone permissions in browser

---

## 📚 Project Structure

```
healthshare-app/
├── health-backend/          # Express.js API
│   ├── src/
│   │   ├── controllers/     # API logic
│   │   ├── routes/          # API endpoints
│   │   └── index.js         # Server entry
│   ├── schema.sql           # Database schema
│   └── .env                 # Your credentials
│
└── health-frontend/         # Next.js app
    ├── src/
    │   ├── app/             # Pages (citizen, doctor, etc.)
    │   ├── components/      # UI components
    │   └── services/        # API calls
    └── .env.local           # Your credentials
```

---

## 🚀 Next Steps

Once everything works locally:

1. **Deploy Backend** to Railway ([Guide](https://github.com/Ashwath2103/health-backend#-railway-deployment))
2. **Deploy Frontend** to Vercel ([Guide](https://github.com/Ashwath2103/health-frontend#-vercel-deployment))

---

## 💡 Need Help?

- **Backend Issues:** Check [health-backend README](https://github.com/Ashwath2103/health-backend)
- **Frontend Issues:** Check [health-frontend README](https://github.com/Ashwath2103/health-frontend)
- **Open an Issue:** [GitHub Issues](https://github.com/Ashwath2103/health-frontend/issues)

---

**Happy Coding! 🎉**
