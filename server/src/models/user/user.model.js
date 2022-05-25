const user = require("./user.mongo");
const { v4: uuidv4 } = require("uuid");

async function loadUserData(data) {
  // console.log(data);
  // insert + update = upsert

  try {
    data.map(async (mock_user) => {
      await user.updateOne(
        {
          id: mock_user.id,
        },
        {
          id: mock_user.id,
          first_name: mock_user.first_name,
          last_name: mock_user.last_name,
          email: mock_user.email,
          password: generatePassword(),
          gender: mock_user.gender,
          ip_address: mock_user.ip_address,
          is_loggedIn: false,
        },
        {
          upsert: true,
        }
      );
    });
  } catch (err) {
    console.log(`Could not save user data ${err}`);
  }
}

async function addNewUser(data) {
  try {
    if (await user.exists({ id: userId })) {
      userId++;
    }
  } catch (err) {
    console.log(err);
  }

  try {
    await user.create([
      {
        name: data.name,
        email: data.email,
        password: data.password,
        isLoggedIn: true,
        id: userId,
      },
    ]);
  } catch (error) {
    console.log(error);
  }
}

async function setLogout(userData) {
  const userLogout = await user.updateOne(
    {
      email: userData.email,
    },
    {
      isLoggedIn: userData.isLoggedIn,
    }
  );

  return userLogout.modifiedCount === 1;
}

const getUserId = async (userData) => {
  try {
    const userRes = await user.find(
      {
        first_name: userData.name,
        // email: userData.email,
        // password: userData.password,
      },
      "id"
    );

    return userRes[0].id;
  } catch (err) {
    console.log(`Could not find userid ${err}`);
  }
};

//utilities

function generatePassword() {
  var length = 8,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

module.exports = {
  addNewUser,
  setLogout,
  loadUserData,
  getUserId,
};
