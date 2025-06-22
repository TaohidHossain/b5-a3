# :mortar_board: Library Management API

A RESTful API for managing a library's books and borrow records, built with **Express**, **TypeScript**, **Mongoose**, and **Zod** for validation.

## :sparkler: Features

- :heavy_check_mark: **Book Management**
  - Create, read, update, and delete books
  - Filter, sort, and paginate book listings
  - Enforces business logic: available status and copies are always consistent

- :heavy_check_mark: **Borrow Management**
  - Borrow books with quantity and due date validation
  - Aggregated summary of borrowed books
  - Prevents borrowing unavailable or insufficient copies

- :heavy_check_mark: **Validation & Error Handling**
  - Request validation using Zod schemas
  - Centralized error handling for application, validation, and database errors

- :heavy_check_mark: **Environment Configuration**
  - Uses environment variables for configuration (see `.env`)

## :100: Getting Started

### :bangbang: Prerequisites

- Node.js (v16+ recommended)
- MongoDB instance (local or cloud)

### Installation

1. **Clone the repository**
    ```
    git clone https://github.com/TaohidHossain/b5-a3.git
    cd b5-a3
    ```
2. **Install dependancies**
    ```
    npm install
    ```
3. **Configure environment variables**

    Create a .env file in the root directory:
    ```
    PORT=4000
    MONGO_URI=mongodb://localhost:27017/library
    ```
4. **Start the development server**
    ```
    npm run dev
    ```
    The server will run on http://localhost:4000 by default.

## API Endpoints

### :ballot_box_with_check: Books

- `POST /api/books` — Create a new book
- `GET /api/books` — List all books (supports filtering, sorting, pagination)
- `GET /api/books/:bookId` — Get a book by ID
- `PUT /api/books/:bookId` — Update a book
- `DELETE /api/books/:bookId` — Delete a book

### :ballot_box_with_check: Borrow

- `POST /api/borrow` — Borrow a book
- `GET /api/borrow` — Get borrowed books
## Sample request and response of the API endpoints
:ballot_box_with_check:`POST /api/books`
### Request
```
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
```
### Response
```
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z"
  }
}
```

:ballot_box_with_check:`GET /api/books`
### Response
```
{
  "success": true,
  "message": "Books retrieved successfully",
  "data": [
    {
      "_id": "64f123abc4567890def12345",
      "title": "The Theory of Everything",
      "author": "Stephen Hawking",
      "genre": "SCIENCE",
      "isbn": "9780553380163",
      "description": "An overview of cosmology and black holes.",
      "copies": 5,
      "available": true,
      "createdAt": "2024-11-19T10:23:45.123Z",
      "updatedAt": "2024-11-19T10:23:45.123Z"
    }
    {...}
  ]
}
```

:ballot_box_with_check:`GET /api/books/:bookId`
### Response
```
{
  "success": true,
  "message": "Book retrieved successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z"
  }
}
```
:ballot_box_with_check:`PUT /api/books/:bookId`
### Request
```
{
  "copies": 50
}
```
### Response
```
{
  "success": true,
  "message": "Book updated successfully",
  "data": {
    "_id": "64f123abc4567890def12345",
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 50,
    "available": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-20T08:30:00.000Z"
  }
}
```
:ballot_box_with_check:`DELETE /api/books/:bookId`
### Response
```
{
  "success": true,
  "message": "Book deleted successfully",
  "data": null
}
```
:ballot_box_with_check:`POST /api/borrow`
### Request
```
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```
### Response
```
{
  "success": true,
  "message": "Book borrowed successfully",
  "data": {
    "_id": "64bc4a0f9e1c2d3f4b5a6789",
    "book": "64ab3f9e2a4b5c6d7e8f9012",
    "quantity": 2,
    "dueDate": "2025-07-18T00:00:00.000Z",
    "createdAt": "2025-06-18T07:12:15.123Z",
    "updatedAt": "2025-06-18T07:12:15.123Z"
  }
}
```
:ballot_box_with_check:`GET /api/borrow`
### Response
```
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    },
    {
      "book": {
        "title": "1984",
        "isbn": "9780451524935"
      },
      "totalQuantity": 3
    }
  ]
}
```
## Technologies Used
- Express
- TypeScript
- Mongoose
- Zod

## License
MIT