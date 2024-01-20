/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
  constructor() {
    this.todos = [];
  }

  add(todo) {
    this.todos.push(todo);
  }

  remove(index) {
    if(index>=0 && index< this.todos.length){

    this.todos.splice(index, 1);
  }
}

  update(index, updatedTodo) {
    if(index>=0 && index< this.todos.length){
      this.todos[index] = updatedTodo;
    }
  }
  getAll() {
    return this.todos;
  }
  get(index) {
    return index >=0 && index < this.todos.length ? this.todos[index] : null;
  }
  clear() {
    this.todos = [];
  }
}

// Create a new instance of the Todo class
const todoList = new Todo();

// Add some todos
todoList.add("Complete assignment");
todoList.add("Read a book");
todoList.add("Go for a run");

// Display all todos
console.log("All todos:", todoList.getAll());

// Get the todo at index 1
const todoAtIndex1 = todoList.get(1);
console.log("Todo at index 1:", todoAtIndex1);

// Update the todo at index 0
todoList.update(0, "Finish coding exercise");

// Display all todos after update
console.log("All todos after update:", todoList.getAll());

// Remove the todo at index 2
todoList.remove(2);

// Display all todos after removal
console.log("All todos after removal:", todoList.getAll());

// Clear all todos
todoList.clear();

// Display all todos after clearing
console.log("All todos after clearing:", todoList.getAll());


module.exports = Todo;
