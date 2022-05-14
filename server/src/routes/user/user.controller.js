const { addNewUser, setLogout } = require("../../models/user.model");

async function httpAddNewUser(req, res) {
  const userData = req.body;

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
