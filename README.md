# 🏥 HealthShare Backend

AI-Powered Health Platform - Backend API

## 🚀 Quick Deploy to Railway

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/new)

## 📋 Prerequisites

- Node.js 18+
- Supabase account (PostgreSQL database)
- Groq API key (for AI features)
- LiveKit account (for video consultations)

## 🛠️ Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create `.env` file (copy from `.env.example`):
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_supabase_anon_key
PORT=8000
JWT_SECRET=your_super_secret_jwt_key
GROQ_API_KEY=your_groq_api_key
LIVEKIT_URL=wss://your-project.livekit.cloud
LIVEKIT_API_KEY=your_livekit_api_key
LIVEKIT_API_SECRET=your_livekit_api_secret
```

### 3. Setup Database
Run `schema.sql` in your Supabase SQL Editor to create tables.

### 4. Run Development Server
```bash
npm run dev
```

Server runs on [http://localhost:8000](http://localhost:8000)

## 🌐 Railway Deployment

### Method 1: Railway Dashboard (Recommended)

1. **Go to [railway.app](https://railway.app)**
2. **Click "New Project"**
3. **Select "Deploy from GitHub repo"**
4. **Choose:** `Ashwath2103/health-backend`
5. **Add Environment Variables:**
   ```
   SUPABASE_URL = https://your-project.supabase.co
   SUPABASE_KEY = your_supabase_anon_key
   PORT = 8000
   JWT_SECRET = your_super_secret_jwt_key
   GROQ_API_KEY = your_groq_api_key
   LIVEKIT_URL = wss://your-project.livekit.cloud
   LIVEKIT_API_KEY = your_livekit_api_key
   LIVEKIT_API_SECRET = your_livekit_api_secret
   ```
6. **Click "Deploy"**
7. **Copy the deployment URL** (e.g., `https://health-backend-production.up.railway.app`)

### Method 2: Railway CLI

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link project
railway link

# Add environment variables
railway variables set SUPABASE_URL=your_value
railway variables set SUPABASE_KEY=your_value
railway variables set JWT_SECRET=your_value
railway variables set GROQ_API_KEY=your_value
railway variables set LIVEKIT_URL=your_value
railway variables set LIVEKIT_API_KEY=your_value
railway variables set LIVEKIT_API_SECRET=your_value

# Deploy
railway up
```

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `SUPABASE_URL` | Supabase project URL | ✅ |
| `SUPABASE_KEY` | Supabase anon/public key | ✅ |
| `PORT` | Server port (default: 8000) | ✅ |
| `JWT_SECRET` | Secret for JWT tokens | ✅ |
| `GROQ_API_KEY` | Groq API key for AI | ✅ |
| `LIVEKIT_URL` | LiveKit WebSocket URL | ✅ |
| `LIVEKIT_API_KEY` | LiveKit API key | ✅ |
| `LIVEKIT_API_SECRET` | LiveKit API secret | ✅ |

## 📡 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### AI Features
- `POST /api/chat` - AI health assistant
- `POST /api/ai/generate-note` - Generate clinical notes

### Video Consultation
- `POST /api/meeting/create` - Create consultation room
- `POST /api/meeting/join` - Join consultation room

### Citizen
- `GET /api/citizen/records` - Get medical records
- `POST /api/citizen/emergency-token` - Generate emergency token

### Doctor
- `GET /api/doctor/patients` - Search patients
- `GET /api/doctor/consultations` - Get consultation history

## 🗄️ Database Setup

1. Go to your Supabase project
2. Navigate to **SQL Editor**
3. Copy and paste contents of `schema.sql`
4. Click **Run**

This creates:
- `users` table (citizens & doctors)
- `medical_records` table (with blockchain hashing)
- `emergency_tokens` table
- `access_logs` table

## 🔗 After Deployment

1. **Copy your Railway URL** (e.g., `https://health-backend-production.up.railway.app`)
2. **Update Frontend Environment Variable:**
   - Go to Vercel project settings
   - Update `NEXT_PUBLIC_API_URL` to your Railway URL
   - Redeploy frontend

## 🧪 Testing

```bash
# Health check
curl https://your-backend-url.railway.app/

# Test login
curl -X POST https://your-backend-url.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"identifier":"12-3456-7890-0000","password":"password123"}'
```

## 📦 Dependencies

- **Express** - Web framework
- **Supabase** - PostgreSQL database
- **JWT** - Authentication
- **Groq** - AI/LLM
- **LiveKit** - Video infrastructure
- **Bcrypt** - Password hashing
- **Multer** - File uploads

## 🔗 Related

- **Frontend:** [health-frontend](https://github.com/Ashwath2103/health-frontend)
- **Main Repo:** [healthshare-platform](https://github.com/Shashanth27/healthshare-platform)

## 📄 License

MIT

---

**Need help?** Open an issue on GitHub!
