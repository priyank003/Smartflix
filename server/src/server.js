const http = require("http");

require("dotenv").config();

const app = require("./app");
const { loadUserData } = require("./models/user/user.model");
const { mongoConnect } = require("./services/mongo");
const USER_MOCK_DATA = require("../data/user_mock_data.json");
const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();
  await loadUserData(USER_MOCK_DATA);

  server.listen(PORT, () => {
    console.log(`SERVER LISTENING ON PORT ${PORT}`);
  });
}

startServer();
