# Fully_Functioned_AuthSystem_with_SwitchUser

This project implements a fully functional authentication system with support for **user switching**. It uses **Node.js** for the backend and **React** for the frontend. The system supports user registration, login.

## Features

- **User Authentication**: 
  - User registration and login using email and password.
  - Passwords are securely hashed using `bcrypt`.
  - JWT-based authentication for secure user sessions.

- **Switch User**:
  -  users can switch between regular users without logging out.
  - All user data is dynamically updated based on the active user.

## Tech Stack

- **Backend**:
  - **Node.js**: Server-side JavaScript runtime.
  - **Express**: Web framework for building RESTful APIs.
  - **MongoDB**: Database for storing user information and authentication data.
  - **Mongoose**: MongoDB object modeling tool.
  - **JWT**: Authentication tokens for secure user sessions.
  - **bcryptjs**: Password hashing for secure user authentication.

- **Frontend**:
  - **React**: Library for building user interfaces.
  - **React Router**: For handling client-side routing.
  - **Axios**: For making HTTP requests to the backend.
  - **React Context API**: For global state management (user session).
  - **Styled-Components**: For styling React components.

## Setup & Installation
### **1. Clone the Repository**
```sh
clone this repo
cd your-project-folder
```

### **2. Install Dependencies**
#### **Frontend**
```sh
cd frontend
npm install
```
#### **Backend**
```sh
cd backend
npm install
```
### **3. Start the Development Server**
#### **Backend**
```sh
npm start
```
#### **Frontend**
```sh
npm run dev
```



## Author
Feel free to contribute or raise issues!

## License
