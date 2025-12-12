# **📘 CRM MERN Application**

## **👉**

This is a simple Customer Relationship Management (CRM) application built using the **MERN Stack (MongoDB, Express, React, Node.js)**.  
 The project allows users to register, log in, and manage customer information through a clean and secure backend API.

---

## **📁 Project Structure**

crm-project/  
│  
├── backend/   	→ Express API \+ MongoDB \+ Authentication   
└── frontend/  	→ React UI for CRM interface

### **Backend Folder Structure**

| Folder/File | Purpose |
| ----- | ----- |
| config/ | MongoDB connection file |
| controllers/ | Contains API logic (Auth \+ Customer CRUD) |
| middleware/ | JWT authentication check |
| models/ | MongoDB schemas (User, Customer) |
| routes/ | API endpoints (/auth, /customers) |
| server.js | Backend entry point |

 

## **⚙️ Technologies Used**

### Frontend: **React, Axios, Vite**

### Backend: **Node.js, Express.js, bcrypt, JWT**

### Database: **MongoDB / MongoDB Atlas**

---

## **🔐 Authentication**

·   	Passwords are hashed using **bcrypt**  
·   	Users receive a **JWT token** on login  
·   	Protected routes require valid tokens  
·   	Middleware verifies tokens before accessing customer endpoints

---

## **📡 API Endpoints**

##  

### Auth APIs

 

| Method | Endpoint | Description |
| ----- | ----- | ----- |
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Login and get token |

###  

### Customer APIs (Protected)

 

| Method | Endpoint | Description |
| ----- | ----- | ----- |
| GET | /api/customers | Get all customers |
| POST | /api/customers | Add new customer |
| GET | /api/customers/:id | Get single customer |
| PUT | /api/customers/:id | Update customer |
| DELETE | /api/customers/:id | Delete customer |

---

## **🧪 Testing (Postman)**

You can test backend APIs using **Postman**:

| Feature | Test URL | Description |
| ----- | ----- | ----- |
| Register | POST /api/auth/register | Create new user |
| Login | POST /api/auth/login | Authenticate user |
| Add Customer | POST /api/customers | Add customer (Requires Token) |
| View Customers | GET /api/customers | Get all customers |
| Update Customer | PUT /api/customers/:id | Modify details |
| Delete Customer | DELETE /api/customers/:id | Remove customer |

Use the token from **Login API** in Authorization → Bearer Token.

---

## **🚀 How to Run the Project**

### **🟦 Backend Setup**

cd backend  
npm install  
npm start

Create .env inside backend:

PORT\=5000  
MONGO\_URI\=mongodb+srv://ambilymariya9_db_user:oJYje9YLpZjDrvrJ@cluster0.ts8e1dz.mongodb.net/  
JWT\_SECRET\=your\_secret\_key

### **🟩 Frontend Setup**

cd frontend  
npm install  
npm run dev

---

## **🔒 Security Features**

·   	JWT-based authentication  
·   	Hashed passwords  
·   	Protected routes for Customer APIs  
·   	Environment variables stored securely in .env

 

