const user = require("./user.mongo");
const { v4: uuidv4 } = require("uuid");

let userId = 0;

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

module.exports = {
  addNewUser,
  setLogout,
};
