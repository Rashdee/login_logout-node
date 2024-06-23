const express = require("express");
const login = express.Router();
const { studentLogin } = require("./controller");

login.post("/student", studentLogin);

module.exports = login;
