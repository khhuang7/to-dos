import * as storage from './StorageController.js';

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

  export {
    updateTodos,
    initialize,
  }