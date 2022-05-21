const axios = require("axios").default;

const BASE_URL = "http://localhost:9000";

const { addNewUser, setLogout } = require("../../models/user.model");

async function httpAddNewUser(req, res) {
  const userData = req.body;
  const userId = 100;

  await axios.get(`${BASE_URL}/prep/:${userId}`);

  addNewUser(userData);

  res.status(200).json({
    userData,
  });
}

async function httpLogoutUser(req, res) {
  const userData = req.body;
  setLogout(userData);

  res.status(200).json({
    userData,
  });
}

module.exports = {
  httpAddNewUser,
  httpLogoutUser,
};
