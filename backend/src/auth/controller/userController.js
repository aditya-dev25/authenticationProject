const express = require('express');
const User = require('../models/user');  // Path to your User model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    console.error('Error during user signup:', error); // Log the error with context
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});



// POST /login - User login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validate request body
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide both email and password.' });
  }

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Check if the password matches
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Token validity
    );

    // Send the token in the response
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
