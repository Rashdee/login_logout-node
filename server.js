const express = require("express");
require("./src/models/connection");
require("dotenv").config;
const client = require("./src/redis/redisClient");
const studentRouter = require("./src/student/routes");
const login = require("./src/login/routes");
const logout = require("./src/logout/routes");

const app = express();
app.use(express.json());

app.use("/student", studentRouter);

app.use("/login", login);

app.use("/logout", logout);

// client
//   .connect()
//   .then(() => {
//     console.log("Redis client connected and ready");

// Start your server here
app.listen(8010, () => {
  console.log(`Server is running on port ${8010}`);
});
// })
// .catch((err) => {
//   console.error("Failed to connect to Redis:", err);
//   process.exit(1); // Exit process if Redis connection fails
// });
