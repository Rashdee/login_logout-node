const express = require("express");
const { jwtAuthMiddleware } = require("../jwt/jwt");
const students = require("../models/students");

const studentRouter = express.Router();
const {
  createStudent,
  getStudents,
  updateStudent,
  deleteStudent,
} = require("./controller");

studentRouter.post("/createStudent", createStudent);

studentRouter.get("/getStudents", jwtAuthMiddleware, getStudents);

//its for chech which user is login?
studentRouter.get("/profile", jwtAuthMiddleware, async (req, resp) => {
  try {
    const studentData = req.user.userData;
    console.log("user data:", studentData);

    const studentId = studentData.id;
    console.log("studentId", studentId);
    const student = await students.findById(studentId);

    console.log("student in profile", student);

    resp.status(200).json({ student });
  } catch (err) {
    console.log(err);
    resp.status(500).json({ message: "internal server error", error: err });
  }
});

studentRouter.put("/updateStudent", updateStudent);

studentRouter.put("/deleteStudent", deleteStudent);

module.exports = studentRouter;
