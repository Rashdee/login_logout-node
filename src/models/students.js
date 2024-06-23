const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  class_no: { type: String, required: true },
  parents_name: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
});

studentSchema.pre("save", async function (next) {
  const student = this;
  console.log("pre-save hook triggered in student db");
  if (!student.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(student.password, salt);
    student.password = hash;
    console.log("student.password", student.password);
    next();
  } catch (err) {
    console.log("error occured in student db");
    next(err);
  }
});

module.exports = mongoose.model("students", studentSchema);
