let tasks = [];

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const task = taskInput.value;
  if (task) {
    const taskObject = {
      id: Date.now(),
      task,
      completed: false,
      dateAdded: new Date(),
      dateCompleted: null
    };
    tasks.push(taskObject);
    taskInput.value = "";
    updateUI();
  }
}

function completeTask(id) {
  const taskIndex = tasks.findIndex(task => task.id == id);
  tasks[taskIndex].completed = true;
  tasks[taskIndex].dateCompleted = new Date();
  updateUI();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id != id);
  updateUI();
}

function editTask(id) {
  const taskIndex = tasks.findIndex(task => task.id == id);
  const task = tasks[taskIndex].task;
  const newTask = prompt("Edit task:", task);
  if (newTask) {
    tasks[taskIndex].task = newTask;
    updateUI();
  }
}

function updateUI() {
  const pendingTasksList = document.getElementById("pendingTasks");
  const completedTasksList = document.getElementById("completedTasks");
  pendingTasksList.innerHTML = "";
  completedTasksList.innerHTML = "";
  tasks.forEach(task => {
    const taskElement = document.createElement("li");
    taskElement.innerHTML = `
      <span>${task.task}</span>
      <div>
        <button onclick="completeTask(${task.id})">Complete</button>
        <button onclick="editTask(${task.id})">Edit</button>
        <button onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;
    if (task.completed) {
      taskElement.classList.add("completed");
      completedTasksList.appendChild(taskElement);
    } else {
      pendingTasksList.appendChild(taskElement);
    }
  });
}

updateUI();
