const express = require("express");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs").promises;

const port = 3000;

const app = express();

app.use(express.json());

let todoItems = [];

// Load existing todoItems from file on server start
fs.readFile("todoItems.json", "utf-8")
  .then((data) => {
    todoItems = JSON.parse(data);
    console.log("Data loaded from file.");
  })
  .catch((error) => {
    console.error("Error loading data from file:", error);
  });

app.get("/todos", (req, res) => {
  res.status(200).json(todoItems);
});

app.post("/addItem", async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const id = uuidv4(); // Generate a unique ID
  const newItem = { id, title, description };

  todoItems.push(newItem);

  // Save todoItems to file after adding a new item
  await fs.writeFile("todoItems.json", JSON.stringify(todoItems, null, 2), "utf-8");

  console.log(newItem);
  res.status(200).json(todoItems);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
