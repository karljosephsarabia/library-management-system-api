# API Documentation

## Overview

This API is designed for user registration and book management, including borrowing and returning books. It is built using Node.js, Express, and TypeScript, with MongoDB Atlas as the database.

## Technologies Used

- Node.js
- Express
- TypeScript
- Mongoose (MongoDB ODM)
- MongoDB Atlas

## Dependencies

```json
{
  "dependencies": {
    "body-parser": "^1.20.3",
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "mongoose": "^8.12.1",
    "zod": "^3.24.2"
  },
  "devDependencies": {
    "@types/body-parser": "^1.19.5",
    "@types/express": "^5.0.0",
    "@types/mongoose": "^5.11.97",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.8.2"
  }
}
```

## Installation & Setup

### Prerequisites

- Node.js (v16 or later)

### Steps to Run Locally

1. Clone the repository:

   ```sh
   git git@github.com:karljosephsarabia/library-management-system-api.git
   cd library-management-system-api/api
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the application:

   ```sh
   npm run dev
   ```

The server will run on `http://localhost:3000` (or you can specify a different PORT in the .env file).

---

## API Endpoints

### User Routes

| Method | Endpoint      | Description         |
| ------ | ------------- | ------------------- |
| POST   | `/api/user-register` | Register a new user |

#### Example Request:

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890"
}
```

#### User Registration Validation

When registering a user, the following validation rules apply:

- **Full Name**: Must be at least 3 characters long and cannot have leading or trailing spaces.
- **Email**: Must be a valid email format.
- **Phone**: Must be a valid phone number, optionally starting with `+`, followed by 10 to 15 digits.

---

### Book Routes

| Method | Endpoint                | Description                  |
| ------ | ----------------------- | ---------------------------- |
| GET    | `/api/books/`           | Retrieve all books           |
| POST   | `/api/books/add`        | Register a new book          |
| PATCH  | `/api/books/:id/borrow` | Borrow a book by ID          |
| PATCH  | `/api/books/:id/return` | Return a borrowed book by ID |

#### Example Request to Add a Book:

```json
{
  "title": "Adventures in the Digital Age",
  "author": "Jonathan Wright",
  "category": "Non-Fiction",
  "isbn": "978-1-01234-567-9"
}
```
#### Adding Book Validation Rules

When adding a book, the following validation rules apply:

- **Title**: Required and must be a non-empty string.
- **Author**: Required and must be a non-empty string.
- **Category**: Optional but must be a string if provided.
- **ISBN**: Required, must be a unique string, and must be at least 10 characters long.


#### Example Request to Borrow a Book:

```json
{
  "email": "sarah.mitchell@example.com"
}
```

#### Borrow a Book Validation Rules

When borrow a book, the following validation rules apply:

- **Email**: Required and must be a valid email format.


---

## Thank You

Thank you for reviewing this API documentation. If you have any questions or need further clarifications, feel free to ask.







