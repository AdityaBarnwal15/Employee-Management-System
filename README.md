# Employee Management System

A simple Employee Management System built using the MERN stack. The application allows users to perform CRUD operations on employee records and upload profile images.

## Features

* Add Employee
* View Employee List
* Edit Employee Details
* Delete Employee
* Upload Employee Profile Image
* Form Validation
* MongoDB Database Integration
* REST API using Express.js and Node.js

---

## Tech Stack

### Frontend

* React (Vite)
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Multer
* CORS
* Dotenv

---

## Project Structure

```
employee-management-system/

│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── uploads/
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── src/
    ├── package.json
    └── vite.config.js
```

---

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
```

---

### 2. Navigate to the project

```bash
cd employee-management-system
```

---

## Backend Setup

Move to backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/employee_management
```

Start the backend server:

```bash
npm run dev
```

---

## Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

---

## API Endpoints

### Get All Employees

```
GET /api/employees
```

### Get Employee By ID

```
GET /api/employees/:id
```

### Add Employee

```
POST /api/employees
```

Content Type:

```
multipart/form-data
```

Fields:

* profileImage
* name
* email
* mobileNum
* department

### Update Employee

```
PUT /api/employees/:id
```

Content Type:

```
multipart/form-data
```

Fields:

* profileImage (optional)
* name
* email
* mobileNum
* department

### Delete Employee

```
DELETE /api/employees/:id
```

---

## Employee Schema

```javascript
{
  profileImage: String,
  name: String,
  email: String,
  mobileNum: String,
  department: String
}
```

---

## Validation

* Name is required
* Email is required and must be valid
* Mobile number is required
* Department is required
* Profile image accepts JPG, JPEG, and PNG formats

---

## Image Upload

Uploaded images are stored in:

```
backend/src/uploads/
```

Images are served through:

```
http://localhost:5000/uploads/<filename>
```

---

## Future Improvements

* Search Employees
* Filter by Department
* Pagination
* Authentication and Authorization
* Better UI/UX
* Toast Notifications

---

## Author

Aditya Barnwal
