const http = require("http");
const app = require("./app");

const { mongoConnect } = require("./services/mongo");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();

  server.listen(PORT, () => {
    console.log(`LISTENING ON PORT ${PORT}`);
  });
}

startServer();
