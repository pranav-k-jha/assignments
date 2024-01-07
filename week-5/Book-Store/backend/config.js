import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import mongoose from "mongoose";
import express from "express";

const PORT = process.env.PORT || 3000;
const app = express();
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`App connected to Database ${conn.connection.host} `);
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1); //passing 1 - will exit the proccess with error
  }
};

export default connectDB;
export { app };
