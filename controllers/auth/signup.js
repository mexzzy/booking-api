const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../../models/userSchema.js");
const dotenv = require("dotenv").config();

const jwtSecretKey = process.env.MY_SECRET_JWT;

const signup = async (req, res) => {
  const { username, email, phoneNumber, gender, password, confirmPassword } =
    req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (phoneNumber.length !== 11) {
      return res
        .status(400)
        .json({ message: "Phone number must be 11 digits" });
    }

    const newUser = new User({
      username,
      email,
      phoneNumber,
      gender,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      jwtSecretKey,
      { expiresIn: "2h" }
    );

    return res
      .status(201)
      .json({ id: newUser._id, message: "Signup successful", token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = signup;
