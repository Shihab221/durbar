# Team Durbar Backend Setup Guide

## Overview

This backend provides:
- **User Authentication** (JWT-based signup/login)
- **Profile Management** with admin approval
- **Blog System** with admin approval
- **Admin Dashboard** for managing content

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: PostgreSQL (Vercel Postgres)
- **ORM**: Prisma
- **Auth**: JWT + bcrypt
- **File Storage**: Vercel Blob

---

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the project root:

```env
# Database (Vercel Postgres or any PostgreSQL)
DATABASE_URL="postgresql://username:password@host:5432/database?sslmode=require"

# JWT Secret (generate a strong random string, min 32 characters)
JWT_SECRET="your-super-secret-jwt-key-min-32-chars-long"

# Vercel Blob Storage (for image uploads)
BLOB_READ_WRITE_TOKEN="your-vercel-blob-token"

# Gemini API Key (for chatbot - optional)
GEMINI_API_KEY="your-gemini-api-key"
```

### 3. Set Up Database

**Option A: Using Vercel Postgres (Recommended)**

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project → Storage → Create Database → Postgres
3. Copy the `DATABASE_URL` to your `.env.local`

**Option B: Local PostgreSQL**

1. Install PostgreSQL locally
2. Create a database: `createdb teamdurbar`
3. Set `DATABASE_URL=postgresql://localhost:5432/teamdurbar`

### 4. Run Database Migrations

```bash
# Push schema to database (development)
npm run db:push

# Or run migrations (production)
npm run db:migrate
```

### 5. Seed the Superadmin

```bash
npm run db:seed
```

This creates:
- **Username**: `admin`
- **Email**: `admin@teamdurbar.kuet.ac.bd`
- **Password**: `password@123`
- **Role**: `superadmin`

### 6. Start Development Server

```bash
npm run dev
```

---

## API Endpoints

### Authentication

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/signup` | POST | Register new user |
| `/api/auth/login` | POST | Login and get JWT token |
| `/api/auth/me` | GET | Get current user (requires auth) |

### Profile Management

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/profile/update` | POST | Submit profile update for approval |
| `/api/profile/update` | GET | Get user's update history |
| `/api/profile/upload` | POST | Upload profile image |
| `/api/users/approved` | GET | Get all approved users (for /about page) |

### Blog Posts

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/blogs` | POST | Create new blog post |
| `/api/blogs` | GET | Get user's blog posts |
| `/api/blogs/approved` | GET | Get all approved blogs (public) |
| `/api/blogs/[id]` | GET | Get single blog post |
| `/api/blogs/upload` | POST | Upload blog images |

### Admin (Requires Admin Role)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/admin/stats` | GET | Get dashboard statistics |
| `/api/admin/pending/profiles` | GET | Get pending profile updates |
| `/api/admin/pending/blogs` | GET | Get pending blog posts |
| `/api/admin/profile/[id]` | PATCH | Approve/reject profile update |
| `/api/admin/blog/[id]` | PATCH | Approve/reject blog post |

---

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

Or as a cookie named `token`.

---

## Database Schema

### User
- `id`, `username`, `email`, `password` (hashed)
- `role`: "user" | "admin" | "superadmin"
- Profile fields: `name`, `imageUrl`, `batch`, `roll`, `subTeam`, `designation`, `contribution`
- `isProfileApproved`: boolean

### ProfileUpdate
- Stores pending profile update requests
- `status`: "pending" | "approved" | "rejected"

### Blog
- `title`, `content`, `excerpt`, `imageUrls[]`
- `status`: "pending" | "approved" | "rejected"
- `author` relationship to User

---

## Frontend Pages

| Route | Description |
|-------|-------------|
| `/login` | User login page |
| `/signup` | User registration page |
| `/profile` | User profile & blog submission |
| `/admin` | Admin dashboard (requires admin role) |
| `/projects/[id]` | Individual blog post page |

---

## Deployment to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel Dashboard:
   - `DATABASE_URL` (from Vercel Postgres)
   - `JWT_SECRET`
   - `BLOB_READ_WRITE_TOKEN` (from Vercel Blob Storage)
4. Deploy!

### Post-Deployment

1. Run the seed command via Vercel CLI or locally connected to production DB
2. Login as admin to approve initial content

---

## Sub Teams (Enum Values)

When submitting profile updates, `subTeam` must be one of:
- `mechanical`
- `control`
- `autonomous`
- `science`
- `management`

---

## Security Features

- Password hashing with bcrypt (12 rounds)
- JWT tokens with 7-day expiration
- Input validation and sanitization
- Protected admin routes
- File type and size validation for uploads
- SQL injection protection via Prisma

---

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run db:push      # Push schema to database
npm run db:migrate   # Run migrations
npm run db:seed      # Seed superadmin user
npm run db:studio    # Open Prisma Studio (DB GUI)
```
