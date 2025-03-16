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
    "@types/express": "^4.17.21",
    "@types/node": "^22.13.10",
    "ts-node": "^10.9.2",
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
| GET    | `/api/book/`           | Retrieve all books           |
| POST   | `/api/book/add`        | Register a new book          |
| PATCH  | `/api/book/:id/borrow` | Borrow a book by ID          |
| PATCH  | `/api/book/:id/return` | Return a borrowed book by ID |
| GET    | `/api/book/available`  | Retrieve available books     |


### Example Request to Retrieve All Books:

Http Request:

```http
http://localhost:3000/api/book
```

Example Response:

```json
[
  {
    "_id": "67d5a57bf88e8b8724b29d9b",
    "title": "The Shadow Paradox",
    "author": "Elena Harper",
    "category": "Science Fiction",
    "isbn": "978-1-23456-789-0",
    "isBorrowed": true,
    "createdAt": "2025-03-15T16:06:19.224Z",
    "updatedAt": "2025-03-16T11:54:25.012Z",
    "__v": 0,
    "borrowedUserId": "67d5a299ee8ac507a851462c"
  },
  {
    "_id": "67d5a5b2f88e8b8724b29da1",
    "title": "Whispers of the Lost",
    "author": "Daniel Mercer",
    "category": "Mystery",
    "isbn": "978-1-98765-432-1",
    "isBorrowed": true,
    "createdAt": "2025-03-15T16:07:14.278Z",
    "updatedAt": "2025-03-15T16:44:41.548Z",
    "__v": 0,
    "borrowedUserId": "67d5a299ee8ac507a851462c"
  },
  {
    "_id": "67d5a5cff88e8b8724b29da3",
    "title": "The Last Dawn",
    "author": "Sophia Bennett",
    "category": "Fantasy",
    "isbn": "978-1-34567-890-2",
    "isBorrowed": true,
    "createdAt": "2025-03-15T16:07:43.831Z",
    "updatedAt": "2025-03-15T16:15:04.892Z",
    "__v": 0,
    "borrowedUserId": "67d5a266ee8ac507a851462a"
  }
]
```

#### Example Request to Add a Book:

Http Request:

```http
http://localhost:3000/api/book/add
```

```json
{
  "title": "Adventures in the Digital Age",
  "author": "Jonathan Wright",
  "category": "Non-Fiction",
  "isbn": "978-1-01234-567-9"
}
```

Example Response:

```json
{
  "message": "Book Successfully Added!"
}
```
#### Adding Book Validation Rules

When adding a book, the following validation rules apply:

- **Title**: Required and must be a non-empty string.
- **Author**: Required and must be a non-empty string.
- **Category**: Optional but must be a string if provided.
- **ISBN**: Required, must be a unique string, and must be at least 10 characters long.


#### Example Request to Borrow a Book:

Http Request:

```http
http://localhost:3000/api/book/67d5a57bf88e8b8724b29d9b/borrow
```

```json
{
  "email": "sarah.mitchell@example.com"
}
```

Example Response:

```json
{
  "_id": "67d5a57bf88e8b8724b29d9b",
  "title": "The Shadow Paradox",
  "author": "Elena Harper",
  "category": "Science Fiction",
  "isbn": "978-1-23456-789-0",
  "isBorrowed": true,
  "createdAt": "2025-03-15T16:06:19.224Z",
  "updatedAt": "2025-03-16T11:54:25.012Z",
  "__v": 0,
  "borrowedUserId": {
    "_id": "67d5a299ee8ac507a851462c",
    "fullName": "Sarah Mitchell",
    "email": "sarah.mitchell@example.com",
    "phone": "+15556789012",
    "borrowedBooks": [
      "67d5a5f1f88e8b8724b29da5",
      "67d5a60ff88e8b8724b29da7",
      "67d5a5b2f88e8b8724b29da1",
      "67d5a57bf88e8b8724b29d9b"
    ],
    "createdAt": "2025-03-15T15:54:01.568Z",
    "updatedAt": "2025-03-16T11:54:24.932Z",
    "__v": 0
  }
}
```

#### Borrow a Book Validation Rules

When borrow a book, the following validation rules apply:

- **Email**: Required and must be a valid email format.


#### Example Request to Return a Book:

Http Request:

```http
http://localhost:3000/api/book/67d5a57bf88e8b8724b29d9b/return
```

Example Response:

```json
{
  "_id": "67d5a57bf88e8b8724b29d9b",
  "title": "The Shadow Paradox",
  "author": "Elena Harper",
  "category": "Science Fiction",
  "isbn": "978-1-23456-789-0",
  "isBorrowed": false,
  "createdAt": "2025-03-15T16:06:19.224Z",
  "updatedAt": "2025-03-16T11:54:25.012Z",
  "__v": 0
}
```

### Example Request to Retrieve Available Books:

Http Request

```http
http://localhost:3000/api/book/available
```

Example Response:

```json
[
  {
    "_id": "67d5a57bf88e8b8724b29d9b",
    "title": "The Shadow Paradox",
    "author": "Elena Harper",
    "category": "Science Fiction",
    "isbn": "978-1-23456-789-0",
    "isBorrowed": false,
    "createdAt": "2025-03-15T16:06:19.224Z",
    "updatedAt": "2025-03-15T16:45:38.470Z",
    "__v": 0
  },
  {
    "_id": "67d5a62ef88e8b8724b29da9",
    "title": "The Art of Being Human",
    "author": "Dr. James Thornton",
    "category": "Self-Help",
    "isbn": "978-1-67890-123-5",
    "isBorrowed": false,
    "createdAt": "2025-03-15T16:09:18.930Z",
    "updatedAt": "2025-03-15T16:09:18.930Z",
    "__v": 0
  },
  {
    "_id": "67d5a650f88e8b8724b29dab",
    "title": "Code of the Future",
    "author": "Nathan Reed",
    "category": "Technology",
    "isbn": "978-1-78901-234-6",
    "isBorrowed": false,
    "createdAt": "2025-03-15T16:09:52.252Z",
    "updatedAt": "2025-03-15T16:09:52.252Z",
    "__v": 0
  },
]
```

---

## Thank You

Thank you for reviewing this API documentation. If you have any questions or need further clarifications, feel free to ask.







