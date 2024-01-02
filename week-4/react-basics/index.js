let count = 0;
function addToDo() {
  title = document.getElementById("title").value;
  description = document.getElementById("description").value;
  const p = document.getElementById("added");
  p.innerHTML = "Added ToDo Items";
  
  const ul = document.createElement("ul");
  const li = document.createElement("li");
  const button = document.createElement("button");
  button.innerHTML = "Mark as Done";
  button.setAttribute("id", `button ${count}`);
  ul.setAttribute("id", `ul ${count}`);
  button.setAttribute("onclick", `markDone(${count})`);
  console.log(button);
  ul.innerHTML = title;

  li.innerHTML = description;

  document.getElementById("addedItems").appendChild(ul).appendChild(li);
  document.getElementById("addedItems").appendChild(button);

  console.log(document.getElementById("addedItems"));
  count++;
}

function markDone(id) {
  const button = document.getElementById(`button ${id}`);
  button.innerHTML = "Done";
  ul = document.getElementById(`ul ${id}`);
  ul.setAttribute("class", "done");
}
