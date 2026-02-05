# Health Unified Interface - Backend

This is the backend server for the **Health Unified Interface**, a digital health record system connecting Citizens and Doctors. It handles authentication, data management via Supabase, and secure file uploads.

## 🚀 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: Supabase (PostgreSQL)
- **Auth**: JWT (JSON Web Token)
- **File Storage**: Multer (Local/Cloud)

## 🛠️ Setup & Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ashwath2103/health-backend.git
   cd health-backend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   PORT=8000
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_anon_key
   JWT_SECRET=your_secret_key
   ```

4. **Database Setup**
   - Run the SQL commands from `schema.sql` in your Supabase SQL Editor to create the necessary tables (`users`, `medical_records`, `consents`).
   - Run `node seed.js` to populate initial demo data (optional).

5. **Run Server**
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:8000`.

## 🔑 Demo Credentials

If you haven't set up the database, you can use these hardcoded demo credentials to test the Auth flow:

| Role | User ID | Password |
|------|---------|----------|
| **Citizen** | `12-3456-7890-0000` | `password123` |
| **Doctor** | `DOC-88219` | `password123` |

## 📡 API Endpoints

### Authentication
- `POST /api/auth/citizen/login` - Login for patients.
- `POST /api/auth/doctor/login` - Login for doctors.

### Citizen
- `GET /api/citizen/profile/:userId` - Get user details.
- `GET /api/citizen/history/:userId` - Get medical timeline.
- `POST /api/citizen/upload` - Upload medical records.

### Doctor
- `GET /api/doctor/search` - Search patient by ABHA ID.
- `POST /api/doctor/record` - Add new consultation record.

## 🤝 Contributing

1. Fork the repo.
2. Create your feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes.
4. Push to the branch.
5. Open a Pull Request.
