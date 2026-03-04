# 🚀 Task Manager – Full Stack MERN Application

A production-ready **Task Management Web Application** built with the **MERN stack** that allows users to securely manage their daily tasks with authentication and real-time updates.

The project demonstrates **full-stack development, API design, authentication, database integration, and cloud deployment.**

---

# 🌐 Live Application

Frontend (Vercel)
https://task-manager-three-blue.vercel.app

Backend API (Railway)
https://task-manager-production-8c34.up.railway.app

GitHub Repository
https://github.com/Divyawalke/task-manager

---

# ✨ Features

### Authentication

• Secure user registration and login
• JWT-based authentication
• Protected API routes
• Token-based authorization for task operations

### Task Management

• Create new tasks
• Edit existing tasks
• Mark tasks as **Completed / Pending**
• Delete tasks
• Real-time UI updates

### User Experience

• Clean responsive UI
• Error handling for API requests
• Loading states for better UX
• Persistent login using localStorage

---

# 🧠 System Architecture

Frontend (React)
⬇
REST API (Node.js + Express)
⬇
Database (MongoDB Atlas)

Frontend communicates with the backend using **RESTful API endpoints secured with JWT tokens.**

---

# 🛠 Tech Stack

Frontend
• React.js
• Axios
• React Router

Backend
• Node.js
• Express.js
• JWT Authentication

Database
• MongoDB Atlas
• Mongoose ODM

Deployment
• Vercel (Frontend)
• Railway (Backend)

---

# 🔐 Authentication Flow

1. User registers or logs in
2. Server generates JWT token
3. Token stored in localStorage
4. Token attached to API requests
5. Backend middleware verifies token
6. Authorized user accesses task endpoints

---

# 📡 API Endpoints

Auth Routes

POST /api/auth/register
POST /api/auth/login

Task Routes (Protected)

GET /api/tasks
POST /api/tasks
PUT /api/tasks/:id
DELETE /api/tasks/:id

---

# ⚙️ Local Setup Instructions

Clone repository

git clone https://github.com/Divyawalke/task-manager

Move into project

cd task-manager

---

## Backend Setup

cd backend
npm install

Create .env file

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Run server

npm start

---

## Frontend Setup

cd frontend
npm install

Run application

npm start

---

# 📦 Environment Variables

Backend requires:

MONGO_URI – MongoDB Atlas connection string
JWT_SECRET – Secret key for authentication
PORT – Server port

---

# 📸 Demo

A short demo video (3–5 minutes) demonstrates:

• User registration
• Login authentication
• Task creation
• Task editing
• Task completion
• Task deletion

Demo Link:
ADD_VIDEO_LINK_HERE

---

# 📈 Future Improvements

• Task priority levels
• Due dates & reminders
• Search & filtering
• Drag-and-drop task ordering
• Mobile UI improvements

---

# 👨‍💻 Author

Divya Walke

---

# 📄 License

This project was developed as part of a **full-stack internship assignment** to demonstrate proficiency in modern web development using the MERN stack.
