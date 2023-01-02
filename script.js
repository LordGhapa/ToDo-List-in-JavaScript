const inputTask = document.querySelector('.input-tarefa')
const btnTask = document.querySelector('.bnt-new')
const btnReset = document.querySelector('.reset')
const task = document.querySelector('.tarefas')
const taskSpan = document.querySelector('.inforTask')

document.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    btnTask.click()
  }
})

function clearInput() {
  inputTask.value = ''
  inputTask.focus()
}

function createDelBtn(li) {
  li.innerHTML += ' '
  const bntDel = document.createElement('button')
  bntDel.innerText = 'Apagar'
  bntDel.setAttribute('class', 'erase')
  bntDel.setAttribute('Title', 'Apagar esta tarefa')
  li.appendChild(bntDel)
}

function createList() {
  const li = document.createElement('li')
  return li
}

function criaCheckBox(checked) {
  const chkbx = document.createElement('input')
  chkbx.type = 'checkbox'
  if (checked) {
    chkbx.setAttribute('checked', '')
  }
  return chkbx
}

function createTask(txtInput, checked) {
  const li = createList()
  const chkbx = criaCheckBox(checked)
  li.appendChild(chkbx)
  li.innerHTML += `<span class="inforTask">${txtInput}</span>`
  task.appendChild(li)
  createDelBtn(li)
  clearInput()
  saveTasks()
  checkboxes()
}

btnTask.addEventListener('click', () => {
  if (!inputTask.value) return
  createTask(inputTask.value, false)
})

document.addEventListener('click', e => {
  const el = e.target
  if (el.classList.contains('erase')) {
    el.parentElement.remove()
    saveTasks()
  }
})

function saveTasks() {
  const liTask = task.querySelectorAll('.inforTask')
  const listTasks = []
  for (let task of liTask) {
    let taskTxt = task.innerText
    listTasks.push(taskTxt)
  }
  const tasksJSON = JSON.stringify(listTasks)
  localStorage.setItem('tasks', tasksJSON)

  const checkboxes = task.querySelectorAll('input[type="checkbox"]')
  const checkList = []

  for (const checkbox of checkboxes) {
    if (checkbox.checked) {
      checkList.push(true)
    } else {
      checkList.push(false)
    }
  }

  const checkListJSON = JSON.stringify(checkList)
  localStorage.setItem('checkList', checkListJSON)
}

function addSaveTask() {
  const taks = localStorage.getItem('tasks')
  const listTasks = JSON.parse(taks)

  const checkList = localStorage.getItem('checkList')
  const listCheck = JSON.parse(checkList)

  if (listTasks !== null && listCheck !== null) {
    
    for (const [index, item2] of listTasks.entries()) {
      createTask(item2, listCheck[index])
    }
  }
}

addSaveTask()

document.addEventListener('change', e => {
  checkboxes()
  saveTasks()
})

function checkboxes() {
  const checkboxes = task.querySelectorAll('input[type="checkbox"]')

  for (const checkbox of checkboxes) {
    if (checkbox.checked) {
      checkbox.nextSibling.classList.add('done')
    } else {
      checkbox.nextSibling.classList.remove('done')
    }
  }
}



btnReset.addEventListener("click",()=>{
  checkListJSON=JSON.stringify([])
  localStorage.setItem('checkList', checkListJSON)
  tasksJSON =JSON.stringify([])
  localStorage.setItem('tasks', tasksJSON)
  
  const liTask = task.querySelectorAll('.inforTask')
  for (let task of liTask) {
    task.parentElement.remove()
   
  }

})