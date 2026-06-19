# 💰 Expense Tracker API

A RESTful API built using Node.js, Express.js, MongoDB Atlas, and JWT Authentication that allows users to manage and track their expenses securely.

---


# 🚀 Features

- 👤 User Registration
- 🔐 User Login
- 🛡 JWT Authentication
- ➕ Add Expense
- 📋 List Expenses
- ✏️ Update Expense
- ❌ Delete Expense
- 📂 Filter Expenses By Category
- 📅 Filter Expenses By Time
- 📊 Expense Summary
- 📈 Category Summary
- 📄 Pagination
- ↕️ Dynamic Sorting
- 🔗 MongoDB Populate

---

# 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcrypt
- dotenv

---

# 📁 Project Structure

```text
expense_tracker_api/

├── config/             # Database connection
├── controllers/        # Business logic
├── middleware/         # JWT authentication
├── models/             # Mongoose schemas
├── routes/             # API routes
├── app.js              # Entry point
├── .env                # Environment variables (ignored)
├── .gitignore
└── README.md
```

---

# ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/expense-tracker-api.git
```

### 2. Navigate into project

```bash
cd expense-tracker-api
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create a .env file

```env
PORT=3000

JWT_SECRET=your_jwt_secret

MONGODB_URI=your_mongodb_connection_string
```

### 5. Start the server

```bash
npm run dev
```

Server runs on:

```text
http://localhost:3000
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint | Description |
|----------|----------|----------|
| POST | /api/auth/register | Register User |
| POST | /api/auth/login | Login User |
| GET | /api/auth/dashboard | Protected Route |

---

## Expense Management

| Method | Endpoint |
|----------|----------|
| POST | /api/expense/add |
| GET | /api/expense/list |
| PUT | /api/expense/update/:id |
| DELETE | /api/expense/delete/:id |

---

## Filtering

| Method | Endpoint |
|----------|----------|
| GET | /api/expense/category/:category |
| GET | /api/expense/filter |

### Example

```http
GET /api/expense/filter?period=days&days=7
```

```http
GET /api/expense/filter?period=months&months=3
```

```http
GET /api/expense/filter?period=custom&from=2026-01-01&to=2026-06-01
```

---

## Pagination, Sorting & Search

### Pagination

```http
GET /api/expense/list?page=1&limit=5
```

### Dynamic Sorting

```http
GET /api/expense/list?sort=amount
```

```http
GET /api/expense/list?sort=-amount
```

```http
GET /api/expense/list?sort=-createdAt
```

### Combined Example

```http
GET /api/expense/list?page=1&limit=5&sort=-amount

```
---

## Summary

| Method | Endpoint |
|----------|----------|
| GET | /api/expense/summary |
| GET | /api/expense/summary/category/:category |

---

# 🔒 Authentication

Protected routes require:

```http
Authorization: Bearer <JWT_TOKEN>
```

---

# 🧠 Future Improvements

- PDF Expense Reports
- Budget Tracking
- Monthly Analytics
- Frontend Integration (React)
- Docker Deployment
- Refresh Tokens
- Email Verification
- Password Reset

---

# 👨‍💻 Author

**Vijay**
Built as a backend-focused project to practice:

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- REST API Design
- Pagination
- Dynamic Sorting
- Search using Regex
- MongoDB Populate
