const express = require('express');
const connectDB = require('./config/db'); // Import the DB config
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Example route
app.get('/', (req, res) => {
  res.send('Server is running and connected to MongoDB!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
