**CRM Application – MERN Stack Project Documentation**

**📌 1\. Objective**                                                     	

The backend development of the Customer Relationship Management (CRM) system is responsible for handling data storage, user authentication, API creation, and business logic, providing a secure and efficient interface for managing customer information and interactions.

 

**📁 2\. Project Structure**

**2.1 Folder Structure for CRM MERN Application**

crm-project/

│

├── backend/

│   ├── config/

│   │   └── db.js

│   ├── controllers/

│   ├── middleware/

│   ├── models/

│   ├── routes/

│   ├── server.js

│   ├── package.json

│   └── .env

│

└── frontend/

    ├── src/

    │   ├── components/

    │   ├── pages/

    │   ├── context/

    │   ├── api/

    │   └── App.jsx

    ├── vite.config.js

    ├── package.json

    └── .env

 

## **2.2  BACKEND FOLDER STRUCTURE**

| Folder/File | Type | Purpose | What It Contains |
| ----- | ----- | ----- | ----- |
| **backend/** | Main Folder | Contains all server-side code | API, DB, Authentication |
| **config/** | Folder | Stores configuration files | db.js for MongoDB connection |
| **config/db.js** | File | Connects backend to MongoDB | Mongoose connection code |
| **controllers/** | Folder | Contains business logic for APIs | Login, register, CRUD functions |
| **controllers/authController.js** | File | Logic for register & login | Token creation, validation |
| **controllers/customerController.js** | File | Logic for CRUD operations | Add, update, delete customers |
| **middleware/** | Folder | Functions that run before API calls | Authentication check |
| **middleware/authMiddleware.js** | File | Verifies JWT token | Protects customer routes |
| **models/** | Folder | Database schemas | User model, customer model |
| **models/User.js** | File | User schema | Name, email, password |
| **models/Customer.js** | File | Customer schema | Name, email, phone, status |
| **routes/** | Folder | API endpoints | /auth, /customers |
| **routes/authRoutes.js** | File | Auth API routes | /register, /login |
| **routes/customerRoutes.js** | File | Customer API routes | CRUD endpoints |
| **server.js** | File | Main backend entry point | Starts server, loads routes |
| **package.json** | File | Backend dependencies | express, mongoose, jwt, bcrypt |
| **.env** | File | Secret values | Mongo URI, JWT secret |

 

 

 

 

### **3\.** **Environment Setup Documentation**

# **📄 .env File Documentation**

The .env file is used to securely store **environment variables** for the CRM MERN project.  
 These values are required for the backend server to run correctly.

## **📌 Environment Variables Used**

| Variable Name | Description | Example Value |
| ----- | ----- | ----- |
| **PORT** | The port number where your Express server will run. | 5000 |
| **MONGO\_URI** | Connection string for MongoDB Atlas or local MongoDB instance. | mongodb+srv://ambilymariya9\_db\_user:oJYje9YLpZjDrvrJ@cluster0.ts8e1dz.mongodb.net/   |
| **JWT\_SECRET** | Secret key for signing and verifying JSON Web Tokens (JWT). Must be long and secure. | A long random string |

### **4\.**    **Database Design (Mongoose Models)**         	

The backend uses **Mongoose** to define schemas and models that store users and customers.

#### **User Collection Design**

(Defined in backend/models/User.js)

| Field Name | Type | Required | Unique | Description |
| ----- | ----- | ----- | ----- | ----- |
| **name** | String | Yes | No | User’s full name. |
| **email** | String | Yes | Yes | User’s login email. Used for authentication. |
| **password** | String | Yes | No | Hashed password stored securely. |
| **createdAt** | Date | Auto | — | Auto-generated timestamp. |
| **updatedAt** | Date | Auto | — | Auto-updated when document changes |

 

 

#### **Customer Collection Design**

(Defined in backend/models/Customer.js)

| Field Name | Type | Required | Unique | Description |
| ----- | ----- | ----- | ----- | ----- |
| **name** | String | Yes | No | Customer’s name. |
| **email** | String | No | No | Customer’s email ID. |
| **phone** | String | No | No | Customer phone number. |
| **address** | String | No | No | Customer address. |
| **createdBy** | ObjectId (ref: User) | No | No | Links the customer to the user who created it. |
| **createdAt** | Date | Auto | — | Auto-generated timestamp. |
| **updatedAt** | Date | Auto | — | Auto-updated timestamp. |

 

#### **Case Collection (Not required for basic CRM)**

This design currently focuses on core CRM functions (customers). For a more advanced system, a Case (or Interaction) collection would be useful:

| Field | Type | Required | Description |
| :---- | :---- | :---- | :---- |
| customer | ObjectId | Yes | The Customer the case is related to. |
| subject | String | Yes | Short summary of the case/interaction. |
| details | String | Yes | Detailed description of the issue or interaction. |
| type | String | No | Type of interaction (e.g., 'Support', 'Sales', 'Complaint'). |
| status | String | No | Status of the case (e.g., 'Open', 'Pending', 'Resolved'). |
| createdBy | ObjectId | Yes | The ID of the User who logged the case. |

 

 

### **5.API Documentation**

**5.1. User API Documentation**

#  A. POST /api/auth/register**

### Description

Creates a new user account, hashes the password, stores data in MongoDB, and returns a JWT token.

---

### **Request**

 

| Field | Type | Required | Description |
| ----- | ----- | ----- | ----- |
| **name** | String | Yes | User’s full name |
| **email** | String | Yes | Must be unique |
| **password** | String | Yes | Plain text password (will be hashed) |

---

### Sample Request (JSON)

{  
  "name": "Ambily",  
  "email": "ambily@example.com",  
  "password": "mypassword123"  
}  
---

### **Success Response**

 

| Field | Type | Description |
| ----- | ----- | ----- |
| **success** | Boolean | True indicates successful registration |
| **message** | String | Message confirming registration |
| **token** | String | JWT token for authentication |
| **user** | Object | Registered user data except password |

---

### Sample Success Response

{  
  "success": true,  
  "message": "User registered successfully",  
  "token": "JWT\_TOKEN\_HERE",  
  "user": {  
	"id": "65c89ab9d73b12aa8a923456",  
	"name": "Ambily",  
	"email": "ambily@example.com"  
  }  
}  
---

#  B. POST /api/auth/login**

### Description

Authenticates a user with email/password and returns a JWT token.

---

### **Request**

| Field | Type | Required | Description |
| ----- | ----- | ----- | ----- |
| **email** | String | Yes | Registered email |
| **password** | String | Yes | Password used during registration |

---

### Sample Request

{  
  "email": "ambily@example.com",  
  "password": "mypassword123"  
}

 

### **Success Response**

 

| Field | Type | Description |
| ----- | ----- | ----- |
| **success** | Boolean | True when login succeeds |
| **message** | String | Login confirmation message |
| **token** | String | JWT token used for authenticated requests |
| **user** | Object | User profile without password |

---

### Sample Success Response

{  
  "success": true,  
  "message": "Login successful",  
  "token": "JWT\_TOKEN\_HERE",  
  "user": {  
	"id": "65c89ab9d73b12aa8a923456",  
	"name": "Ambily",  
	"email": "ambily@example.com"  
  }  
}

 

# **❗ Common Error Responses**

| Status | Message | Description |
| ----- | ----- | ----- |
| **400** | Email already exists | During registration |
| **400** | Invalid email or password | During login |
| **500** | Server error | Database or hashing issue |

 

**5.2 Customer API Documentation (CRUD)**

**Base URL:** /api/customers  
 **Authentication:** JWT Token required (auth middleware)

---

| HTTP Method | Endpoint | Description | Request Body / Params | Success Response | Notes |
| ----- | ----- | ----- | ----- | ----- | ----- |
| **POST** | /api/customers/ | Create a new customer | JSON body: • name (required) • email • phone • address | { success: true, message: "Customer created successfully", customer: { ... } } | Requires JWT token in headers |
| **GET** | /api/customers/ | Get all customers created by the logged-in user | None | { success: true, customers: \[ ... \] } | Requires JWT token |
| **GET** | /api/customers/:id | Get a specific customer by ID | URL param: id (customer ObjectId) | { success: true, customer: { ... } } | Requires JWT token |
| **PUT** | /api/customers/:id | Update a specific customer | URL param: id JSON body: • name (optional) • email (optional) • phone (optional) • address (optional) | { success: true, message: "Customer updated successfully", customer: { ... } } | Requires JWT token |
| **DELETE** | /api/customers/:id | Delete a specific customer | URL param: id | { success: true, message: "Customer deleted successfully" } | Requires JWT tok |

 

**Sample JSON Response**  \[  GET /api/customers/:id \]

{  
  "success": true,  
  "customer": {  
	"\_id": "65c89ff63bd82bb01ff45f67",  
	"name": "John Paul",  
	"email": "john@example.com",  
	"phone": "9876543210",  
	"address": "Kochi"  
  }  
}

 

 

### **6.Explanation of Backend Logic**

## **6.1. MongoDB & Mongoose**

·   	**MongoDB** is a NoSQL database used to store users and customer data.

·   	**Mongoose** is an ODM (Object Data Modeling) library that provides a schema-based solution for structuring and validating MongoDB documents.

·   	**User Model:** Stores user information like name, email, and hashed password.

·   	**Customer Model:** Stores customer data like name, email, phone, address, and links to the creator (createdBy field).

·   	Timestamps (createdAt, updatedAt) are automatically added to each document.

**In short:** MongoDB stores data, and Mongoose enforces structure and relationships.

---

## **6.2. Login / Registration**

**Registration:**

1\. 	User sends name, email, and password to /api/auth/register.

2\. 	The backend validates the input.

3\. 	Password is hashed before storing in the database.

4\. 	A JWT token is generated and sent to the user.

**Login:**

1\. 	User sends email and password to /api/auth/login.

2\. 	Backend finds the user in MongoDB.

3\. 	Password is verified against the hashed password.

4\. 	On success, a JWT token is generated and returned.

**In short:** Registration saves the user securely, and login validates credentials to provide access.

---

## **6.3. Token Creation and Transmission**

·   	JWT (JSON Web Token) is created after registration/login.

·   	The token contains user information (e.g., user ID) and is signed using JWT\_SECRET.

·   	Token is sent in the **response** and stored by the frontend (usually in localStorage).

**In short:** Tokens allow users to authenticate without sending credentials every time.

---

## **6.4. Protected Requests & Verification (Middleware)**

·   	Certain routes (like /api/customers) are **protected**, meaning they require a valid JWT token.

·   	Middleware (auth.js) intercepts the request, verifies the token, and attaches the user ID to req.user.

·   	If the token is invalid or missing, the request is rejected with **401 Unauthorized**.

**In short:** Middleware ensures only authenticated users can access sensitive routes.

---

## **6.5. Authorization**

·   	Once the token is verified, the backend checks if the user has the right to perform the requested action.

·   	Example: Users can only update or delete customers they created (createdBy \= user ID).

·   	This prevents unauthorized access to other users’ data.

**In short:** Authorization ensures users only access their own resources.

---

## **6.6. How Password Hashing Works**

1\. 	Passwords are **never stored in plain text**.

2\. 	bcrypt library hashes the password before saving to MongoDB.

3\. 	During login, the provided password is compared with the hashed password using bcrypt.compare().

**In short:** Password hashing keeps user accounts secure.

---

## **6.7. What Middleware Does**

Middleware is a function that runs **before the main route handler**. In this project:

·   	**Auth Middleware:**

o   Checks if JWT exists in headers

o   Verifies the token

o   Attaches userId to req.user

o   Rejects requests without valid tokens

**In short:** Middleware acts as a gatekeeper for protected routes.

---

## **6.8. What Services Handle**

| Service | Responsibility |
| ----- | ----- |
| **Express Router** | Maps HTTP requests to the correct controller functions |
| **Controllers** | Handle the main logic for authentication and customer CRUD operations |
| **Mongoose Models** | Define structure, validation, and database queries |
| **Middleware** | Protects routes, validates tokens, and manages request preprocessing |
| **JWT Service** | Creates and verifies authentication tokens |
| **bcrypt Service** | Hashes passwords and compares them during login |

 

**7\. Testing Approach (Using Postman)**

Postman is used to **test backend APIs** of the CRM project before integrating with the frontend. It helps verify authentication, customer management, and proper API responses.

| API | Method | Request Body / Params | Headers | Expected Result | Notes |
| ----- | ----- | ----- | ----- | ----- | ----- |
| **Register User** | POST | { "name": "Ambily", "email": "ambily@example.com", "password": "mypassword123" } | None | User created, JWT token returned | Create new user |
| **Login User** | POST | { "email": "ambily@example.com", "password": "mypassword123" } | None | JWT token returned | Login to get authentication token |
| **Create Customer** | POST | { "name": "John Doe", "email": "john@example.com", "phone": "9876543210", "address": "Kochi" } | Authorization: Bearer \<JWT\_TOKEN\> | Customer created successfully | JWT token required |
| **Get All Customers** | GET | None | Authorization: Bearer \<JWT\_TOKEN\> | List of all customers created by user | JWT token required |
| **Get Customer By ID** | GET | URL param: id | Authorization: Bearer \<JWT\_TOKEN\> | Returns selected customer details | JWT token required |
| **Update Customer** | PUT | Fields to update (e.g., phone or address) | Authorization: Bearer \<JWT\_TOKEN\> | Customer updated successfully | JWT token required |
| **Delete Customer** | DELETE | URL param: id | Authorization: Bearer \<JWT\_TOKEN\> | Customer deleted successfully | JWT token required |

 

### **8.Final Conclusion**

CRM Application effectively manages users and customer data while ensuring smooth frontend-backend integration.

### **8.1. How the Backend Supports the CRM System**

·   	**API-driven Architecture:** Express.js provides RESTful APIs to handle user authentication and customer CRUD operations.

·   	**Database Management:** MongoDB, with Mongoose schemas, ensures structured storage of users and customer data.

·   	**Business Logic Handling:** Controllers manage the core logic for authentication, customer operations, and data validation.

·   	**Middleware Integration:** Auth middleware ensures only authorized users can access sensitive routes and resources.

·   	**Token-based Authentication:** JWT tokens manage secure sessions without exposing passwords or sensitive information.

### **8.2. Scalability**

·   	**Modular Architecture:** Separation of controllers, models, and routes allows the backend to scale easily as new features are added.

·   	**Database Flexibility:** MongoDB’s NoSQL structure enables handling large volumes of customer data and future expansion.

·   	**Asynchronous Operations:** Node.js and Express.js handle concurrent requests efficiently, supporting multiple users simultaneously.

·   	**Future Extensions:** Additional modules (e.g., Case/Interaction management) can be integrated without affecting the existing system.

### **8.3. Security Considerations**

·   	**Password Security:** User passwords are hashed using bcrypt before storage, preventing exposure of plain text passwords.

·   	**JWT Authentication:** Tokens ensure secure communication between frontend and backend, protecting sensitive routes.

·   	**Protected Routes:** Middleware validates tokens and authorizes actions, preventing unauthorized access.

·   	**Input Validation & Error Handling:** Backend checks input data to prevent injection attacks and ensures robust API responses.

·   	**Environment Variables:** Sensitive data (MongoDB URI, JWT secret) are stored securely in .env files, not exposed in code.

 

