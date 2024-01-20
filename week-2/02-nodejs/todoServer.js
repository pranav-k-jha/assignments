const express = require("express");
// const { v4: uuidv4 } = require("uuid");
const fs = require("fs").promises;

// const port = 3000;
const app = express();

app.use(express.json());

function findItemById(id) {
  return todoItems.find((item) => item.id === id);
}

let todoItems = [];

//reading the file
async function readDataFromFile() {
  try {
    const data = await fs.readFile("todos.json", "utf-8");
    todoItems = JSON.parse(data);
    // console.log("data from json file", todoItems);
    // console.log("Successfully loaded data from file");
  } catch (error) {
    console.error("Error reading data from file:", error);
  }
}
readDataFromFile();

app.get("/todos", (req, res) => {
  res.status(200).json(todoItems);
});

app.get("/todos/:id", (req, res) => {
  const id = Number(req.params.id); // Use req.params to get the parameter from the URL
  let todoItem = null;

  for (let i = 0; i < todoItems.length; i++) {
    if (id === todoItems[i].id) {
      todoItem = todoItems[i];
      break; // Break out of the loop once the item is found
    }
  }

  if (todoItem) {
    // If the item is found, respond with the specific item
    res.status(200).json(todoItem);
  } else {
    // If the item is not found, respond with an error message
    res.status(404).json({ message: "Todo item not found" });
  }
});

app.post("/addItem", async (req, res) => {
  const id = Math.floor(Math.random() * 1000000);
  const { title, description } = req.body;
  const newItem = { id, title, description };

  todoItems.push(newItem);

  try {
    await fs.writeFile(
      "todos.json",
      JSON.stringify(todoItems, null, 2),
      "utf-8"
    );
    res.status(201).json({ message: "Successfully added data", id });
  } catch (error) {
    console.error("Error writing to file:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.put("/todos/:id", async (req, res) => {
  const id = Number(req.params.id);
  const existingItem = findItemById(id);

  if (!existingItem) {
    return res.status(404).json({ message: "Todo item not found" });
  }

  existingItem.title = req.body.title;
  existingItem.description = req.body.description;

  await fs.writeFile("todos.json", JSON.stringify(todoItems, null, 2), "utf-8");

  res.status(200).json({
    message: "Successfully updated data",
    updatedItem: existingItem,
    todoItems,
  });
});

app.delete("/todos/:id", async (req, res) => {
  const id = Number(req.params.id);
  const index = todoItems.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Todo item not found" });
  }

  const deletedItem = todoItems.splice(index, 1)[0];

  await fs.writeFile("todos.json", JSON.stringify(todoItems, null, 2), "utf-8");

  res.status(200).json({ message: "Successfully deleted data", deletedItem });
});

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

// Middleware for handling undefined routes
app.use((req, res, next) => {
  res.status(404).json({ message: "Error 404! Not Found" });
});
module.exports = app;
