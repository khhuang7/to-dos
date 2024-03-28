import * as storage from './StorageController.js';

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

export {
  createProject,
  createTodo,
}