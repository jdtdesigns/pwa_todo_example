const addBtn = document.querySelector('#add-btn');
const outputEl = document.querySelector('#output');

function getTodos() {
  const todoData = localStorage.getItem('todos');

  return JSON.parse(todoData) || [];
}

function storeTodo(text) {
  const todos = getTodos();

  todos.push({
    text: text,
    completed: false
  });

  localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodo() {
  const todoInput = document.querySelector('#todo-input')
  const todoText = todoInput.value;

  storeTodo(todoText);
  alert('Your todo has been added successfully!');

  todoInput.value = '';
  outputTodos();
}

function outputTodos() {
  const todos = getTodos();


  if (todos.length) {
    outputEl.innerHTML = '';
  }

  todos.forEach(todoObj => {
    outputEl.insertAdjacentHTML('beforeend', `<p data-status="${todoObj.completed}">${todoObj.text}</p>`)
  });
}

async function outputQuote() {
  const url = 'https://api.quotable.io/random';
  const quoteEl = document.querySelector('#quote');

  const { content } = await fetch(url).then(res => res.json());

  quoteEl.innerText = `"${content}"`;
}

function toggleTodoStatus(e) {
  const el = e.target;

  if (el.tagName === 'P') {
    const status = el.dataset.status;

    if (status === 'false') {
      el.style.textDecoration = 'none';
      el.dataset.status = 'true';
    } else {
      el.style.textDecoration = 'line-through';
      el.dataset.status = 'false';
    }
  }
}

function initializeServiceWorker() {
  if (navigator.onLine) {
    outputQuote();
  }

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('Service Worker registered successfully');
        })
        .catch(error => {
          console.log('Service Worker registration failed:', error);
        });
    });
  }
}

function init() {
  initializeServiceWorker();

  outputTodos();


  addBtn.addEventListener('click', addTodo);
  outputEl.addEventListener('click', toggleTodoStatus);
}

init();


