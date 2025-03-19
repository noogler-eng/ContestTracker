# 🚀 Contest Tracker Web App

- Check out the demo video here 👉 [Project Demo - Loom](https://www.loom.com/share/291596e8b92e4fd297c14f31240fd02e?sid=8f333bf6-ffe1-4644-ba10-4545e6ea9566)

## 📖 Description

- This project is a contest tracker web application that helps users stay updated with coding contests from platforms like Codeforces, CodeChef, and LeetCode.

### ✨ Key Features:

- View upcoming and past contests
- Bookmark contests
- Filter contests by platform
- Watch video solutions
- Admins can manually add solution videos
- Automated YouTube video solution fetcher via a backend cron job

### 🛠️ Tech Stack

- Frontend: React, Next.js, Tailwind CSS, Next UI
- Backend: Node.js, Express, REST APIs
- Database: MongoDB
- Others: Docker, Google OAuth, YouTube API, Cron Jobs, Recoil

## 🚀 Features

- ✅ Fetch contests from multiple platforms
- ✅ View upcoming and past contests
- ✅ Google Authentication (Login)
- ✅ Automatic YouTube video fetcher
- ✅ Bookmark contests
- ✅ Pagination support
- ✅ Responsive UI
- ✅ Admin functionality to add video solutions manually

## 📽️ Demo

- Check out the demo video here 👉 [Project Demo - Loom](https://www.loom.com/share/291596e8b92e4fd297c14f31240fd02e?sid=8f333bf6-ffe1-4644-ba10-4545e6ea9566)

## 📷 Screenshots

### 🏠 Homepage

- Platform filter bar, User login with Google

 <img width="1440" alt="Homepage Screenshot" src="https://github.com/user-attachments/assets/a48c9e45-a003-4e97-95ec-2f595a68650a" />

### 📑 Pagination Example

<img width="1440" alt="Pagination Screenshot" src="https://github.com/user-attachments/assets/ef27beae-3e6f-40f5-94e5-fa66457fcbe9" />

### 👤 Profile Page

- Displays logged-in user details
- Admin badge for admin users

 <img width="1440" alt="Profile Screenshot" src="https://github.com/user-attachments/assets/4f109421-c541-4a3d-ae3e-4dd3714f1d5d" />

### 🏆 Contest Card Example

- Watch video solution
- Navigate to the contest platform
- Admin-only manual video upload option

 <img width="1440" alt="Contest Card Screenshot" src="https://github.com/user-attachments/assets/5ab76daf-48e8-4b49-8c41-34da3b4c36e5" />

### 🔄 Cron Job (Backend)

- Automatic YouTube video fetch at 8 AM daily
- Updates contest video solutions

 <img width="1440" alt="Cron Job Screenshot" src="https://github.com/user-attachments/assets/e3fd6f65-8d62-432a-a1f3-d2b01a85b9ed" />

### 🧠 Future Improvements

- Add contest reminders/notifications
- Enhance authentication features
- Integrate more competitive programming platforms

### 📥 Installation Guide

### Clone the Project

```bash
git clone <your-repo-link>
cd <project-folder>
```

### 🌐 Environment Variables (.env)

```.env
PORT=
MONGO_URI=""
YOUTUBE_API=""
```

### 🔌 Backend Setup

```bash
cd backend
npm install
tsc -b
node dist/index.js
```

### 🎨 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## api's

- /contests/upcomming_contest (GET)
- /contests/past_contest (GET)
- /contests/upload_solution (POST)

- /user/profile (GET)
- /user/bookmarks (GET)
- /user/bookmarks (POST)

- /auth/google (POST)

## Project Structure

```pgsql
📦 Project Root
├── 📂 backend
│   ├── 📂 src
│   │   ├── 📂 controllers
│   │   ├── 📂 cron
│   │   ├── 📂 middleware
│   │   ├── 📂 models
│   │   ├── 📂 routers
│   │   ├── 📂 types
│   │   ├── index.ts
│   │   ├── .env
│   │   └── docker-compose.yml
│
├── 📂 frontend
│   ├── 📂 public
│   ├── 📂 src
│   │   ├── 📂 assets
│   │   ├── 📂 components
│   │   │   ├── 📂 common
│   │   │   ├── 📂 providers
│   │   │   │   ├── authprovider.tsx
│   │   │   │   └── recoilprovider.tsx
│   │   │   ├── 📂 ui
│   │   ├── 📂 hooks
│   │   │   ├── useMyContests.tsx
│   │   │   ├── usePastContests.tsx
│   │   │   └── useUpcomingContests.tsx
│   │   ├── 📂 lib
│   │   ├── 📂 pages
│   │   │   ├── Bookmarks.tsx
│   │   │   ├── Home.tsx
│   │   │   ├── Profile.tsx
│   │   ├── 📂 store
│   │   │   └── user_atom.ts
│   │   ├── 📂 types
│   │   │   └── contest_type.tsx
│   │   ├── 📂 utils
│   │   │   ├── format_time.tsx
│   │   │   └── platform_color.tsx
│   │   ├── app.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   └── .gitignore
```

### ⭐️ If you like this project, don't forget to give it a star!
