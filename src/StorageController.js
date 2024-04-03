const storageAvailable = function (type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

// saveProject and readProject only involves the todos, since we only have one project (default)
const saveProject = function(projectName, todoBasics) {
  console.log("Saving project");
  let projectString = JSON.stringify(todoBasics);
  localStorage.setItem(projectName, projectString);
  console.log(projectName);
  console.log(localStorage.getItem(projectName));
}

const readProject = function(projectName) {
  let projectString = localStorage.getItem(projectName);
  let project = JSON.parse(projectString);
  return project;
}

export {
  storageAvailable,
  saveProject,
  readProject,
}