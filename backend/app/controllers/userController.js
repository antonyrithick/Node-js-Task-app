const User = require("../models/employee");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  try {
    const { role, username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      role,
      username,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User Created Successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Creating User", error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { role, username, password } = req.body;

    if (!role || !username || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const user = await User.findOne({ where: { username, role } });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found or role mismatch!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(200).json({
      message: "Login successful!",
      token,
      user: { id: user.id, username: user.username, role: user.role },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error!" });
  }
};

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await User.findAll({
      where: { role: "employee" },
    });

    if (!employees.length) {
      return res.status(404).json({ message: "No employees found!" });
    }

    res.status(200).json({ employees });
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Server error!" });
  }
};
