# 🚀 Getting Started Guide

Welcome! This guide will help you **run the Cloud-Powered Task Manager** on your machine in under 5 minutes.

---

## ⚡ Fastest Way: Run with Docker (Recommended)

If you have **Docker installed**, this is the easiest method:

```bash
# 1. Clone the project
git clone https://github.com/premsahu-3125/cloud-powered-task-manager.git
cd cloud-powered-task-manager

# 2. Start both backend and frontend with one command
docker-compose up --build

# 3. Open your browser and go to:
#    http://localhost:5173
```

**That's it!** Both services will start automatically.

---

## 💻 Run Locally (Without Docker)

### System Requirements
- **Node.js** v18 or higher ([Download](https://nodejs.org/))
- **npm** v9 or higher (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

### Step 1: Clone the Repository
```bash
git clone https://github.com/premsahu-3125/cloud-powered-task-manager.git
cd cloud-powered-task-manager
```

### Step 2: Setup Backend (Open Terminal 1)
```bash
cd backend

# Install dependencies
npm install

# Start the server
npm run dev
```

**Expected output:**
```
Task Manager API listening on http://localhost:5000
Environment: development
```

### Step 3: Setup Frontend (Open Terminal 2)
```bash
cd frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
```

**Expected output:**
```
VITE v8.2.2 ready in 6503 ms
Local: http://localhost:5173/
```

### Step 4: Open in Browser
Go to **http://localhost:5173** in your web browser.

---

## 🎯 What to Do Next

### 1. Create an Account
- Click **"Register"** on the login page
- Enter your email and password
- Click **"Sign Up"**

### 2. Start Adding Tasks
- Click **"Add Task"** button
- Fill in task details:
  - **Title**: Task name (e.g., "Study for exam")
  - **Description**: Details about the task
  - **Priority**: High, Medium, or Low
  - **Category**: College, Project, Assignment, Exam, Personal, or Other
  - **Due Date**: When the task is due (optional)
- Click **"Create Task"**

### 3. Manage Your Tasks
- **View**: See all your tasks on the Tasks page
- **Search**: Use the search bar to find tasks
- **Filter**: Filter by status, priority, or category
- **Edit**: Click on a task to edit it
- **Delete**: Remove tasks you no longer need
- **Complete**: Check the box to mark as done

### 4. Check Dashboard
- Go to **Dashboard** to see:
  - 📊 Task statistics
  - 📈 Completion percentage
  - 📋 Breakdown by category and priority
  - 📌 Upcoming and overdue tasks

---

## 🔧 Environment Configuration

### Backend (.env file)

If running locally (without Docker), create a `.env` file in the `backend/` folder:

```env
# Server Configuration
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173

# Database (leave blank to use in-memory storage)
CLOUDANT_URL=
CLOUDANT_API_KEY=
CLOUDANT_DATABASE=taskmanager

# Authentication (required!)
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d
```

**To generate a JWT_SECRET:**
```bash
# On Mac/Linux:
openssl rand -base64 32

# On Windows (if openssl not available), use any random string:
R9kL3pQvM2xN5jW8yF1tH7sG4aB6cD9eE2rT5uI8oP0lK
```

### Frontend (.env file - optional)

Create `.env` file in the `frontend/` folder if you want to change the API URL:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🐛 Troubleshooting

### "Port 5000 already in use"
```bash
# Change the PORT in backend/.env
PORT=5001

# Or kill the process using port 5000
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:5000 | xargs kill -9
```

### "Cannot find module 'dotenv'"
```bash
cd backend
npm install
```

### "JWT_SECRET is not set"
Make sure you created the `.env` file in the `backend/` folder with a JWT_SECRET value.

### Frontend shows blank page
- Check browser console (F12 → Console tab) for errors
- Make sure backend is running on http://localhost:5000
- Try `npm install` and `npm run dev` again

### Tasks not saving (data lost on restart)
This is normal! By default, the app uses in-memory storage (data is temporary). To persist data, set up **IBM Cloudant** (see README.md).

---

## 📱 Tech Stack Overview

### Frontend (What You See)
- **React 19** - UI framework
- **Vite** - Fast build tool
- **Axios** - API communication
- **React Router** - Navigation
- **CSS Modules** - Styling

### Backend (What Powers It)
- **Node.js** - JavaScript runtime
- **Express** - Web server framework
- **JWT** - Secure authentication
- **Bcryptjs** - Password encryption

### Database (Where Data Lives)
- **In-Memory** (Default) - Data lost on restart
- **IBM Cloudant** (Optional) - Permanent cloud storage

---

## 📖 Next Steps

1. **Read the main [README.md](README.md)** - Full project documentation
2. **Explore the code** - Check `frontend/src` and `backend` folders
3. **Read API docs** - See API examples in README.md
4. **Try Docker** - Run `docker-compose up --build`
5. **Deploy** - Use Heroku, Vercel, or other platforms

---

## ✅ Checklist

Make sure you have:
- [ ] Node.js v18+ installed
- [ ] Git installed
- [ ] Repository cloned
- [ ] Backend running on http://localhost:5000
- [ ] Frontend running on http://localhost:5173
- [ ] Browser showing the login page
- [ ] Able to register and create tasks

If all checkboxes are checked, **you're good to go!** 🎉

---

## 🆘 Need Help?

- 📖 [Read the full README](README.md)
- 🐛 [Report bugs on GitHub Issues](https://github.com/premsahu-3125/cloud-powered-task-manager/issues)
- 💬 [Start a discussion](https://github.com/premsahu-3125/cloud-powered-task-manager/discussions)
- 📧 Email: premsahu.3125@gmail.com

---

**Happy task managing! 🎯**
