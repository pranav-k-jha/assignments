const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs").promises;

const port = 3000;
const app = express();
app.use(bodyParser.json());

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
  const id = req.params.id; // Use req.params to get the parameter from the URL
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
  const id = uuidv4();
  const { title, description } = req.body;
  const newItem = { id, title, description };

  todoItems.push(newItem);

  try {
    await fs.writeFile("todos.json", JSON.stringify(todoItems, null, 2), "utf-8");
    res.status(201).json({ message: "Successfully added data", id });
  } catch (error) {
    console.error("Error writing to file:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


app.put("/todos/:id", async (req, res) => {
  const id = req.params.id;
  let updatedItem = null;

  for (let i = 0; i < todoItems.length; i++) {
    if (id === todoItems[i].id) {
      console.log("older item", todoItems[i]);
      todoItems[i].title = req.body.title;
      todoItems[i].description = req.body.description;
      updatedItem = todoItems[i]; // Assign the updated item
      break;
    }
  }
  await fs.writeFile("todos.json", JSON.stringify(todoItems, null, 2), "utf-8");
  console.log("updated item:", updatedItem);
  res
    .status(200)
    .json({ message: "Successfully added data", updatedItem, todoItems });
});

app.delete("/todos/:id", async (req, res) => {
  const id = req.params.id;
  let deletedItem = null;

  for (let i = 0; i < todoItems.length; i++) {
    if (id === todoItems[i].id) {
      // Capture the deleted item
      deletedItem = todoItems[i];
      // Use the splice method to remove the item at index i
      todoItems.splice(i, 1);
      break;
    }
  }

  // Update the "todos.json" file with the modified todoItems
  await fs.writeFile("todos.json", JSON.stringify(todoItems, null, 2), "utf-8");

  if (deletedItem) {
    console.log("deleted successfully:", deletedItem);
    // Respond with the deleted item
    res.status(200).json(deletedItem);
  } else {
    console.log("Item not found");
    // Respond with an error message
    res.status(404).json({ message: "Item not found" });
  }
});

// Middleware for handling undefined routes
app.use((req, res) => {
  res.status(404).json({ message: "Error 404! Not Found" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
