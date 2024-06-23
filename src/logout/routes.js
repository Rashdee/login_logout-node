const express = require("express");
const logout = express.Router();
const { jwtAuthMiddleware, removeToken } = require("../jwt/jwt");

logout.post("/", jwtAuthMiddleware, removeToken);

module.exports = logout;
