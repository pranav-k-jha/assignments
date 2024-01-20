const request = require("supertest");
const assert = require("assert");
const express = require("express");
const app = express();
const port = 3000;
// You have been given an express server which has a few endpoints.
// Your task is to create a global middleware (app.use) which will
// rate limit the requests from a user to only 5 request per second
// If a user sends more than 5 requests in a single second, the server
// should block them with a 404.
// User will be sending in their user id in the header as 'user-id'
// You have been given a numberOfRequestsForUser object to start off with which
// clears every one second

let numberOfRequestsForUser = {};
setInterval(() => {
  numberOfRequestsForUser = {};
}, 5000);
app.use((req, res, next) => {
  const userId = req.headers["user-id"];
  if (numberOfRequestsForUser[userId]) {
    numberOfRequestsForUser[userId]++;
    if (numberOfRequestsForUser[userId] > 5) {
      res.status(404).send("Error");
    }
  } else {
    numberOfRequestsForUser[userId] = 1;
    next();
  }
});

// app.use((req, res, next) => {
//   const userId = req.headers["user-id"];

//   if (
//     userId &&
//     numberOfRequestsForUser[userId] &&
//     numberOfRequestsForUser[userId] > 5
//   ) {
//     numberOfRequestsForUser = {};
//     return res
//       .status(404)
//       .send("Maximum 5 requests per second allowed per user");
//   }
//   numberOfRequestsForUser[userId] = (numberOfRequestsForUser[userId] || 0) + 1;
//   console.log("Number of requests:", numberOfRequestsForUser);

//   next();
// });

app.get("/user", function (req, res) {
  res.status(200).json({ name: "john" });
});

app.post("/user", function (req, res) {
  res.status(200).json({ msg: "created dummy user" });
});

app.listen(3000, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
