const input = document.querySelector('#input');
const addBtn = document.querySelector('.main-btn');
const taskUl = document.querySelector('.tasks');

function cTask(textInput, isCompleted = false) {
    const li = document.createElement('li');
    li.textContent = textInput;
    
    if (isCompleted) {
        li.classList.add('task-completed');
    }
    
    taskUl.appendChild(li);

    clearInput();
    cDelButton(li);
    cCompleteButton(li);
    saveTask();
}

function clearInput() {
    input.value = '';
    input.focus();
}

function cDelButton(li) {
    const delBtn = document.createElement('button');

    delBtn.setAttribute('class', 'delete-btn');
    delBtn.setAttribute('title', 'Apagar tarefa');
    delBtn.textContent = 'Apagar';

    delBtn.addEventListener('click', () => {
        li.remove();
        saveTask();
    });

    li.appendChild(delBtn);
}

function cCompleteButton(li) {
    const compBtn = document.createElement('button');
    compBtn.setAttribute('class', 'completed-btn');
    compBtn.setAttribute('title', 'Marcar como concluído');
    compBtn.textContent = 'Concluído';

    compBtn.addEventListener('click', () => {
        li.classList.toggle('task-completed');
        saveTask();
    })

    li.appendChild(compBtn);
}

function saveTask() {
    const liTasks = taskUl.querySelectorAll('li');
    const toDoList = [];

    for (let t of liTasks) {
        let taskText = t.firstChild.textContent;
        
        toDoList.push({
            text: taskText,
            completed: t.classList.contains('task-completed')
        });
    }

    const tasksJSON = JSON.stringify(toDoList);
    localStorage.setItem('tarefas', tasksJSON);
}

function loadSavedTasks() {
    const tasks = localStorage.getItem('tarefas') || '[]';
    const toDoList = JSON.parse(tasks);

    for (let t of toDoList) {
        cTask(t.text, t.completed);
    }
}

loadSavedTasks();

// main event
addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!input.value) {
        return;
    }
    cTask(input.value);
});

// shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'f' && document.activeElement !== input) {
        e.preventDefault();
        input.focus();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        if(!input.value) {
            return;
        }
        cTask(input.value);
    }
});