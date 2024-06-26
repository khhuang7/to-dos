import * as storage from './StorageController.js';
import { format, parseISO } from 'date-fns';

function openProject (project) {
  let name = project;
  let todos = [];

  if (storage.readProject(project)) {
    let todoBasics = storage.readProject(project);
    for (const item of todoBasics) {
      let todo = createTodo(
        item.title,
        item.description,
        item.dueDate,
        item.priority);
      todos.push(todo);
    }
  } else {
    storage.saveProject(project, todos);
  }

  const getBasics = function () {
    let todoBasics = [];
    for (const todo of todos) {
      const title = todo.title;
      const description = todo.description;
      const dueDate = todo.getDueDate();
      const priority = todo.priority;
      todoBasics.push({title, description, dueDate, priority});
    }
    return todoBasics;
  }

  const addTodo = function (todo) {
    todos.push(todo);
    let todoBasics = getBasics();
    storage.saveProject(project, todoBasics);
  }

  const updateTodo = function(
    todo,
    newTitle,
    newDescription,
    newDueDate,
    newPriority) {
      todo.title = newTitle;
      todo.description = newDescription;
      todo.setDueDate(newDueDate);
      todo.priority = newPriority;
    let todoBasics = getBasics();
    storage.saveProject(project, todoBasics);
  }

  const deleteTodo = function (index) {
    todos.splice(index, 1);
    let todoBasics = getBasics();
    storage.saveProject(project, todoBasics);
  }

  return {
    name,
    todos,
    addTodo,
    updateTodo,
    deleteTodo
  };
}

function createTodo (
  title,
  description,
  date = null,
  priority = null
) {
  let dueDate;
  const setDueDate = (newDate) => {
    dueDate = (Boolean(newDate)) ? format(parseISO(newDate), "yyyy-MM-dd") : null;
    return dueDate;
  }
  setDueDate(date);
  
  let completed = false;

  return {
    title,
    description,
    priority,
    completed,
    getDueDate: function () {
      return dueDate; 
    },
    setDueDate,
    toggleCompleted: function () { this.completed = !this.completed; },
  };
}

export {
  openProject,
  createTodo,
}