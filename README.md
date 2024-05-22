# Pet Adoption Server

#### [API Live Link]()

## Project Setup

1. Install dependencies and Run the server:

   ```bash
   # 1. Clone the Repository
   git clone
   # 2. Navigate to the project directory
   cd pet-adoption-server
   # 3. Install Dependencies
   yarn add
   # 4. Run the server
   yarn dev
   ```

1. Setup environment variables:

   ```js
   NODE_DEV = development;
   PORT = your_port_number;
   DATABASE_URL = your_postgres_url;
   BCRYPT_SALT_ROUNDS = your_bcrypt_salt_rounds;
   JWT_SECRET = your_jwt_secret;
   JWT_EXPIRES_IN = your_jwt_expires_in;
   ```

## Technology Stack

- **Programming Language:** TypeScript
- **Web Framework:** Express.js
- **ORM:** Prisma with PostgreSQL
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** Zod

## Features

1. User Registration
2. User Login
3. Add a Pet
4. Get Paginated and Filtered Pets
5. Update Pet profile
6. Submit Adoption Request
7. Get Adoption Requests
8. Update Adoption Request Status
9. Get User Information
10. Update User Information

## API Documentation

[Postman API Documentation Live Link](https://documenter.getpostman.com/view/15226030/2sA35Ea3VU)

## Entity Relationship Diagram

![ERD](./ERD.png)
