require("dotenv").config();
const { Admin } = require("../db/index");
const jwt = require("jsonwebtoken");
const mySecret = process.env['JWT_SECRET'];

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization && authorization.split(" ")[1]; // Extract token from 'Bearer <token>'

  const decodedToken = jwt.verify(token, mySecret);
  const admin = await Admin.findOne({ username: decodedToken.username });
  if (!admin) {
    res.status(401).json({ error: "Unauthorized" });
  }
  else{
    next();
  }
}

module.exports = adminMiddleware;
