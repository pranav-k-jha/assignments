const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

const todos = [
  {
    id: 1,
    title: "Todo 1",
    descripton: "This is todo 1",
    completed: false,
  },
  {
    id: 2,
    title: "Todo 2",
    descripton: "This is todo 2",
    completed: false,
  },
  {
    id: 3,
    title: "Todo 3",
    descripton: "This is todo 3",
    completed: false,
  },
  {
    id: 4,
    title: "Todo 4",
    descripton: "This is todo 4",
    completed: false,
  },
  {
    id: 5,
    title: "Todo 5",
    descripton: "This is todo 5",
    completed: false,
  },
];

app.get("/todos", (req, res) => {
  const randomTodos = [];
  for (let i = 0; i < 5; i++) {
    if (Math.random() > 0.5) {
      randomTodos.push(todos[i]);
    }
  }
  res.json({
    todos: randomTodos,
  });
});

app.get("/sum", (req, res) => {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);

  if (isNaN(a) || isNaN(b)) {
    res
      .status(400)
      .send("Invalid input: Both 'a' and 'b' should be valid integers");
  } else {
    const sum = a + b;
    res.send(sum.toString());
  }
});

app.get("/interest", (req, res) => {
  const principal = parseInt(req.query.principal);
  const rate = parseInt(req.query.rate);
  const time = parseInt(req.query.time);
  const interest = (principal * rate * time) / 100;
  const total = principal + interest;
  res.send({
    total: total,
    interest: interest,
  });
});

app.listen(8080);




