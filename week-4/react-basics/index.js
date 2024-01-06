let countId = 1;

function markDone(id) {
  const button = document.getElementById(`button ${id}`);
  button.innerHTML = "Done";
  ul = document.getElementById(id);
  ul.setAttribute("class", "done");
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
  button.setAttribute("onclick", `markDone(${countId})`);

  childUl.appendChild(childLi);
  childUl.appendChild(button);

  console.log(button);

  return childUl;

  // document.getElementById("addedItems").appendChild(ul).appendChild(li);
  // document.getElementById("addedItems").appendChild(button);
}

function addToDo() {
  title = document.getElementById("title").value;
  description = document.getElementById("description").value;
  const parent = document.getElementById("addedItems");

  parent.appendChild(createChild(title, description, countId++));
  console.log(parent);
}
