import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import ReCAPTCHA from 'react-google-recaptcha';
import 'react-toastify/dist/ReactToastify.css';
import './Auth.css'; // Use the updated shared CSS file

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [showRedirectMessage, setShowRedirectMessage] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(""); // reCAPTCHA token
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recaptchaToken) {
      toast.error('Please complete the reCAPTCHA verification.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/signup', { email, password, recaptchaToken });
      toast.success(response.data.message);
      setShowRedirectMessage(true);
      setTimeout(() => navigate("/signin"), 3000); // Redirect after 3 seconds
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error('User already exists. Redirecting to Sign In...');
        setTimeout(() => navigate("/signin"), 3000); // Redirect after 3 seconds
      } else {
        toast.error(error.response?.data?.message || 'Signup failed.');
      }

      
    }
  };

  const onRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  const isFormValid = isCheckboxChecked && recaptchaToken;

  return (
    <div className="auth-container">
      <div className="auth-box">
        {!showRedirectMessage ? (
          <>
            <h1 className="auth-header">Sign Up</h1>
            <form onSubmit={handleSubmit}>
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
                  minLength="6"
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
                Already have an account?{' '}
                <span className="auth-link" onClick={() => navigate("/signin")}>
                  Sign In
                </span>
              </p>
            </div>
          </>
        ) : (
          <div className="redirect-box">
            <h3>Signup Successful!</h3>
            <p>Redirecting to the Login page...</p>
          </div>
        )}
        <ToastContainer />
      </div>
    </div>
  );
};

export default SignUp;
