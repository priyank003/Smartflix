const axios = require("axios").default;
const user = require("../../models/user/user.mongo");

const BASE_REC_URL = "http://localhost:9000";

const {
  addNewUser,
  setLogout,
  getUserId,
} = require("../../models/user/user.model");

async function httpSigninUser(req, res) {
  const userData = req.body;

  try {
    await user.updateOne(
      {
        email: userData.email,
        password: userData.password,
      },
      {
        is_loggedIn: true,
      },
      {
        upsert: true,
      }
    );
  } catch (err) {
    console.log(`Could not log in the user ${err}`);
  }

  // const userId = 100;

  // await axios.get(`${BASE_URL}/prep/:${userId}`);

  // addNewUser(userData);

  res.status(200).json({
    userData,
  });
}

async function httpUserRecPrep(req, res) {
  const userData = req.body;

  const userId = await getUserId(userData);

  try {
    await axios.get(`${BASE_REC_URL}/prep/${userId}`);
  } catch (err) {
    console.log(err);
  }

  return res.status(200).json({
    message: "ok",
    userId: userId,
  });
}

async function httpLogoutUser(req, res) {
  const userData = req.body;

  try {
    await user.updateOne(
      {
        email: userData.email,
        is_loggedIn: true,
      },
      {
        is_loggedIn: false,
      },
      {
        upsert: true,
      }
    );
  } catch (err) {
    console.log(`Could not log out  the user ${err}`);
  }

  // setLogout(userData);

  res.status(200).json({
    userData,
  });
}

module.exports = {
  httpSigninUser,
  httpLogoutUser,
  httpUserRecPrep,
};
