const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const jwtSecretKey = process.env.MY_SECRET_JWT;

const checkAuth = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];


  if (!token) {
    return res.status(401).json({ message: "Unauthorized - Missing token" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecretKey);
    const userId = decoded.userId;

    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};

module.exports = checkAuth;
