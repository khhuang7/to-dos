import './styles.css';
import * as storage from './StorageController.js';
import * as screen from './ScreenController.js';

function createProject (title) {
  let todos = [];

  if (storage.readProject(title)) {
    todos = storage.readProject(title);
  } else {
    storage.saveProject(title, todos);
  }

  const addTodo = function (todo) {
    todos.push(todo);
    storage.saveProject(title, todos);  
  }

  const deleteTodo = function (index) {
    todos.splice(index, 1);
    storage.saveProject(title, todos);
  }

  return { title, todos, addTodo, deleteTodo };
}

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

screen.initialize();
screen.updateTodos(defaultProject);

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