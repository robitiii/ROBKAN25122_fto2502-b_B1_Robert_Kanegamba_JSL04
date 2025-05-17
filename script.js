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
const toggleTheme = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
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
        </div>
      `
      )
      .join("");
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
