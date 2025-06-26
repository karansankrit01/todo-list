// Task data structure
let tasks = [];
let filter = 'all'; // 'all', 'active', 'completed'

// DOM Elements
const addBtn = document.getElementById('add-btn');
const modal = document.getElementById('modal');
const modalAddBtn = document.getElementById('modal-add-btn');
const modalCancelBtn = document.getElementById('modal-cancel-btn');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const deleteAllBtn = document.getElementById('delete-all-btn');
const activeTab = document.getElementById('active-tab');
const completedTab = document.getElementById('completed-tab');
const allTab = document.getElementById('all-tab');
const tabButtons = [activeTab, completedTab, allTab];

// Modal logic
addBtn.onclick = () => {
  modal.classList.remove('hidden');
  taskInput.value = '';
  setTimeout(() => taskInput.focus(), 100);
};
modalCancelBtn.onclick = () => {
  modal.classList.add('hidden');
};
modalAddBtn.onclick = () => {
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({ text, completed: false });
    renderTasks();
    modal.classList.add('hidden');
  }
};
taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') modalAddBtn.click();
});

// Filter logic
activeTab.onclick = () => setFilter('active');
completedTab.onclick = () => setFilter('completed');
allTab.onclick = () => setFilter('all');
function setFilter(f) {
  filter = f;
  tabButtons.forEach(btn => btn.classList.remove('selected'));
  if (f === 'active') activeTab.classList.add('selected');
  else if (f === 'completed') completedTab.classList.add('selected');
  else allTab.classList.add('selected');
  renderTasks();
}

// Render tasks
function renderTasks() {
  taskList.innerHTML = '';
  let filtered = tasks;
  if (filter === 'active') filtered = tasks.filter(t => !t.completed);
  if (filter === 'completed') filtered = tasks.filter(t => t.completed);
  filtered.forEach((task, idx) => {
    const li = document.createElement('li');
    li.className = 'task-item' + (task.completed ? ' completed' : '');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'custom-radio';
    checkbox.checked = task.completed;
    checkbox.onchange = () => {
      task.completed = !task.completed;
      renderTasks();
    };

    const span = document.createElement('span');
    span.className = 'task-text';
    span.innerText = task.text;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerText = '✕';
    deleteBtn.onclick = () => {
      const realIdx = tasks.indexOf(task);
      if (realIdx > -1) tasks.splice(realIdx, 1);
      renderTasks();
    };

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

// Bulk delete
deleteAllBtn.onclick = () => {
  if (confirm('Delete all tasks?')) {
    tasks = [];
    renderTasks();
  }
};

// Initial render
renderTasks();
