# Netflix Clone - Fullstack Project

Dự án Netflix Clone được tách thành 3 phần chính: Backend, Frontend, và Admin Dashboard.

## Cấu trúc dự án

```
nextflix/
├── backend/          # API Backend (Next.js + Prisma + MongoDB)
├── frontend/         # Frontend (Next.js + React + TailwindCSS)
├── admin/            # Admin Dashboard (Next.js + React + TailwindCSS)
└── README.md        # Tài liệu này
```

## Các thành phần

### 1. Backend (Port 3001)
API server xử lý tất cả các logic backend, xác thực người dùng, và quản lý dữ liệu.

**Công nghệ:**
- Next.js 13
- Prisma ORM
- MongoDB Atlas
- NextAuth.js

**Cài đặt:**
```bash
cd backend
npm install
# Cấu hình .env.local
npm run dev
```

**API Endpoints:**
- `GET /api/movies` - Lấy tất cả phim
- `POST /api/movies` - Tạo phim mới
- `GET /api/movies/[id]` - Lấy chi tiết phim
- `PUT /api/movies/[id]` - Cập nhật phim
- `DELETE /api/movies/[id]` - Xóa phim

### 2. Frontend (Port 3000)
Giao diện người dùng chính cho xem phim Netflix.

**Công nghệ:**
- Next.js 13
- React 18
- TailwindCSS
- Redux Toolkit
- SWR for data fetching

**Cài đặt:**
```bash
cd frontend
npm install
# Cấu hình .env.local
npm run dev
```

### 3. Admin Dashboard (Port 3002)
Trang quản trị để quản lý các bộ phim, thể loại, và người dùng.

**Công nghệ:**
- Next.js 13
- React 18
- TailwindCSS
- Axios for API calls

**Cài đặt:**
```bash
cd admin
npm install
# Cấu hình .env.local
npm run dev
```

**Tính năng:**
- ✅ Xem danh sách phim
- ✅ Thêm phim mới
- ✅ Sửa thông tin phim
- ✅ Xóa phim
- ✅ Quản lý thể loại

## Cấu hình môi trường

### Backend - `backend/.env.local`
```
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/netflix
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your-secret-key-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_ID=your-github-id
GITHUB_SECRET=your-github-secret
```

### Frontend - `frontend/.env.local`
```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
```

### Admin - `admin/.env.local`
```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXTAUTH_URL=http://localhost:3002
NEXTAUTH_SECRET=your-secret-key-here
```

## Chạy dự án

### Cách 1: Chạy từng phần riêng biệt

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm run dev
# Backend chạy trên http://localhost:3001
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
# Frontend chạy trên http://localhost:3000
```

**Terminal 3 - Admin:**
```bash
cd admin
npm install
npm run dev
# Admin chạy trên http://localhost:3002
```

## URLs

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001
- **Admin**: http://localhost:3002

## Database Setup

1. Tạo MongoDB cluster tại https://www.mongodb.com/cloud/atlas
2. Lấy connection string và cập nhật `DATABASE_URL` trong backend `.env.local`
3. Chạy migrations:
   ```bash
   cd backend
   npx prisma migrate dev --name init
   ```

## Xác thực (Authentication)

Dự án sử dụng NextAuth.js cho xác thực:
- Google OAuth
- GitHub OAuth
- Credentials (Email/Password)

Hãy thiết lập OAuth credentials từ Google và GitHub Developer Console.

## Cấu trúc Database

Xem `backend/prisma/schema.prisma` để hiểu cấu trúc database:
- Users
- Movies
- Genres
- Accounts (OAuth)
- Sessions

## Build cho Production

```bash
# Backend
cd backend
npm run build
npm start

# Frontend
cd frontend
npm run build
npm start

# Admin
cd admin
npm run build
npm start
```

### Run development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
