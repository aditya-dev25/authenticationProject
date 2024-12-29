import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import ReCAPTCHA from 'react-google-recaptcha';
import 'react-toastify/dist/ReactToastify.css';
import './Auth.css'; // Use the updated shared CSS file

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(""); // reCAPTCHA token
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!recaptchaToken) {
      toast.error('Please complete the reCAPTCHA verification.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password, recaptchaToken});
      localStorage.setItem('token', response.data.token);
      toast.success('Login successful!');
      navigate("/home");

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
      toast.error(errorMessage);
    }
  };

  const onRecaptchaChange = (token) => {
    setRecaptchaToken(token); // Set the token when reCAPTCHA is completed
  };

  const isFormValid = isCheckboxChecked && recaptchaToken; 

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-header">Sign In</h1>
        <form onSubmit={handleLogin}>
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
              onChange={(e) => setIsCheckboxChecked(e.target.checked)}
            />
            <label htmlFor="checkbox" className="form-check-label">
              I agree to the terms and conditions
            </label>
          </div>
          {/* reCAPTCHA v3 */}
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
            onChange={onRecaptchaChange}
          />
          <button
            type="submit"
            className={`btn w-100 ${isFormValid ? 'btn-primary' : 'btn-secondary'}`}
            disabled={!isFormValid} // Disable button if form is not valid
          >
            Submit
          </button>
        </form>
        <div className="mt-3 text-center">
          <p>
            Don’t have an account?{' '}
            <span className="auth-link" onClick={() => navigate("/signup")}>
              Sign Up
            </span>
          </p>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default SignIn;
