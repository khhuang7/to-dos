import './styles.css';
import * as storage from './StorageController.js';
import { createProject, createTodo } from './todos.js';
import TrashCan from './trash-can-10416.svg';

function ScreenController () {
  const todoForm = document.forms["new-todo-form"];
  const contentDiv = document.querySelector(".content");

  // load existing to-dos
  const updateTodos = function (project) {
    contentDiv.innerHTML = "";
    const todos = project.todos;
    
    todos.forEach(function (todo, i) {
      const card = document.createElement("div");
      card.classList.add("todo-card");

      const cardTitle = document.createElement("h3");
      cardTitle.innerText = todo.title;
      card.appendChild(cardTitle);

      const cardDescription = document.createElement("p");
      cardDescription.innerText = todo.description;
      card.appendChild(cardDescription);

      const cardButton = document.createElement("button");
      cardButton.classList.add("card-button");
      const trashIcon = new Image();
      trashIcon.src = TrashCan;
      cardButton.appendChild(trashIcon);
      cardButton.addEventListener("click", () => removeTodo(project, i));
      card.appendChild(cardButton);

      contentDiv.appendChild(card);
    })
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

  // Remove todo from project and screen
  const removeTodo = function (project, index) {
    project.deleteTodo(index);
    updateTodos(project);
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

ScreenController().initialize();

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

ScreenController().updateTodos(defaultProject);

/*
TO DO - APPLICATION LOGIC:
- Expand a single todo to see/edit
- Make cards the same size, with overflow text
- Make look sexy
- Create different project views
- Add menu bar with all projects
- Add calendar views
- Add categories of projects (e.g. personal, work)
- Add web.config to stop 404 error with Font Awesome woff https://hotcakescommerce.zendesk.com/hc/en-us/articles/210926903-HTTP-404-Not-Found-Error-with-woff-or-woff2-Font-Files
*/