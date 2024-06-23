const jwt = require("jsonwebtoken");
require("dotenv").config();

// const client = require("../redis/redisClient");

const allTokens = [];

const jwtAuthMiddleware = (req, resp, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) return resp.status(401).json({ error: "unauthorized" });

  const token = req.headers.authorization.split(" ")[1];
  if (!token) return resp.status(401).json({ message: "Token not found" });

  try {
    if (!allTokens.includes(token)) {
      return resp
        .status(400)
        .json({ message: "Login again to see all this data" });
    }

    //getting tokens from redis
    // client.get(token, (err, reply) => {
    //   if (err) {
    //     console.log("Redis error: ", err);
    //     return resp.status(500).json({ error: "Internal Server error" });
    //   }
    //   if (reply === null) {
    //     return resp
    //       .status(400)
    //       .json({ message: "Login again to see the Response" });
    //   }
    // });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    req.token = token;
    next();
  } catch (err) {
    console.log(err);
    resp.status(401).json({ error: "Invalid token" });
  }
};

const generateToken = (userData) => {
  const newToken = jwt.sign({ userData }, process.env.JWT_SECRET);
  allTokens.push(newToken);

  // if (client.status !== "ready") {
  //   console.log("eeror yhin hai");
  //   throw new Error("Redis client is not ready");
  // }
  // client.set(newToken, "valid", "Ex", 3600, (err) => {
  //   if (err) {
  //     console.error("Error setting token in Redis:", err);
  //   } else {
  //     console.log("Token stored in Redis");
  //   }
  // });
  // console.log("Token stored in Redis:", newToken);
  return newToken;
};

const removeToken = (req, resp) => {
  const token = req.token;

  const index = allTokens.indexOf(token);
  if (index != -1) {
    allTokens.splice(index, 1);
  }

  // client.del(token, (err, reply) => {
  //   if (err) {
  //     console.log("Redis err:", err);
  //     return resp.status(500).json({ message: "Internal server error" });
  //   }
  //   if (reply === 1) {
  //     console.log("Token removed from Redis:", token);
  //     return resp.status(200).json({ message: "Logged out successfully" });
  //   } else {
  //     return resp.status(400).json({ message: "Token not found in Redis" });
  //   }
  // });

  console.log(allTokens);
  return resp.status(200).json({ message: "log out successfully" });
};

module.exports = { jwtAuthMiddleware, generateToken, removeToken };
