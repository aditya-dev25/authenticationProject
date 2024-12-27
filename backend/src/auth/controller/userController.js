const express = require('express');
const User = require('../models/user');  // Path to your User model
const bcrypt = require('bcryptjs');

const router = express.Router();

// POST /signup - User signup
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide both email and password.' });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already in use.' });
    }

    // Create a new user
    const newUser = new User({
      email,
      password, // Password will be hashed in the User model
    });

    // Save the new user to the database
    await newUser.save();

    // Send a success response
    res.status(201).json({ message: 'User created successfully.' });
  } catch (error) {
    // Handle any errors during the signup process
    console.error(error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
