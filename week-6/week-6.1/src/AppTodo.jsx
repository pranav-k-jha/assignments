import React, { useState } from "react";
// import Header, { HeaderWithButton } from "./components/Header.jsx";
const allTodos = [
  { id: 1, title: "Task 1", description: "Description for Task 1" },
  { id: 2, title: "Task 2", description: "Description for Task 2" },
  { id: 3, title: "Task 3", description: "Description for Task 3" },
];
let counter = 4;

function App() {
  const [todos, setTodos] = useState(allTodos);

  function addTodo() {
    setTodos([
      ...todos,
      {
        id: counter++,
        title: Math.random(),
        description: Math.random(),
      },
    ]);
  }

  return (
    <div>
      <button onClick={addTodo}>Add a todo</button>
      {todos.map((todo) => (
        <Todo key={todo.id} title={todo.title} description={todo.description} />
      ))}
    </div>
  );
}

function Todo({ title, description }) {
  return (
    <div>
      <h1>{title}</h1>
      <h5>{description}</h5>
    </div>
  );
}

export default App;
