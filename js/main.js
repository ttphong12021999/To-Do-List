let btnAddTaskEl = document.querySelector("button");
let taskNameEl = document.querySelector("#content");
let tasks = getTaskFormLocalStorage();

renderTasks(tasks);

btnAddTaskEl.addEventListener("click", function () {
    if (!taskNameEl.value) {
        alert("Please select a task name");
        return false;
    }

    let taskID = this.getAttribute("id")
    let tasks = getTaskFormLocalStorage();
    let task = { name: taskNameEl.value }

    if (taskID=== 0 || taskID) {
        tasks[taskID] = task
        this.removeAttribute('id', '')
    } else {
    tasks.push(task);
    }

    taskNameEl.value = ""

    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks(tasks);
});

function editTask(id){
    let tasks = getTaskFormLocalStorage();
    if(tasks.length > 0){
        taskNameEl.value = tasks[id].name;
        btnAddTaskEl.setAttribute("id", id);
    }
}

function deleteTask(id){
    if(confirm('Are you sure you want to delete')){
        let tasks = getTaskFormLocalStorage();
        tasks.splice(id, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks(getTaskFormLocalStorage());
    }
}


function renderTasks(task = []) {
    let content = "<ul>"
    task.forEach((task, index) => {
        content += ` 
        <li>
            <div class="task-name">${task.name}</div>
            <a href="#" onclick="editTask(${index})">Edit</a>
            <a href="#" onclick="deleteTask(${index})">Delete</a>
        </li>`
    });
    content += "</ul>"

    document.querySelector("#result").innerHTML = content;
}

function getTaskFormLocalStorage() {
    return localStorage.getItem("tasks")? JSON.parse(localStorage.getItem("tasks")): [];
}
