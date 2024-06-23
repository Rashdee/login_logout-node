const students = require("../models/students");
const bcrypt = require("bcrypt");
const { saveStudentDb, getAllStudentsDb, updateStudentDb } = require("./query");
const { jwtAuthMiddleware, generateToken } = require("../jwt/jwt");

const createStudent = async (req, resp) => {
  try {
    console.log("hello", req.body);
    const { name, email, password, class_no, parents_name } = req.body;
    const data = new students({
      name,
      email,
      password,
      class_no,
      parents_name,
    });
    console.log("data", data);
    const result = await saveStudentDb(data);

    const payload = {
      id: result.id,
      name: result.name,
    };
    console.log("payload is:", payload);
    const token = generateToken(payload);

    resp.status(200).send({ response: result, token: token });
  } catch (err) {
    resp.status(500).send({ message: "internal server error", error: err });
  }
};

const getStudents = async (req, resp) => {
  try {
    const data = await getAllStudentsDb();
    if (!data) {
      return resp.status(400).send({ message: "Data not found" });
    }
    return resp.status(200).send({ message: "Data found successfully", data });
  } catch (err) {
    resp.status(500).send({ message: "Internal Sever Error", error: err });
  }
};

const updateStudent = async (req, resp) => {
  console.log("You are going to update student");
  try {
    let dummyData = {};

    if (req.body.name) {
      dummyData.name = req.body.name;
    }
    if (req.body.email) {
      dummyData.email = req.body.email;
    }
    if (req.body.password) {
      dummyData.password = req.body.password;
    }
    if (req.body.class_no) {
      dummyData.class_no = req.body.class_no;
    }
    if (req.body.parents_name) {
      dummyData.parents_name = req.body.parents_name;
    }
    const result = await updateStudentDb(req.body._id, dummyData);
    resp
      .status(200)
      .send({ message: "Student updated Successfully", data: result });
  } catch (err) {
    resp
      .status(500)
      .send({ message: "internal server error occurred", error: err });
  }
};

const deleteStudent = async (req, resp) => {
  try {
    const dummyData = {};
    dummyData.isDeleted = true;
    const result = await updateStudentDb(req.body._id, dummyData);
    resp
      .status(200)
      .send({ message: "student deleted successfully", data: result });
  } catch (err) {
    resp.status(500).send({ message: "internal Server error", error: err });
  }
};

module.exports = { createStudent, getStudents, updateStudent, deleteStudent };
