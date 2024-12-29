import React from 'react';
import './Home.css'; // Importing the CSS file

const Home = () => {
  return (
    <div className="home-container">
      <div className="welcome-section">
        <h1>Welcome to the Home Page</h1>
        <p>
          This is a basic home page for the MERN authentication project.
        </p>
      </div>

      <div className="info-section">
        <h2>About This Project</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ullamcorper, orci at convallis blandit, odio ante suscipit metus, ut lacinia ipsum nulla eu mauris. Curabitur tristique magna nec nunc ullamcorper, et hendrerit justo lacinia.
        </p>
        <p>
          Duis ut orci nec eros tempor mollis. Integer suscipit, justo et vulputate bibendum, orci erat feugiat nulla, sit amet tincidunt elit nulla id sapien. Curabitur viverra ex vitae neque venenatis fermentum. Nam ultricies mollis nulla, id gravida velit vulputate sed.
        </p>
      </div>

      <div className="features-section">
        <h2>Key Features</h2>
        <ul>
          <li>Simple User Authentication with JWT</li>
          <li>Responsive Design for Mobile & Desktop</li>
          <li>Secure Password Handling with bcrypt</li>
          <li>Integrated reCAPTCHA for security</li>
          <li>Toast Notifications for Success/Error</li>
        </ul>
      </div>

      <div className="footer">
        <p>&copy; 2024 AuthenticatorApp (MERN). All rights reserved.</p>
      </div>
    </div>
  );
};

export default Home;
