# EZPay Application

EZPay is a full-stack web application built using React for the frontend and Express for the backend. It provides users with features for signing up, signing in, and managing transactions via a dashboard. The application uses JSON Web Tokens (JWT) for authentication and MongoDB for data storage.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Configuration](#configuration)
- [Contributing](#contributing)


## Features

- **User Authentication**: Users can sign up and sign in securely using JWT authentication.
- **Dashboard**: Once authenticated, users can access a dashboard displaying registered users and perform transactions.
- **Transaction Management**: Users can send money to other registered users directly from the dashboard.
- **Wallet Balance**: Users receive an initial amount in their wallet upon signing up.

## Technologies Used

- **Frontend**:
  - React A JavaScript library for building user interfaces.
  - React Router: For client-side routing within the React application.
  - React Icons: Provides a set of icons for use in React applications.
  - Avvvatars React: Generates avatar images based on user initials.
  - React Hot Toast: Library for toast notifications in React applications.

- **Backend**:
  - Express: A Node.js web application framework for building APIs and web servers.
  - MongoDB: A NoSQL database for storing application data.
  - Mongoose: An ODM (Object Data Modeling) library for MongoDB and Node.js.
  - JSON Web Tokens (JWT): Used for user authentication and authorization.

## Getting Started

Follow these instructions to get the EZPay application up and running on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- npm (Node Package Manager)
- MongoDB


### Configuration
Create a .env file in the server directory:
### Server Configuration
```PORT=5000
JWT_SECRET=your_jwt_secret
MONGODB_URI=your_mongodb_uri
```

### Contributing
Contributions are welcome! Feel free to open issues or pull requests to suggest improvements, report bugs, or add new features.

