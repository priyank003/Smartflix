const user = require("./user.mongo");
const { v4: uuidv4 } = require("uuid");

async function addNewUser(data) {
  try {
    await user.create([
      {
        name: data.name,
        email: data.email,
        password: data.password,
        isLoggedIn: true,
        id: uuidv4(),
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
