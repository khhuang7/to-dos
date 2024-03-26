import './styles.css';

function createProject (title, category = null) {
  let todos = [];

  const addTodo = function (todo) { todos.push(todo); }
  const deleteTodo = function (index) { todos.splice(index, 1); }

  return { title, category, todos, addTodo, deleteTodo };
}

// Does this need to be in a separate initializing area?
let defaultProject = createProject("Default");

function createTodo (
  title,
  description,
  date = null,
  priority = null
) {
  let dueDate;
  const setDueDate = (newDate) => {
    dueDate = (newDate === null) ? null : new Date(newDate);
  }
  setDueDate(date);
  
  let completed = false;

  return {
    title,
    description,
    priority,
    completed,
    getDueDate: function () { return dueDate; },
    setDueDate,
    toggleCompleted: function () { this.completed = !this.completed; },
  };
}

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
    console.log("Toggled open class");
  }

  // Assign functions to buttons

  const initialize = function () {
    const addBtn = document.querySelector(".add-btn");
    addBtn.addEventListener("click", toggleForm);

    const cancelBtn = document.querySelector(".cancel-btn");
    cancelBtn.addEventListener("click", toggleForm);

    todoForm.addEventListener("submit", function(event) {
      event.preventDefault();
      submitTodo();
    });
  }

  return {
    updateTodos,
    initialize,
  }
}

// TESTING
function log(text) {
  console.log(JSON.stringify(text));
}
log(defaultProject);
let testTodo = createTodo("Test todos", "Try out different functions");
defaultProject.addTodo(testTodo);
log(testTodo.getDueDate());
log("change due date");
testTodo.setDueDate("2024/04/30");
log(defaultProject.todos);
log(testTodo.getDueDate());
log("change title and completed");
testTodo.title = "Test todos including title change";
testTodo.toggleCompleted();
log(defaultProject.todos);

log("add new todo with date");
let testDate = createTodo("Test dates",
  "Check formatting for dates",
  "2024/03/31");
defaultProject.addTodo(testDate);
log(testDate);
log(testDate.getDueDate());
log(defaultProject.todos);

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

TO DO - JS LOGIC:
- Persist data in local storage https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
- Make sure app doesn't crash if data is missing
*/