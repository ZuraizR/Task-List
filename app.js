// Defining UI Variables
const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')

// Load All Event Listeners
loadEventListeners()

// Load Event Listeners //
function loadEventListeners() {
  //  DOM Loaded Event
  document.addEventListener('DOMContentLoaded', getTasks)
  // Add Task Event
  form.addEventListener('submit', addTask)

  //   Remove Task Event
  taskList.addEventListener('click', removeTask)

  //   Clear Tasks Event
  clearBtn.addEventListener('click', clearTasks)

  //   Filter Tasks Event
  filter.addEventListener('keyup', filterTasks)
}

function getTasks() {
  let tasks
  if (localStorage.getItem('tasks') === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach((task) => {
    // Create li Element
    const li = document.createElement('li')
    // Add Class to li
    li.className = 'collection-item'
    // Adding Task to li
    li.innerText = task

    // Creating link Element
    const link = document.createElement('a')
    // Add Class to link
    link.className = 'delete-item secondary-content'
    // Adding HTML for link Element
    link.innerHTML = `<i class="fa fa-remove" style="cursor:pointer;"></i>`
    // Appending link to li
    li.appendChild(link)
    // Appending li to ul
    taskList.appendChild(li)
  })
}

// Add Task Func //
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add Task Please')
  } else {
    //   Create li Element
    const li = document.createElement('li')

    //   Add Class to li
    li.className = 'collection-item'

    //   Adding Task Value to li
    li.innerText = taskInput.value

    //   Creating link Element
    const link = document.createElement('a')

    //   Adding Class to link Element
    link.className = 'delete-item secondary-content'

    //   Adding HTML for link Element
    link.innerHTML = `<i class="fa fa-remove" style="cursor:pointer;"></i>`

    //   Appending link to li
    li.appendChild(link)

    //   Appending li to ul
    taskList.appendChild(li)

    // Store in LocalStorage
    storeTaskInLocalStorage(taskInput.value)

    //   Clear Input
    taskInput.value = ''

    e.preventDefault()
  }
}

// Stores Tasks in Local Storage
function storeTaskInLocalStorage(task) {
  let tasks
  if (localStorage.getItem('tasks') === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.push(task)

  localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you Sure?')) {
      e.target.parentElement.parentElement.remove()

      //   Remove From LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement)
    }
  }
}

// Remove From LocalStorage
function removeTaskFromLocalStorage(taskItem) {
  let tasks
  if (localStorage.getItem('tasks') === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach((task, index) => {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1)
    }
  })

  localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Clear Tasks
function clearTasks() {
  //   taskList.innerHTML = ''

  // Faster Way
  if (confirm('Are you Sure to Clear All Tasks?')) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild)
    }

    // Clear from LS
    clearTasksFromLocalStorage()
  }
}

// Clear Tasks From Local Storage
function clearTasksFromLocalStorage() {
  localStorage.clear()
}

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase()
  document.querySelectorAll('.collection-item').forEach((task) => {
    const item = task.firstChild.textContent
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block'
    } else {
      task.style.display = 'none'
    }
  })
}
