const students = require("../models/students");

const studentDb = async (email) => students.findOne({ email });

module.exports = studentDb;
