# Express.js Authentication Backend

A robust Express.js backend application with MongoDB integration, featuring user authentication, JWT-based authorization, and comprehensive error handling.

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Middleware](#middleware)
- [Models](#models)
- [Error Handling](#error-handling)
- [Security](#security)

## Features
- User authentication (signup/login)
- JWT-based authorization
- MongoDB integration with Mongoose
- Input validation
- Error handling
- CORS configuration
- Request logging
- Security headers with Helmet
- Graceful server shutdown

## Project Structure
```
├── config/
│   ├── corsOptions.js    # CORS configuration
│   └── database.js       # MongoDB connection setup
├── middleware/
│   ├── auth.js          # JWT authentication middleware
│   ├── errorHandler.js   # Global error handling
│   └── validation.js     # Input validation middleware
├── models/
│   └── User.js          # User model schema
├── routes/
│   └── auth.js          # Authentication routes
├── utils/
│   └── logger.js        # Custom logger utility
├── .env                 # Environment variables
├── package.json         # Project dependencies
└── server.js           # Application entry point
```

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Create a .env file with the following variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

4. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## Configuration

### Database Configuration
The application uses MongoDB as its database. Connection is configured in `config/database.js`:
- Automatically connects on server start
- Logs connection status
- Exits process on connection error

### CORS Configuration
CORS settings are managed in `config/corsOptions.js`:
- Allows requests from specified origins
- Supports credentials
- Custom success status code

## API Endpoints

### Authentication Routes
Base path: `/api/auth`

#### 1. Signup
- **POST** `/api/auth/signup`
- **Body:**
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```
- Validates input
- Checks for existing users
- Returns JWT token on success

#### 2. Login
- **POST** `/api/auth/login`
- **Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- Authenticates user credentials
- Returns JWT token on success

#### 3. Get Current User
- **GET** `/api/auth/me`
- **Headers:** `Authorization: Bearer <token>`
- Returns current user profile

### Health Check
- **GET** `/api/health`
- Returns server status and timestamp

## Middleware

### Authentication Middleware
Located in `middleware/auth.js`:
- Verifies JWT tokens
- Extracts user information
- Attaches user to request object

### Validation Middleware
Located in `middleware/validation.js`:
- Validates signup inputs:
  - Name (2-50 characters)
  - Email (valid format)
  - Password (min 6 chars, includes uppercase, lowercase, number)
- Validates login inputs:
  - Email
  - Password presence

### Error Handler
Located in `middleware/errorHandler.js`:
- Handles different types of errors:
  - Mongoose duplicate key errors
  - Validation errors
  - JWT errors
  - Generic errors
- Logs errors with stack traces
- Returns formatted error responses

## Models

### User Model
Located in `models/User.js`:

Fields:
- `name`: String (required, max 50 chars)
- `email`: String (required, unique, validated)
- `password`: String (required, min 6 chars, hashed)

Features:
- Password hashing before save
- Password comparison method
- Timestamps for creation/updates

## Error Handling
The application implements comprehensive error handling:
- Custom error messages for different scenarios
- HTTP status codes aligned with error types
- Structured error responses
- Error logging with timestamps

## Security
Security measures implemented:
- Password hashing using bcrypt
- JWT-based authentication
- Helmet security headers
- CORS protection
- Input validation
- Environment variable protection
- Request size limits

## Logging
Custom logger utility in `utils/logger.js`:
- Info level logging
- Error level logging
- Warning level logging
- Timestamps for all logs
- Request logging middleware