const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isLoggedIn: {
    type: Boolean,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("user", userSchema);
