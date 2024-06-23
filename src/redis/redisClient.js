const redis = require("redis");
require("dotenv").config();

const client = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  password: process.env.REDIS_PASSWORD || undefined,
});

client.on("error", (err) => {
  console.log("Redis error", err);
});

client.on("connect", () => {
  console.log("Connected to Redis");
});

client.on("ready", () => {
  console.log("Redis client is ready");
});

client.on("end", () => {
  console.log("Redis client disconnected");
});

module.exports = client;
