import dotenv from "dotenv";
dotenv.config({ path: '../.env'});

import connectDB, {app} from "./config.js";




app.get("/", (req, res) => {
  res.send("Hello, World!");
});

connectDB();


