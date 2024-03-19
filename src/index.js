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

// TESTING
// function log(text) {
//   console.log(JSON.stringify(text));
// }
// log(defaultProject);
// let testTodo = createTodo("Test todos", "Try out different functions");
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

// log("add new todo with date");
// let testDate = createTodo("Test dates",
//   "Check formatting for dates",
//   "2024/03/31");
// defaultProject.addTodo(testDate);
// log(testDate);
// log(testDate.getDueDate());
// log(defaultProject.todos);

// defaultProject.deleteTodo(1);
// console.log(JSON.stringify(defaultProject.todos));

/*
TO DO - APPLICATION LOGIC:
- Create view of all todos (by project or by calendar?)
- Expand a single todo to see/edit
- Delete todo
- Make look sexy
- Add menu bar with all projects
- Add calendar views

TO DO - JS LOGIC:
- Persist data in local storage https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
- Make sure app doesn't crash if data is missing
*/