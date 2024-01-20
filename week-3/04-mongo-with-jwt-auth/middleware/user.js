require("dotenv").config();
const jwt = require("jsonwebtoken");
const mySecret = process.env["JWT_SECRET"];
const { User } = require("../db/index");


async function userMiddleware(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization && authorization.split(" ")[1]; // Extract token from 'Bearer <token>'

  const decodedToken = jwt.verify(token, mySecret);
  const user = await User.findOne({ username: decodedToken.username });
  if (!user) {
    res.status(401).json({ error: "Unauthorized" });
  } else {
    req.username = decodedToken.username;
    req.user = user;
    next();
  }
}

module.exports = userMiddleware;
