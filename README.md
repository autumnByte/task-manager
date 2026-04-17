# Task Manager App

## Overview
This is a simple full-stack Task Manager application that allows users to create, view, update, and delete tasks. The project demonstrates core frontend-backend integration using a REST API.

## Features
- Add new tasks
- Mark tasks as completed
- Delete tasks
- Filter tasks (All / Completed / Pending)
- Priority levels (High / Medium / Low)
- Progress tracking with visual indicators
- Graceful fallback to local mode if backend is unavailable

## Tech Stack
- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Node.js, Express  

## API Endpoints
- `GET /tasks` → Fetch all tasks  
- `POST /tasks` → Create a new task  
- `PATCH /tasks/:id` → Update task (toggle / edit)  
- `DELETE /tasks/:id` → Delete task  

## Setup Instructions
```
1. Clone the repository
git clone https://github.com/autumnByte/task-manager.git
cd task-manager
2. Start Backend
cd server
npm install
node index.js
3. Run Frontend
Open `client/index.html` in your browser.
```
## Notes
- Data is stored in-memory (resets when server restarts)
- Focus was on functionality, API design, and clean UI
