const app = require("./app");

const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});
app.set("io", io);

const PORT = process.env.PORT;
server.listen(PORT, () =>
  console.log(`server + socket is running on port, ${PORT}`)
);
