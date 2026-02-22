# Crest Info Systems Backend

A robust Node.js backend API built with Express.js and MongoDB, featuring user authentication, role-based access control, and contact management functionality.

## 🚀 Features

- **User Authentication**: Secure signup and login with JWT tokens
- **Role-Based Access Control**: Admin and user roles with protected routes
- **User Management**: Complete CRUD operations for users (admin only)
- **Profile Management**: Users can view and update their own profiles
- **Contact Form**: Public contact form submission with admin viewing capabilities
- **Security**: Password hashing with bcrypt, rate limiting, CORS protection, and Helmet.js
- **Error Handling**: Centralized error handling with custom error classes
- **Input Validation**: Request validation middleware for all endpoints

## 📋 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Security**: 
  - bcrypt for password hashing
  - Helmet.js for HTTP headers security
  - express-rate-limit for API rate limiting
  - CORS for cross-origin resource sharing
- **Environment**: dotenv for configuration management

## 📁 Project Structure

```
crest-info-systems-backend/
├── src/
│   ├── app.js                 # Express app configuration
│   ├── server.js              # Server entry point
│   ├── config/
│   │   ├── db.js              # MongoDB connection
│   │   └── index.js           # Application configuration
│   ├── middlewares/
│   │   ├── auth.middleware.js # JWT authentication middleware
│   │   ├── role.middleware.js # Role-based access control
│   │   └── error.middleware.js # Error handling middleware
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.controller.js
│   │   │   ├── auth.model.js
│   │   │   ├── auth.routes.js
│   │   │   ├── auth.service.js
│   │   │   └── auth.validation.js
│   │   ├── user/
│   │   │   ├── user.controller.js
│   │   │   ├── user.model.js
│   │   │   ├── user.routes.js
│   │   │   ├── user.service.js
│   │   │   ├── user.validation.js
│   │   │   └── profile.service.js
│   │   └── contact/
│   │       ├── contact.controller.js
│   │       ├── contact.model.js
│   │       ├── contact.routes.js
│   │       ├── contact.service.js
│   │       └── contact.validation.js
│   ├── routes/
│   │   └── index.js           # Main routes aggregator
│   └── utils/
│       ├── ApiError.js        # Custom error class
│       └── catchAsync.js      # Async error wrapper
├── package.json
├── .env.example
└── README.md
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd crest-info-systems-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=7d
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:5173
   ```

4. **Start the server**
   ```bash
   # Development mode (with auto-reload)
   npm run dev

   # Production mode
   npm start
   ```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

## 🔐 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port number | `3000` |
| `MONGO_URI` | MongoDB connection string | Required |
| `JWT_SECRET` | Secret key for JWT token signing | Required |
| `JWT_EXPIRES_IN` | JWT token expiration time | `7d` |
| `NODE_ENV` | Environment (development/production) | `development` |
| `CORS_ORIGIN` | Allowed CORS origin | `http://localhost:5173` |

## 📡 API Endpoints

### Base URL
```
http://localhost:3000/api
```

### Authentication Endpoints

#### Sign Up
```http
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user" // optional, defaults to "user"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "user": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "jwt_token_here"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  },
  "token": "jwt_token_here"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### Update Profile
```http
PUT /api/auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Updated",
  "email": "johnupdated@example.com"
}
```

### User Management Endpoints (Admin Only)

#### Get All Users
```http
GET /api/users
Authorization: Bearer <admin_token>
```

#### Get User by ID
```http
GET /api/users/:id
Authorization: Bearer <admin_token>
```

#### Create User
```http
POST /api/users
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "password123", // optional, auto-generated if not provided
  "role": "user" // optional, defaults to "user"
}
```

#### Update User
```http
PUT /api/users/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Jane Updated",
  "email": "janeupdated@example.com",
  "role": "admin"
}
```

#### Delete User
```http
DELETE /api/users/:id
Authorization: Bearer <admin_token>
```

### Contact Endpoints

#### Submit Contact Form (Public)
```http
POST /api/contacts
Content-Type: application/json

{
  "name": "Contact Name",
  "email": "contact@example.com",
  "subject": "Inquiry Subject",
  "message": "Your message here..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Contact message submitted successfully",
  "data": {
    "_id": "...",
    "name": "Contact Name",
    "email": "contact@example.com",
    "subject": "Inquiry Subject",
    "message": "Your message here...",
    "status": "new",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

#### Get All Contacts (Admin Only)
```http
GET /api/contacts
Authorization: Bearer <admin_token>
```

## 🔒 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Token Format
- Tokens are issued upon successful signup or login
- Default expiration: 7 days (configurable via `JWT_EXPIRES_IN`)
- Token contains user ID and is verified on protected routes

## 🛡️ Security Features

1. **Password Hashing**: All passwords are hashed using bcrypt before storage
2. **Rate Limiting**: API endpoints are rate-limited (100 requests per 15 minutes)
3. **Helmet.js**: Security headers to protect against common vulnerabilities
4. **CORS**: Configurable cross-origin resource sharing
5. **Input Validation**: All endpoints validate input data
6. **Role-Based Access**: Admin-only routes protected by role middleware
7. **JWT Security**: Secure token-based authentication

## 📝 User Roles

- **user**: Default role with basic access
- **admin**: Full access including user management and contact viewing

## ⚠️ Error Handling

The API uses a centralized error handling system:

- **400**: Bad Request - Invalid input data
- **401**: Unauthorized - Authentication required or invalid token
- **403**: Forbidden - Insufficient permissions
- **404**: Not Found - Resource not found
- **500**: Internal Server Error - Server error

Error response format:
```json
{
  "success": false,
  "error": "Error message here"
}
```

In development mode, stack traces are included in error responses.

## 🧪 Validation Rules

### Signup/Login
- Email: Valid email format required
- Password: Minimum 6 characters
- Name: Required for signup

### Contact Form
- Name: Minimum 2 characters
- Email: Valid email format
- Subject: Minimum 3 characters
- Message: Minimum 10 characters

### User Management
- Email: Must be unique
- Name: Required
- Role: Must be either "admin" or "user"

## 📦 Dependencies

- `express`: Web framework
- `mongoose`: MongoDB ODM
- `jsonwebtoken`: JWT authentication
- `bcrypt`: Password hashing
- `dotenv`: Environment variable management
- `cors`: Cross-origin resource sharing
- `helmet`: Security headers
- `express-rate-limit`: Rate limiting

## 🚦 Scripts

- `npm start`: Start the server in production mode
- `npm run dev`: Start the server in development mode with auto-reload

## 📄 License

ISC

## 👤 Author

Crest Info Systems

---

For more information or support, please contact the development team.
