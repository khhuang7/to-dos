import './styles.css';
import * as storage from './StorageController.js';
import { openProject, createTodo } from './todos.js';
import { format, compareAsc, parseISO } from 'date-fns';
import TrashCan from './trash-can-10416.svg';

function ScreenController () {
  const todoForm = document.forms["new-todo-form"];
  const submitBtn = document.querySelector(".submit-btn");
  const contentDiv = document.querySelector(".content");
  const projectMenu = document.querySelector(".project-menu");
  let formMode;
  let currentTodo;
  let currentProject;

  // load existing to-dos
  const updateTodos = function (project) {
    contentDiv.innerHTML = "";
    const todos = project.todos;
    
    const projectTitle = document.createElement("h2");
    projectTitle.innerText = project.name;
    contentDiv.appendChild(projectTitle);

    todos.forEach(function (todo, i) {
      const card = document.createElement("div");
      card.classList.add("todo-card");
      card.addEventListener("click", openEditForm.bind(window, project, i));

      const cardTitle = document.createElement("h3");
      cardTitle.innerText = todo.title;
      card.appendChild(cardTitle);

      const dueDate = todo.getDueDate();
      if (dueDate !== null) {
        const cardDueDate = document.createElement("p");
        cardDueDate.classList.add("due-date");
        if (compareAsc(dueDate, new Date()) === -1) { cardDueDate.classList.add("overdue"); }
        const dueDateFormatted = format(parseISO(dueDate), "d MMM");
        cardDueDate.innerText = dueDateFormatted;
        card.appendChild(cardDueDate);  
      }

      const cardDescription = document.createElement("p");
      cardDescription.innerText = todo.description;
      card.appendChild(cardDescription);

      const cardButton = document.createElement("button");
      cardButton.classList.add("card-button");
      const trashIcon = new Image();
      trashIcon.src = TrashCan;
      cardButton.appendChild(trashIcon);
      cardButton.addEventListener("click", (event) => {
        event.stopPropagation();
        removeTodo(project, i);
      });
      card.appendChild(cardButton);

      contentDiv.appendChild(card);
    })
  }

  // Open form to create new to-do

  const openNewForm  = function () {
    submitBtn.innerText = "Add new task";
    formMode = "add";
    todoForm.reset();

    toggleForm();
  }

  const openEditForm  = function (project, index) {
    // BUGS - CURRENTTODO AND FORMMODE DON'T PERSIST IF CARD IS CLICKED AT BEGINNING, passing function into addeventlistener with parameters
    currentTodo = project.todos[index];
    todoForm.title.value = currentTodo.title;
    todoForm.description.value = currentTodo.description;
    todoForm.dueDate.value = currentTodo.getDueDate();
    todoForm.priority.value = currentTodo.priority;
    
    submitBtn.innerText = "Save task";
    formMode = "edit";
    toggleForm();
  }

  ///////// Open form to edit existing to-do

  // Submit form depending if it is a new or existing to-do

  const submitForm = function () {
    todoForm.reportValidity();

    switch (formMode) {
      case "add":
        submitTodo();
        break;
      case "edit":
        editTodo(currentTodo);
        break;
    }

    toggleForm();
    updateTodos(currentProject);
  }

  // Submit new to-do

  const submitTodo = function () {
    let title = todoForm.title.value;
    let description = todoForm.description.value;
    let dueDate = todoForm.dueDate.value;
    let priority = todoForm.priority.value;
    let todo = createTodo(title, description, dueDate, priority);
    currentProject.addTodo(todo);
  }

  // Edit existing to-do
  const editTodo = function(todo) {
    let title = todoForm.title.value;
    let description = todoForm.description.value;
    let dueDate = todoForm.dueDate.value;
    let priority = todoForm.priority.value;

    currentProject.updateTodo(todo, title, description, dueDate, priority);
  }

  // Open and close form

  const toggleForm = function () {
    todoForm.classList.toggle("open");
  }

  // Remove todo from project and screen
  const removeTodo = function (project, index) {
    project.deleteTodo(index);
    updateTodos(project);
  }

  // Change project in view
  const switchProject = function (event) {
    const projectName = event.target.innerText;
    currentProject = openProject(projectName);
    updateTodos(currentProject);
  }

  const initialize = function () {
    // Test storage controller
    if (!storage.storageAvailable("localStorage")) {
      alert("Local storage is disabled or not available. This website may not function correctly.");
    }
    
    // Add list of projects to menu
    const projects = storage.getProjectNames();
    for (const project of projects) {
      const projectLink = document.createElement("li");
      projectLink.innerText = project;
      projectLink.addEventListener("click", switchProject);
      projectMenu.appendChild(projectLink);
    }

    // Assign functions to buttons
    const addBtn = document.querySelector(".add-btn");
    addBtn.addEventListener("click", openNewForm);

    todoForm.addEventListener("submit", function(event) {
      event.preventDefault();
      submitForm();
    });

    const cancelBtn = document.querySelector(".cancel-btn");
    cancelBtn.addEventListener("click", toggleForm);

    // Load default project
    currentProject = openProject("Default");
    updateTodos(currentProject);
  }

  return {
    initialize
  }
}

ScreenController().initialize();

/*
TO DO - APPLICATION LOGIC:
-  // Set minimum due date to today
    dueDateInput.min = new Date().toISOString().split("T")[0];
- Fix bug when editing an existing card on first click (if formMode is initially set to "", it is not rewritten as "edit" if clicking on a card to open the form for the first time)

NICE TO HAVE - EASIER:
- Ability to choose default project
- Create project
- Rename project
- Flag for priorities
- Make look sexy
  - Same width buttons in form
  - Make cards the same size, with overflow text
  - Card sizing to maximise screen width with sufficient cards
  - Add placeholder space for date when not provided
- Ability to tick off completed items

NICE TO HAVE - MORE COMPLEX:
- Change edit function to be within the individual card, instead of same to-do form
- Create different project views
- Separate list for completed items
- Add calendar views
- Add categories of projects (e.g. personal, work)
*/