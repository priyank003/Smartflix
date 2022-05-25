const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  ip_address: {
    type: String,
    required: true,
  },
  is_loggedIn: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("user", userSchema);
