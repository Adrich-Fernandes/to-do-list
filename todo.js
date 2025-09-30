const form = document.querySelector('.input'); // your <form>
const input = document.querySelector('#fild'); // the text box
const ul = document.querySelector('.todo-ul'); // the list

// Load tasks when page loads
window.addEventListener('DOMContentLoaded', loadTasks);

// Handle submit
form.addEventListener('submit', function (e) {
  e.preventDefault(); // stop form reload
  const text = input.value.trim();
  if (text) {
    addTask(text);
    input.value = "";
  }
});

// Create a task item
function addTask(taskText, done = false) {
  const li = document.createElement('li');
  li.className = 'tsk-li';

  const check = document.createElement('button');
  check.className = 'btns';
  check.id = 'check';
  check.textContent = '✓';

  const span = document.createElement('span');
  span.className = 'txt';
  span.textContent = taskText;
  if (done) span.classList.add('done');

  const del = document.createElement('button');
  del.className = 'btns';
  del.id = 'delete';
  del.textContent = 'x';

  li.append(check, span, del);
  ul.appendChild(li);

  // Toggle done
  check.addEventListener('click', () => {

    if(done === true){
    span.style.textDecoration = "line-through"
    check.style.backgroundColor = "rgba(85, 243, 193, 1)";
    done = false;
    }
    else{
      span.style.textDecoration = "none"
      check.style.backgroundColor = "rgb(254, 62, 56)"
      done = true;
    }

    span.classList.toggle('done');
    saveTasks();
  });

  // Delete task
  del.addEventListener('click', () => {
    if(done === true){
    // span.style.textDecoration = "line-through"
    check.style.backgroundColor = "rgba(85, 243, 193, 1)";
    done = false;
    }
    else{
      // span.style.textDecoration = "none"
      check.style.backgroundColor = "rgb(254, 62, 56)"
      done = true;
    }
    li.remove();
    saveTasks();
  });

  saveTasks(); // save after adding
}

// Save tasks to localStorage
function saveTasks() {
  const tasks = [];
  ul.querySelectorAll('li').forEach(li => {
    const text = li.querySelector('.txt').textContent;
    const done = li.querySelector('.txt').classList.contains('done');
    tasks.push({ text, done });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  const data = localStorage.getItem('tasks');
  if (!data) return;
  const tasks = JSON.parse(data);
  tasks.forEach(t => addTask(t.text, t.done));
}
