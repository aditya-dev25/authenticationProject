import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false); // State for checkbox
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });

      // Save the token in local storage
      localStorage.setItem('token', response.data.token);
      toast.success('Login successful!');
      navigate("/home");

    } catch (error) {
      const errorMessage =
        error.response?.data?.message || 'An error occurred. Please try again.';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Login</h1>
      <form onSubmit={handleLogin} className="w-50 mx-auto">
        <div className="form-group mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="form-group form-check mb-3">
          <input
            type="checkbox"
            id="checkbox"
            className="form-check-input"
            checked={isCheckboxChecked}
            onChange={(e) => setIsCheckboxChecked(e.target.checked)} // Update state on checkbox change
          />
          <label htmlFor="checkbox" className="form-check-label">
            I agree to the terms and conditions
          </label>
        </div>
        <button
          type="submit"
          className={`btn w-100 ${isCheckboxChecked ? 'btn-primary' : 'btn-secondary'}`}
          disabled={!isCheckboxChecked} // Disable button when checkbox is unchecked
        >
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignIn;
