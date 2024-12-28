const express = require('express');
const connectDB = require('./config/db'); // Import the DB config
const cors = require('cors');
require('dotenv').config();
const userRoutes = require('./src/auth/controller/userController'); // Path to userController

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded bodies

// Connect to MongoDB
connectDB();

// Enable CORS for all origins (you can restrict it to specific origins if needed)
app.use(cors());

// Routes
app.use("/api/users", userRoutes);

// Example route
app.get('/', (req, res) => {
  res.send('Server is running and connected to MongoDB!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});