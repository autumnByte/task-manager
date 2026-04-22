# 🌸 Darling Do — Task Manager

A simple full-stack task manager app with authentication, task tracking, and productivity insights.

## 🚀 Live Links

- Frontend: https://your-vercel-url.vercel.app
- Backend: https://task-manager-ozpn.onrender.com

## ✨ Features

- User signup & login (JWT auth)
- Add / delete / update tasks
- Mark tasks as completed
- Priority levels (high / medium / low)
- Weekly productivity chart
- Streak tracking
- Notes and due dates

## 🛠 Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Database: MySQL (Railway)
- Deployment:
  - Frontend → Vercel
  - Backend → Render

## ⚙️ Setup (Local)

### 1. Clone repo

git clone https://github.com/your-username/task-manager.git

cd task-manager


### 2. Backend setup

cd server
npm install


Create `.env`:

JWT_SECRET=your_secret_key
MYSQL_URL=your_mysql_connection_string


Run server:

node index.js


### 3. Frontend
Open `client/index.html` with Live Server

## 📌 API Endpoints

- POST `/auth/signup`
- POST `/auth/login`
- GET `/tasks`
- POST `/tasks`
- PATCH `/tasks/:id`
- DELETE `/tasks/:id`

## 🧠 Notes

- Make sure backend URL is updated in frontend before deployment
- CORS must be enabled on backend

---

Made with ❤️