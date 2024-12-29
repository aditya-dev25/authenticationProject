import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null); // State to track token validity
  const token = localStorage.getItem('token');

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsValid(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/auth/verifyToken', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 200) {
          setIsValid(true);
        }
      } catch (error) {
        setIsValid(false);
        toast.error('Invalid token, please sign in again.');
        localStorage.removeItem('token'); // Clear invalid token
      }
    };

    validateToken();
  }, [token]);

  // Show a loading state while checking the token
  if (isValid === null) {
    return <div>Loading...</div>;
  }

  // Redirect to sign-in page if token is invalid
  if (!isValid) {
    return <Navigate to="/signin" replace />;
  }

  // Render protected component if token is valid
  return children;
};

export default ProtectedRoute;
