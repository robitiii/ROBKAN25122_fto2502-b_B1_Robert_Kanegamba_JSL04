// Initial tasks data
const initialTasks = [
  {
    id: 1,
    title: "Launch Epic Career 🚀",
    description: "Create a killer Resume",
    status: "todo",
  },
  {
    id: 2,
    title: "Master JavaScript 💛",
    description: "Get comfortable with the fundamentals",
    status: "doing",
  },
  {
    id: 3,
    title: "Keep on Going 🏆",
    description: "You're almost there",
    status: "doing",
  },
  {
    id: 11,
    title: "Learn Data Structures and Algorithms 📚",
    description:
      "Study fundamental data structures and algorithms to solve coding problems efficiently",
    status: "todo",
  },
  {
    id: 12,
    title: "Contribute to Open Source Projects 🌐",
    description:
      "Gain practical experience and collaborate with others in the software development community",
    status: "done",
  },
  {
    id: 13,
    title: "Build Portfolio Projects 🛠️",
    description:
      "Create a portfolio showcasing your skills and projects to potential employers",
    status: "done",
  },
];

// DOM Elements
const addTaskBtn = document.getElementById("add-task-btn");
const taskDialog = document.getElementById("task-dialog");
const closeDialogBtn = document.getElementById("close-dialog");
const taskForm = document.getElementById("task-form");
const themeToggleBtn = document.getElementById("theme-switch");
const dialogTitle = document.getElementById("dialog-title");
const taskSubmitBtn = document.getElementById("task-submit-btn");

const columns = {
  todo: document.getElementById("todo-column"),
  doing: document.getElementById("doing-column"),
  done: document.getElementById("done-column"),
};

// Theme Management
const initializeTheme = () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  document.body.classList.toggle("dark", savedTheme === "dark");
  themeToggleBtn.checked = savedTheme === "dark";
};

// Task Management
const renderTasks = () => {
  const columns = ["todo", "doing", "done"];
  columns.forEach((status) => {
    const column = document.getElementById(`${status}-column`);
    const tasksInColumn = initialTasks.filter((task) => task.status === status);

    column.innerHTML = tasksInColumn
      .map(
        (task) => `
      <div class="task-div" data-task-id="${task.id}">
        <strong>${task.title}</strong>
        <p>${task.description}</p>
      </div>
    `
      )
      .join("");
  });

  // Add click event listeners to all tasks
  document.querySelectorAll(".task-div").forEach((taskDiv) => {
    taskDiv.addEventListener("click", () => {
      const taskId = parseInt(taskDiv.dataset.taskId);
      const task = initialTasks.find((t) => t.id === taskId);
      if (task) {
        viewTaskDetails(task);
      }
    });
  });
};

const addNewTask = (event) => {
  event.preventDefault();

  const formData = new FormData(taskForm);
  const newTask = {
    id: Date.now(),
    title: formData.get("title"),
    description: formData.get("description"),
    status: formData.get("status"),
  };

  initialTasks.push(newTask);
  renderTasks();
  taskDialog.close();
  taskForm.reset();
};

// Form Validation
const validateField = (field) => {
  const formGroup = field.closest(".form-group");
  const isValid = field.value.trim() !== "";
  formGroup.classList.toggle("error", !isValid);
  return isValid;
};

const validateForm = () => {
  const titleValid = validateField(taskForm.elements.title);
  const descriptionValid = validateField(taskForm.elements.description);
  return titleValid && descriptionValid;
};

// Dialog Functions
function openDialog() {
  dialogTitle.textContent = "Add New Task";
  taskSubmitBtn.textContent = "Create Task";
  taskForm.reset();
  enableFormEditing();
  taskDialog.showModal();
  document.querySelectorAll(".form-group").forEach((group) => {
    group.classList.remove("error");
  });
}

function closeDialog() {
  taskDialog.close();
  taskForm.reset();
  document.querySelectorAll(".form-group").forEach((group) => {
    group.classList.remove("error");
  });
}

function viewTaskDetails(task) {
  dialogTitle.textContent = "View Task";
  taskSubmitBtn.textContent = "Close";

  // Fill in the form with task details
  const titleInput = document.getElementById("task-title");
  const descInput = document.getElementById("task-desc");
  const statusInput = document.getElementById("task-status");

  titleInput.value = task.title;
  descInput.value = task.description;
  statusInput.value = task.status;

  // Disable form editing
  disableFormEditing();

  // Show the dialog
  taskDialog.showModal();
}

function enableFormEditing() {
  const formElements = taskForm.elements;
  for (let element of formElements) {
    element.removeAttribute("readonly");
    element.removeAttribute("disabled");
  }
  taskForm.classList.remove("view-mode");
}

function disableFormEditing() {
  const formElements = taskForm.elements;
  for (let element of formElements) {
    if (element !== taskSubmitBtn) {
      element.setAttribute("readonly", true);
      element.setAttribute("disabled", true);
    }
  }
  taskForm.classList.add("view-mode");
}

// Event Listeners
addTaskBtn.addEventListener("click", openDialog);
closeDialogBtn.addEventListener("click", closeDialog);
taskForm.addEventListener("submit", (event) => {
  if (taskSubmitBtn.textContent === "Close") {
    event.preventDefault();
    closeDialog();
    return;
  }

  if (!validateForm()) {
    event.preventDefault();
    return;
  }
  addNewTask(event);
});

// Input validation on blur
document
  .getElementById("task-title")
  .addEventListener("blur", (e) => validateField(e.target));
document
  .getElementById("task-desc")
  .addEventListener("blur", (e) => validateField(e.target));

// Close dialog when clicking outside
taskDialog.addEventListener("click", (e) => {
  const dialogDimensions = taskDialog.getBoundingClientRect();
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    closeDialog();
  }
});

// Initialize theme from localStorage if available
document.addEventListener("DOMContentLoaded", () => {
  initializeTheme();
  renderTasks();
});

themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
});
