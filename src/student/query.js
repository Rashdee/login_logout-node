const bcrypt = require("bcrypt");
const students = require("../models/students");

const saveStudentDb = async (data) => await data.save();

const getAllStudentsDb = async () => await students.find({ isDeleted: false });

const updateStudentDb = async (_id, dummyData) => {
  if (dummyData.password) {
    const salt = await bcrypt.genSalt(10);
    dummyData.password = await bcrypt.hash(dummyData.password, salt);
  }
  return await students.findByIdAndUpdate({ _id }, dummyData);
};
module.exports = { saveStudentDb, getAllStudentsDb, updateStudentDb };
