# MERN Authentication App

## Overview

This project is a **MERN (MongoDB, Express, React, Node.js)** authentication app designed to handle user registration, login, and protected routes with JWT (JSON Web Token) authentication.

The application was primarily developed with the help of **ChatGPT**, an advanced Generative AI (GenAI) model, minimizing the need for manual code writing and making the development process faster and more efficient. 

---

## Features

- **Sign Up / Sign In**: Allows users to register and log in using email and password.
- **JWT Authentication**: Uses JSON Web Tokens for secure authentication.
- **Protected Routes**: Certain routes are protected and can only be accessed by authenticated users.
- **reCAPTCHA Integration**: Ensures that user registration and login are not done by bots.
- **Responsive Design**: Built with **Bootstrap** to ensure a mobile-friendly, responsive layout.
- **Toast Notifications**: Gives users instant feedback on actions like login success or errors.

---

## Technologies Used

- **Frontend**:
  - React
  - React Router DOM
  - Bootstrap for styling
  - React Toastify for notifications
  - reCAPTCHA v2 Tickbox for bot prevention

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (NoSQL database)
  - JWT (for authentication tokens)
  - bcrypt.js (for hashing passwords)
  - Axios (for API calls)

- **Security**:
  - JWT for token-based authentication
  - bcrypt for securely storing passwords
  - reCAPTCHA to prevent bot activity

---

## How It Works

### 1. **User Registration (Sign Up)**
   - The user enters their **email** and **password**, and agree to the terms and conditions (via a checkbox).
   - reCAPTCHA verification is required to prevent bots.
   - A POST request is made to the backend to create the user's account.
   - If the user already exists, an error message is shown. If registration is successful, the user is redirected to the Sign In page.

### 2. **User Login (Sign In)**
   - The user enters their credentials and completes reCAPTCHA verification.
   - The backend authenticates the user, returns a JWT token, and the token is saved in localStorage.
   - If successful, the user is redirected to the Home page with authenticated access.

### 3. **Protected Routes & Logout Action**
   - Routes like the **Home** page are protected. Only authenticated users (with valid JWT tokens) can access them.
   - If a user tries to access a protected route without being authenticated, they are redirected to the Sign In page.
   - If the User clicks on the Logout Button when logged in, they are redirected to the Sign In page. The JWT token is removed from localStorage.

---

## Demo

##### You can view a demo of the SignUP / SignIn process in action here:

https://github.com/user-attachments/assets/b8172a3b-6e59-471d-b211-3bf44484a53d

---

## License

This project is licensed under the MIT License.
