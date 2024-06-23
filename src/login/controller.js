const bcrypt = require("bcrypt");
const studentDb = require("./query");
const { generateToken } = require("../jwt/jwt");

const studentLogin = async (req, resp) => {
  // try {
  const { email, password } = req.body;
  const student = await studentDb(email);
  if (!student || !(await bcrypt.compare(password, student.password))) {
    return resp.status(401).json({ error: "Invalid username or password" });
  }
  //generate token
  const payload = {
    id: student.id,
    name: student.name,
  };
  const token = generateToken(payload);

  resp.json({ token });
  // } catch (err) {
  //   resp.status(500).json({ message: "Internal serve error", error: err });
  // }
};

module.exports = { studentLogin };
