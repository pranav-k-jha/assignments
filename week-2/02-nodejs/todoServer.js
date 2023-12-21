const express = require("express");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs").promises;

const port = 3000;
const app = express();
app.use(express.json());

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
  const id = req.params.id;
  let todoItem = null;

  // for (let i = 0; i < todoItems.length; i++) {
  //   if (id === todoItems[i].id) {
  //     todoItem = todoItems[i];
  //     break; // Break out of the loop once a matching item is found
  //   }
  // }

  todoItems.forEach((item) => {
    if (id === item.id) {
      todoItem = item;
    }
  });
  console.log(todoItem);
  if (todoItem) {
    res.status(200).json(todoItem);
  } else {
    res.status(404).json({ error: "Todo item not found" });
  }
});

app.post("/addItem", async (req, res) => {
  const id = uuidv4();
  const title = req.body.title;
  const description = req.body.description;
  const newItem = { id, title, description };

  /*
  PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
  */

  todoItems.push(newItem);
  // console.log("new item added is: ", newItem);
  // console.log("pushed newItem to todoItems:", todoItems);

  await fs.writeFile("todos.json", JSON.stringify(todoItems, null, 2), "utf-8");
  res.status(200).json("Successfully added data!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
