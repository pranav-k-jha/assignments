import React, { useState } from "react";
const allTodos = [
  { id: 1, title: "Task 1", description: "Description for Task 1" },
  { id: 2, title: "Task 2", description: "Description for Task 2" },
  { id: 3, title: "Task 3", description: "Description for Task 3" },
];
let counter = 4;

const App = () => {
  const [todos, setTodos] = useState(allTodos);

  const addTodo = () => {
    setTodos([
      ...todos,
      { id: counter++, title: "Hello", description: "World" },
    ]);
  };

  return (
    <div>
      <button onClick={addTodo}>Add Todo</button>
      {todos.map((todo) => (
        <Todo key={todo.id} title={todo.title} description={todo.description} />
      ))}
    </div>
  );
};

const Todo = ({ title, description }) => {
  return (
    <div>
      <h1>{title}</h1>
      <h5>{description}</h5>
    </div>
  );
};

export default App;
