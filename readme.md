# 🚀 Contest Tracker Web App

- Check out the demo video here 👉 [Project Demo - Loom](https://www.loom.com/share/fcc64a0aca7b43e9927594b70af096b4?sid=c89332bd-54a9-4335-9878-cfe0c6dfa0c9)

  
NOTE: sometime it will take 1 or 2 min to start as it is a free service from render --- --- -- ---

Backend Deployment Link: [https://assignment-qh3o.onrender.com](https://assignment-qh3o.onrender.com)

Frontend Deployment Link: [https://assignment-psi-ivory.vercel.app/](https://assignment-psi-ivory.vercel.app/)

## 📖 Description

- This project is a contest tracker web application that helps users stay updated with coding contests from platforms like Codeforces, CodeChef, and LeetCode.

### ✨ Key Features:

- View upcoming and past contests
- Bookmark contests
- Filter contests by platform
- Watch video solutions
- Admins can manually add solution videos
- Automated YouTube video solution fetcher via a backend cron job
-  ❤️❤️I am not scrapping the data instead of that i am fetching the data from offical API's which reduce the latency and increase efficiency.❤️❤️

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

- Check out the demo video here 👉 [Project Demo - Loom](https://www.loom.com/share/fcc64a0aca7b43e9927594b70af096b4?sid=c89332bd-54a9-4335-9878-cfe0c6dfa0c9)

## 📷 Screenshots

### 🏠 Homepage

- Platform filter bar, User login with Google

<img width="1440" alt="Screenshot 2025-03-24 at 11 51 27 PM" src="https://github.com/user-attachments/assets/5e038f39-de5e-42d5-961a-9041bce2977b" />

<img width="1440" alt="Screenshot 2025-03-24 at 11 52 16 PM" src="https://github.com/user-attachments/assets/dd0bd510-4ce8-4069-882a-df21ecca077e" />

### 📑 Pagination Example

<img width="1440" alt="Screenshot 2025-03-24 at 11 58 06 PM" src="https://github.com/user-attachments/assets/27069b8c-e536-4ff7-8d52-d789e564f741" />

### 👤 Profile Page

- Displays logged-in user details
- Admin badge for admin users
  
<img width="1440" alt="Screenshot 2025-03-24 at 11 52 50 PM" src="https://github.com/user-attachments/assets/36fd9d1f-a26b-4c14-9d6b-0f558d237178" />

### 🏆 Bookmarks Card Example

- Watch video solution
- Navigate to the contest platform
- Admin-only manual video upload option

<img width="1434" alt="Screenshot 2025-03-24 at 11 52 32 PM" src="https://github.com/user-attachments/assets/25c9fe56-8800-4e75-859c-85821851460c" />

### 🔄 Cron Job (Backend)

- Automatic YouTube video fetch at 8 AM daily
- Updates contest video solutions

 <img width="1440" alt="Cron Job Screenshot" src="https://github.com/user-attachments/assets/e3fd6f65-8d62-432a-a1f3-d2b01a85b9ed" />

### Tablet view 

<img width="519" alt="Screenshot 2025-03-24 at 11 56 29 PM" src="https://github.com/user-attachments/assets/4bd7e65f-4d80-4480-96d2-063c147a0cb1" />

<img width="519" alt="Screenshot 2025-03-24 at 11 56 09 PM" src="https://github.com/user-attachments/assets/b162fa6c-c3c3-4986-9ba1-cca54561a7c6" />

### Mobile view

<img width="334" alt="Screenshot 2025-03-24 at 11 54 46 PM" src="https://github.com/user-attachments/assets/961a0e9c-68d0-4c5b-bd02-b0823bacc01b" />

<img width="324" alt="Screenshot 2025-03-24 at 11 54 18 PM" src="https://github.com/user-attachments/assets/31e756b9-0c69-47ac-869b-a1157edd4dbd" />

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

# API Endpoints and System Overview

This document outlines the API endpoints and system architecture for the contest tracking and management application.

## API Endpoints

### Contest Management

* **`/contests/upcoming_contest` (GET)**
    * Fetches upcoming contests from CodeChef, LeetCode, and Codeforces.
    * Response: JSON array of contest objects.
* **`/contests/past_contest` (GET)**
    * Fetches past contests from CodeChef, LeetCode, and Codeforces.
    * Response: JSON array of contest objects.
* **`/contests/upload_solution` (POST)**
    * Allows administrators to manually upload contest solutions.
    * Request: JSON payload containing solution details.
    * Authentication: Requires administrator privileges.

### User Management

* **`/user/profile` (GET)**
    * Retrieves the current user's profile information.
    * Authentication: Requires user authentication.
    * Response: JSON object containing user profile data.
* **`/user/bookmarks` (GET)**
    * Retrieves all bookmarked contests for the logged-in user.
    * Authentication: Requires user authentication.
    * Response: JSON array of bookmarked contest objects.
* **`/user/bookmarks` (POST)**
    * Adds a selected contest to the user's bookmarks.
    * Request: JSON payload containing the contest identifier.
    * Authentication: Requires user authentication.

### Authentication

* **`/auth/google` (POST)**
    * Handles Google OAuth authentication.
    * Request: Google OAuth token.
    * Response: User authentication token.

## Background Processes

### Cron Jobs

* **Daily Contest Update (8:00 AM)**
    * Scheduled cron job that runs daily at 8:00 AM.
    * Fetches and updates contest information from CodeChef, LeetCode, and Codeforces.
    * Can be configured to run hourly.
* **Testing Cron Job (Instant)**
    * On demand execution of the contest data fetching logic, for testing purposes.

## System Architecture

* The system utilizes a backend API to manage contest data, user profiles, and authentication.
* Contest data is fetched from external platforms (CodeChef, LeetCode, Codeforces) using web scraping or official APIs (if available).
* User authentication is handled via Google OAuth.
* A database stores contest information, user profiles, and bookmarks.
* Cron jobs automate the process of updating contest data.

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
