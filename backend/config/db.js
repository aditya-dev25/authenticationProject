const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    let dbURI;
    if (process.env.NODE_ENV === 'production'){
      dbURI = process.env.MONGODB_URI_PROD;
    }  else{
      dbURI = process.env.MONGODB_URI_DEV;
    }

    await mongoose.connect(dbURI);
    console.log('MongoDB connected...');
    
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit process with failure code
  }
};

module.exports = connectDB;
