# 📋 Cloud-Powered Task Manager

[![GitHub](https://img.shields.io/badge/GitHub-cloud--powered--task--manager-blue?style=for-the-badge&logo=github)](https://github.com/premsahu-3125/cloud-powered-task-manager)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-4.19.2-black?style=for-the-badge&logo=express)](https://expressjs.com/)
[![Docker](https://img.shields.io/badge/Docker-Compose-blue?style=for-the-badge&logo=docker)](https://www.docker.com/)

> A **full-stack task management application** built for students and professionals to manage coursework, projects, and personal tasks with **real cloud database integration**, not just browser storage.

---

## 🎯 Try It Now

### ⚡ Quickest Way - Start in 30 Seconds

```bash
git clone https://github.com/premsahu-3125/cloud-powered-task-manager.git
cd cloud-powered-task-manager
docker-compose up --build
```

**Then open**: 👉 **http://localhost:5173**

**Test Account:**
- Email: `demo@example.com`
- Password: `demo123`

---

## 🚀 Quick Start (3 Steps)

### Option 1: Run Locally (Fastest Way)

```bash
# 1. Clone the repository
git clone https://github.com/premsahu-3125/cloud-powered-task-manager.git
cd cloud-powered-task-manager

# 2. Setup backend (in terminal 1)
cd backend && npm install && npm run dev
# Backend runs on http://localhost:5000

# 3. Setup frontend (in terminal 2)
cd frontend && npm install && npm run dev
# Frontend runs on http://localhost:5173 ← Open this in your browser!
```

### Option 2: Run with Docker (One Command)

```bash
docker-compose up --build
# Automatically starts both backend and frontend
# Frontend: http://localhost:5173
# Backend: http://localhost:5000
```

---

## 📊 Project Demo

| Feature | Details |
|---------|---------|
| 🔑 **Authentication** | Register/Login with secure JWT tokens |
| ✅ **Task Management** | Create, edit, delete, and complete tasks |
| 🎯 **Prioritization** | Set priority levels (High/Medium/Low) |
| 📂 **Categories** | Organize by College, Projects, Exams, etc. |
| 📈 **Analytics** | Dashboard with statistics and charts |
| 🔍 **Search & Filter** | Find tasks by title, status, priority, category |
| ☁️ **Cloud Ready** | Optional IBM Cloudant database integration |
| 🐳 **Docker Ready** | One-command deployment with docker-compose |

---

## 🎨 Visual Preview

### Authentication Flow
```
User → Registration/Login → JWT Token → Protected Routes → Dashboard
```

### Task Workflow
```
Add Task → Set Priority/Category → View Dashboard → Filter/Search → Mark Complete
```

### System Overview
```
React Frontend (Vite)
        ↓ (API Calls)
Express Backend (Node.js)
        ↓ (Database Queries)
IBM Cloudant / In-Memory DB
```

---

## 📚 Table of Contents

- [🚀 Quick Start](#-quick-start-3-steps)
- [✨ Features](#-features)
- [🏗️ System Architecture](#-system-architecture)
- [📁 Project Structure](#-project-structure)
- [🛠️ Tech Stack](#-tech-stack)
- [📡 API Documentation](#-api-documentation)
- [🐳 Docker Deployment](#-docker-deployment)
- [🔒 Security Features](#-security-features)
- [📖 Documentation](#-documentation)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 📖 Documentation

| Document | Purpose |
|----------|---------|
| [**GETTING_STARTED.md**](GETTING_STARTED.md) | 👈 **Start here!** Step-by-step guide to run the project locally or with Docker |
| [**CONTRIBUTING.md**](CONTRIBUTING.md) | Want to help? Learn how to contribute code, report bugs, or suggest features |
| [**README.md**](README.md) | Full technical documentation, API docs, and architecture details |

## ✨ Features

### 🔐 Authentication & Security
- User registration with email validation
- Secure login with JWT (JSON Web Tokens)
- Password hashing with bcrypt
- Protected routes (task routes require authentication)
- Session persistence across page refreshes

### 📝 Task Management
- ✅ Create, read, update, delete (CRUD) tasks
- 🏷️ Task prioritization (High, Medium, Low)
- 📂 Task categorization (College, Assignment, Project, Exam, Personal, Other)
- 📅 Due date assignment
- ✔️ Mark tasks as complete/pending
- 🔍 Search tasks by title
- 🎯 Filter by status, priority, and category

### 📊 Dashboard Analytics
- 📈 Task statistics (total, completed, pending, overdue)
- 📉 Completion percentage
- 📋 Category breakdown
- 🎯 Priority distribution
- 📌 Quick access to upcoming and overdue tasks

### 🗄️ Data Persistence
- IBM Cloudant cloud database (optional)
- In-memory fallback for development
- Data isolation per user
- No cross-user data access

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT LAYER                             │
│  React 19 + Vite (Frontend running on localhost:5173)       │
│  ├─ Components: TaskCard, TaskForm, Dashboard, Auth         │
│  ├─ Context API: AuthContext for state management           │
│  ├─ Services: API client, auth service, task service        │
│  └─ Styling: CSS modules, global tokens                     │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ HTTP/HTTPS
                       │ (CORS enabled)
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    API LAYER                                 │
│  Node.js/Express (Backend running on localhost:5000)        │
│  ├─ Authentication Routes: /api/auth/register, /login, /me  │
│  ├─ Task Routes: /api/tasks (CRUD operations)              │
│  ├─ Middleware: JWT auth, input validation, error handling  │
│  ├─ Controllers: Handle business logic                      │
│  └─ Services: Database abstraction layer                    │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ Database Queries
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│                 DATA STORAGE LAYER                           │
│  ├─ IBM Cloudant (Production - Optional)                    │
│  │   └─ Managed NoSQL database, replication, backups        │
│  └─ In-Memory Store (Development)                           │
│      └─ Temporary data storage, lost on restart             │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
cloud-powered-task-manager/
├── backend/                          # Node.js/Express REST API
│   ├── config/
│   │   ├── env.js                   # Environment configuration
│   │   └── cloudant.js              # IBM Cloudant setup
│   ├── controllers/
│   │   ├── authController.js        # Auth logic (register, login)
│   │   └── taskController.js        # Task CRUD operations
│   ├── middleware/
│   │   ├── auth.js                  # JWT verification
│   │   ├── errorHandler.js          # Global error handling
│   │   ├── validateAuth.js          # Auth input validation
│   │   └── validateTask.js          # Task input validation
│   ├── models/
│   │   ├── taskModel.js             # Task data structure
│   │   └── userModel.js             # User data structure
│   ├── routes/
│   │   ├── authRoutes.js            # Auth endpoints
│   │   └── taskRoutes.js            # Task endpoints
│   ├── services/
│   │   ├── taskService.js           # Task business logic
│   │   ├── userService.js           # User business logic
│   │   ├── cloudantTaskService.js   # Cloudant task adapter
│   │   ├── cloudantUserService.js   # Cloudant user adapter
│   │   ├── inMemoryTaskService.js   # In-memory task adapter
│   │   └── inMemoryUserService.js   # In-memory user adapter
│   ├── utils/
│   │   ├── AppError.js              # Custom error class
│   │   ├── asyncHandler.js          # Async error wrapper
│   │   └── jwt.js                   # JWT utilities
│   ├── .env                         # Environment variables (create this)
│   ├── .env.example                 # Example environment file
│   ├── server.js                    # Express app entry point
│   ├── package.json                 # Node.js dependencies
│   └── Dockerfile                   # Docker configuration
│
├── frontend/                        # React/Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── AppLayout.jsx       # Main app container
│   │   │   ├── Sidebar.jsx         # Navigation sidebar
│   │   │   ├── TaskCard.jsx        # Task display component
│   │   │   ├── TaskForm.jsx        # Task create/edit form
│   │   │   ├── PriorityBadge.jsx   # Priority display
│   │   │   └── ProtectedRoute.jsx  # Auth-protected routes
│   │   ├── pages/
│   │   │   ├── Login.jsx           # Login page
│   │   │   ├── Register.jsx        # Registration page
│   │   │   ├── Dashboard.jsx       # Main dashboard
│   │   │   ├── Tasks.jsx           # Tasks list page
│   │   │   ├── CreateTask.jsx      # Create task page
│   │   │   ├── EditTask.jsx        # Edit task page
│   │   │   └── Profile.jsx         # User profile page
│   │   ├── context/
│   │   │   └── AuthContext.jsx     # Auth state management
│   │   ├── services/
│   │   │   ├── api.js              # Axios API client
│   │   │   ├── authService.js      # Auth API calls
│   │   │   └── taskService.js      # Task API calls
│   │   ├── styles/
│   │   │   ├── global.css          # Global styles
│   │   │   └── tokens.css          # Design tokens
│   │   ├── App.jsx                 # Root component
│   │   └── main.jsx                # React entry point
│   ├── .env.example                # Example environment file
│   ├── package.json                # Node.js dependencies
│   ├── vite.config.js              # Vite configuration
│   ├── index.html                  # HTML entry point
│   ├── Dockerfile                  # Docker configuration
│   └── nginx.conf                  # Nginx web server config
│
├── docs/
│   └── screenshots/                # Project documentation
│
├── docker-compose.yml              # Multi-container orchestration
├── .gitignore                       # Git ignore rules
├── LICENSE                         # MIT License
└── README.md                       # This file
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** v18+ and npm v9+
- **Git** for version control
- Optional: **Docker** and **Docker Compose** for containerized deployment
- Optional: **IBM Cloud account** for Cloudant database

### Local Development Setup

#### 1. Clone the Repository
```bash
git clone https://github.com/premsahu-3125/cloud-powered-task-manager.git
cd cloud-powered-task-manager
```

#### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create .env file (copy from .env.example and add your values)
cp .env.example .env

# Start development server (requires .env with JWT_SECRET)
npm run dev
# or for production
npm start
```

**Backend will run on**: `http://localhost:5000`

#### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

**Frontend will run on**: `http://localhost:5173`

#### 4. Access the Application
Open your browser and navigate to: **http://localhost:5173**

---

## 🔧 Environment Configuration

### Backend (.env)
```env
# Server
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173

# Database (optional - uses in-memory by default)
CLOUDANT_URL=https://your-cloudant-instance.cloudantnosqldb.appdomain.cloud
CLOUDANT_API_KEY=your-api-key
CLOUDANT_DATABASE=taskmanager

# Authentication
JWT_SECRET=your-secret-key-here (generate with: openssl rand -base64 32)
JWT_EXPIRES_IN=7d
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 📡 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}

Response: 201 Created
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}

Response: 200 OK
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer {token}

Response: 200 OK
{
  "id": "user-id",
  "email": "user@example.com"
}
```

### Task Endpoints

#### Get All Tasks
```http
GET /api/tasks
Authorization: Bearer {token}

Response: 200 OK
[
  {
    "id": "task-1",
    "title": "Study for exam",
    "description": "Chapter 1-5",
    "priority": "high",
    "category": "college",
    "dueDate": "2024-09-15",
    "completed": false,
    "createdAt": "2024-09-01T10:00:00Z"
  },
  ...
]
```

#### Create Task
```http
POST /api/tasks
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish backend implementation",
  "priority": "high",
  "category": "project",
  "dueDate": "2024-09-20"
}

Response: 201 Created
{
  "id": "task-2",
  "title": "Complete project",
  ...
}
```

#### Update Task
```http
PUT /api/tasks/{taskId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Updated title",
  "completed": true,
  ...
}

Response: 200 OK
```

#### Delete Task
```http
DELETE /api/tasks/{taskId}
Authorization: Bearer {token}

Response: 204 No Content
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI framework | 19.2.8 |
| **Vite** | Build tool & dev server | 8.2.2 |
| **React Router** | Client-side routing | 7.18.2 |
| **Axios** | HTTP client | 1.20.0 |
| **CSS Modules** | Component styling | - |

### Backend
| Technology | Purpose | Version |
|------------|---------|---------|
| **Node.js** | Runtime | 18+ |
| **Express** | Web framework | 4.19.2 |
| **JWT** | Authentication | 9.0.3 |
| **Bcryptjs** | Password hashing | 3.0.3 |
| **CORS** | Cross-origin requests | 2.8.5 |
| **Dotenv** | Environment variables | 16.4.5 |

### Database
| Technology | Purpose | Optional |
|------------|---------|----------|
| **IBM Cloudant** | Managed NoSQL database | ✅ |
| **In-Memory Store** | Development fallback | Default |

### DevOps
- **Docker** & **Docker Compose** for containerization
- **GitHub Actions** for CI/CD

---

## 🐳 Docker Deployment

### Run with Docker Compose
```bash
docker-compose up --build
```

This will:
- Build and start the backend service on port 5000
- Build and start the frontend service on port 5173
- Apply environment variables from `.env` file

**Note**: IBM Cloudant is NOT containerized (it's a managed service). Configure `CLOUDANT_URL` and `CLOUDANT_API_KEY` in the `.env` file to connect to your cloud database.

---

## 📊 Data Model

### User Schema
```javascript
{
  _id: "user-unique-id",
  email: "user@example.com",
  password: "hashed-bcrypt-password",
  createdAt: "2024-09-01T10:00:00Z"
}
```

### Task Schema
```javascript
{
  _id: "task-unique-id",
  userId: "user-unique-id",      // Data isolation
  title: "Task title",
  description: "Task description",
  priority: "high|medium|low",
  category: "college|assignment|project|exam|personal|other",
  dueDate: "2024-09-20",
  completed: false,
  createdAt: "2024-09-01T10:00:00Z",
  updatedAt: "2024-09-01T10:00:00Z"
}
```

---

## 🔒 Security Features

✅ **Password Security**
- Passwords hashed with bcrypt (never stored in plaintext)

✅ **JWT Authentication**
- Stateless token-based authentication
- Tokens expire after configurable time (default: 7 days)
- Protected routes require valid JWT

✅ **Data Isolation**
- Tasks scoped to authenticated user
- Impossible to access another user's tasks (even with guessing IDs)

✅ **Input Validation**
- All user inputs validated before processing
- Email format validation
- Task field validation

✅ **CORS Protection**
- Configured to only accept requests from frontend origin

✅ **Error Handling**
- Detailed error messages in development
- Generic messages in production
- No sensitive data leaked in responses

---

## 📝 Development Workflow

### Code Style
```bash
# Frontend linting
cd frontend && npm run lint

# Backend linting
cd backend && npm run lint
```

### Testing
```bash
# Run tests (currently a placeholder)
npm test
```

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/add-notifications

# Make changes and commit
git add .
git commit -m "Add notification system"

# Push to GitHub
git push origin feature/add-notifications

# Create pull request on GitHub
```

---

## 🚧 Future Enhancements

- [ ] Email notifications for due tasks
- [ ] Task collaboration (share with team members)
- [ ] Recurring tasks
- [ ] Task attachments and file uploads
- [ ] Mobile app (React Native)
- [ ] Advanced analytics and reporting
- [ ] Dark mode theme
- [ ] Multi-language support
- [ ] Task templates
- [ ] Integration with calendar services

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

**You are free to:**
- ✅ Use this code for personal and commercial projects
- ✅ Modify and distribute the code
- ✅ Use it as a learning resource

**You must:**
- 📋 Include the original license and copyright notice

---

## 🤝 Contributing

Contributions are welcome! Here's how to contribute:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

For major changes, please open an issue first to discuss what you would like to change.

---

## 📞 Support & Contact

- **Issues**: [GitHub Issues](https://github.com/premsahu-3125/cloud-powered-task-manager/issues)
- **Discussions**: [GitHub Discussions](https://github.com/premsahu-3125/cloud-powered-task-manager/discussions)
- **Email**: premsahu.3125@gmail.com

---

## 🎓 Learning Resources

This project demonstrates:
- ✅ Full-stack web development
- ✅ REST API design principles
- ✅ JWT authentication and authorization
- ✅ React hooks and context API
- ✅ Responsive UI design
- ✅ Cloud database integration
- ✅ Docker containerization
- ✅ CI/CD pipelines (GitHub Actions)
- ✅ Error handling and validation
- ✅ Security best practices

---

## 📈 Project Statistics

- **Backend**: ~1000 lines of Node.js/Express code
- **Frontend**: ~800 lines of React code
- **Components**: 8 React components
- **API Endpoints**: 8 RESTful endpoints
- **Database Models**: 2 (User, Task)
- **Middleware**: 4 (Auth, Error Handler, Validators)

---

**Built with ❤️ by Prem Kumar Sahu**

⭐ If you found this project helpful, please consider giving it a star on GitHub!