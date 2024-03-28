import './styles.css';
import * as storage from './StorageController.js';
import { createProject, createTodo } from './todos.js';

function ScreenController () {
  const todoForm = document.forms["new-todo-form"];
  const contentDiv = document.querySelector(".content");

  // load existing to-dos
  const updateTodos = function (project) {
    contentDiv.innerHTML = "";
    const todos = project.todos;
    
    for (let todo of todos) {
      const card = document.createElement("div");
      card.classList.add("todo-card");

      const cardTitle = document.createElement("h3");
      cardTitle.innerText = todo.title;
      card.appendChild(cardTitle);

      const cardDescription = document.createElement("p");
      cardDescription.innerText = todo.description;
      card.appendChild(cardDescription);

      contentDiv.appendChild(card);
    }
  }

  // Submit todos

  const submitTodo = function () {
    todoForm.reportValidity();
    var title = todoForm.title.value;
    var description = todoForm.description.value;
    var dueDate = todoForm.dueDate.value;
    var priority = todoForm.priority.value;
    let todo = createTodo(title, description, dueDate, priority);
    defaultProject.addTodo(todo);

    // clean up form and reload
    toggleForm();
    todoForm.reset();
    updateTodos(defaultProject);
  }

  // Open and close form for new to-dos

  const toggleForm = function () {
    todoForm.classList.toggle("open");
  }

  const initialize = function () {
    // Assign functions to buttons
    const addBtn = document.querySelector(".add-btn");
    addBtn.addEventListener("click", toggleForm);

    const cancelBtn = document.querySelector(".cancel-btn");
    cancelBtn.addEventListener("click", toggleForm);

    todoForm.addEventListener("submit", function(event) {
      event.preventDefault();
      submitTodo();
    });

    // Test storage controller
    if (!storage.storageAvailable("localStorage")) {
      alert("Local storage is disabled or not available. This website may not function correctly.");
    }
  }

  return {
    updateTodos,
    initialize,
  }
}

// TESTING
// Does this need to be in a separate initializing area?

let defaultProject = createProject("Default");

function log(text) {
  console.log(JSON.stringify(text));
}
log(defaultProject);
console.log(storage.readProject("Default"));

// console.log("delete todo");
// defaultProject.deleteTodo(2);
// console.log(storage.readProject("Default"));

// let testTodo = createTodo("Persist data in local storage",
// "JS logic - test saveProject and readProject - https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API");
// defaultProject.addTodo(testTodo);
// log(testTodo.getDueDate());
// log("change due date");
// testTodo.setDueDate("2024/04/30");
// log(defaultProject.todos);
// log(testTodo.getDueDate());
// log("change title and completed");
// testTodo.title = "Test todos including title change";
// testTodo.toggleCompleted();
// log(defaultProject.todos);

// console.log("add new todo with date");
// let testDate = createTodo("Organise to-dos by date",
//   "JS logic",
//   "2024/03/31");
// defaultProject.addTodo(testDate);
// log(testDate);
// log(testDate.getDueDate());
// defaultProject.addTodo(createTodo("Make sure app doesn't crash if data is missing", "JS logic"));

// log(defaultProject.todos);
// console.log(storage.readProject("Default"));

// defaultProject.deleteTodo(1);
// console.log(JSON.stringify(defaultProject.todos));

ScreenController().initialize();
ScreenController().updateTodos(defaultProject);

/*
TO DO - APPLICATION LOGIC:
- Expand a single todo to see/edit
- Delete todo
- Make look sexy
- Create different project views
- Add menu bar with all projects
- Add calendar views
- Add categories of projects (e.g. personal, work)
*/