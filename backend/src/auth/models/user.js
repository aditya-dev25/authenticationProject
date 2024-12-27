const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Create the schema for the User
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true, // Ensure email is unique
      trim: true,
      lowercase: true, // Store emails in lowercase
      match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Please enter a valid email address'], // Email regex validation
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Password should be at least 6 characters long
      match: [
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!$%^&*?])[A-Za-z\d!$%^&*?]{6,}$/, // Password regex: at least 1 letter, 1 number, and 1 special character
        'Password must be at least 6 characters long and include at least one letter, one number, and one special character.',
      ],
    },
    createdAt: {
      type: Date,
      default: Date.now, // Default to current date
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Hash the password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password (for login)
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create the model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
