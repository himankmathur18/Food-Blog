const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
};

module.exports = connectDb;
