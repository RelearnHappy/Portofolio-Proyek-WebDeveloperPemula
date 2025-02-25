// DOM Elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const filterButtons = document.querySelectorAll('.filter-btn');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Save Todos to LocalStorage
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Render Todos
function renderTodos(filter = 'all') {
  todoList.innerHTML = '';

  let filteredTodos;
  if (filter === 'active') {
    filteredTodos = todos.filter(todo => !todo.completed);
  } else if (filter === 'completed') {
    filteredTodos = todos.filter(todo => todo.completed);
  } else {
    filteredTodos = todos;
  }

  filteredTodos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.textContent = todo.text;

    if (todo.completed) {
      li.classList.add('completed');
    }

    // Add Delete Button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Hapus';
    deleteButton.addEventListener('click', () => {
      todos.splice(index, 1);
      saveTodos();
      renderTodos(filter);
    });

    // Toggle Completed Status
    li.addEventListener('click', () => {
      todo.completed = !todo.completed;
      saveTodos();
      renderTodos(filter);
    });

    li.appendChild(deleteButton);
    todoList.appendChild(li);
  });
}

// Add Todo
todoForm.addEventListener('submit', event => {
  event.preventDefault();

  const todoText = todoInput.value.trim();
  if (todoText !== '') {
    todos.push({ text: todoText, completed: false });
    saveTodos();
    renderTodos();
    todoInput.value = '';
  }
});

// Handle Filter Buttons
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    document.querySelector('.filter-btn.active').classList.remove('active');
    button.classList.add('active');
    renderTodos(button.dataset.filter);
  });
});

// Initial Render
renderTodos();