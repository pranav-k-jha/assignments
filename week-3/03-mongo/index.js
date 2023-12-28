const express = require("express");
const bodyParser = require("body-parser");
const app = express();
// const adminRouter = require("./routes/admin");
// const userRouter = require("./routes/user");
const mongoose = require("mongoose");



/* Admin Routes:
POST /admin/signup Description: 
Creates a new admin account. Input Body: { username: 'admin', password: 'pass' } Output: { message: 'Admin created successfully' }

*/
// Middleware for parsing request bodies
app.use(bodyParser.json());
// app.use("/admin", adminRouter);
// app.use("/user", userRouter);

const PORT = 3000;

app.post("/admin/signup", (req, res) => {
  const adminSchema = new mongoose.Schema({
    username: String,
    password: String,
  });

  const adminModel = mongoose.model("Admin", adminSchema);

  const username = req.body.username;
  const password = req.body.password;

  const user1 = new adminModel({ username, password });

  user1.save();

  // Save the new admin to the database
  res.json({ message: "Admin created successfully" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
