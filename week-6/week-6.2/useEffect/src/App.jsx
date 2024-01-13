import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const [buttonId, setButtonId] = useState(1);

  return (
    <div>
      <button
        onClick={function () {
          setButtonId(1);
        }}
      >
        1
      </button>
      <button
        onClick={function () {
          setButtonId(2);
        }}
      >
        2
      </button>
      <Todo id={setButtonId} />
    </div>
  );
}

function Todo({ id }) {
  const [todo, setTodo] = useState({});
  useEffect(() => {
    axios
      .get(`https://sum-server.100xdevs.com/todo?id=${id}`)
      .then((res) => setTodo(res.data.todo));
  }, [id]);

  return (
    <div>
      <h1>id: {id}</h1>

      <h1>{todo.title}</h1>
      <h2>{todo.description}</h2>
    </div>
  );
}

export default App;
