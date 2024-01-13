import React, { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setInterval(() => {
      fetch("https://sum-server.100xdevs.com/todos").then(async (res) => {
        const json = await res.json();
        setTodos(json.todos);
      });
    }, 10000);
  }, []);

  // const [todos, setTodos] = useState([
  //   {
  //     id: 1,
  //     title: "Go to Gym",
  //     description: "at 4pm",
  //   },
  //   {
  //     id: 2,
  //     title: "Go to Shop",
  //     description: "at 3pm",
  //   },
  //   {
  //     id: 3,
  //     title: "Go to Market",
  //     description: "at 5pm",
  //   },
  // ]);

  // function addTodo() {
  //   setTodos([
  //     ...todos,
  //     {
  //       id: counter++,
  //       title: Math.random(),
  //       description: Math.random(),
  //     },
  //   ]);
  // }

  return (
    <div>
      {/* <button onClick={addTodo}>Add a todo</button> */}
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

// function CardWrapper({ children }) {
//   return (
//     <div style={{ border: "2px solid black", padding: 20 }}>{children}</div>
//   );
// }

// function TextComponent() {
//   return <div>
//     "Hello World"
//   </div>;
// }

export default App;
