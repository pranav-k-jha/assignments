import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

let countId = 1;

function markDone(id) {
  const button = document.getElementById(`button ${id}`);
  button.innerHTML = "Done";
  const ul = document.getElementById(`${id}`);
  ul.setAttribute("className", "done");
}

function createChild(title, description, countId) {
  
  const para = document.getElementById("added");
  para.innerHTML = "Added ToDo Items";

  const childUl = document.createElement("ul");
  childUl.setAttribute("id", `${countId}`);
  childUl.innerHTML = title;

  const childLi = document.createElement("li");
  childLi.innerHTML = description;

  const button = document.createElement("button");
  button.innerHTML = "Mark as Done";
  button.setAttribute("id", `button ${countId}`);
  button.setAttribute(`onClick`, `markDone(${countId})`);


  console.log(countId);

  childUl.appendChild(childLi);
  childUl.appendChild(button);

  console.log(button);

  return childUl;


}

function addToDo() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const parent = document.getElementById("addedItems");

  parent.appendChild(createChild(title, description, countId));
  countId++;
  console.log(parent);
}




function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="container">
      <div className="todoItem">
        <input id="title" type="text" placeholder="Enter title ..." />
        <input
          id="description"
          type="text"
          placeholder="Enter description ..."
        />
        <button onClick={addToDo} className="button" type="submit">
          Add
        </button>
        <br />
        <p id="added">
          <b> </b>
        </p>
        <div className="addedItems" id="addedItems"></div>
      </div>
    </div>
  );
}

export default App;
