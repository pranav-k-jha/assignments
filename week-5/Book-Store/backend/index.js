import connectDB, { app } from "./config.js";
import express from "express";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors"

app.use(express.json());
app.get("/", (req, res) => {
  res.status(234).send("Welcome to MERN Stack");
});

app.use("/books", booksRoute);

//option 1: Allow all origins with default of cors(*)
app.use(cors());
//option 2: Allow custom origins
// app.use(
//   cors({
//     origin: "http://localhost:5555",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

connectDB();
