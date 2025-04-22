const mongoose = require('mongoose');

// Define schema for user
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
