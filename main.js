const Addbtn = document.querySelector(".Addbtn");
const taskTitle = document.getElementById("title");
const taskDescription = document.getElementById("Description");
const tasklist = document.getElementById("taskList");
const inputs = document.querySelectorAll(".todo-input");

//saving to localstorage
    function saveTasks(){
        const tasks = [];
        document.querySelectorAll("#taskList li").forEach(li => {
            const checkbox = li.querySelector("input[type='checkbox']");
            const text = li.querySelector(".task-text").textContent;
            const completed = li.classList.contains("completed");
            tasks.push({text, completed:checkbox.checked });
        });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    //creating Elements
function createTaskElement(task) {
    const li = document.createElement("li");
    const taskLeft = document.createElement("div");
    taskLeft.classList.add("task-left");

    const checkbox = document.createElement("input");
    checkbox.classList.add("checkbox");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    const span = document.createElement("span");
    span.classList.add("task-text");
    span.textContent = task.text;
    if(task.completed)
        span.classList.add("completed-text");

    checkbox.addEventListener("change", () => {
        span.classList.toggle("completed-text", checkbox.checked);
        saveTasks();
    });
    taskLeft.appendChild(checkbox);
    taskLeft.appendChild(span);

            const DeleteBtn = document.createElement("button");
    DeleteBtn.textContent = "Delete";
    DeleteBtn.classList.add("DeleteBtn");
    DeleteBtn.addEventListener("click", () => {
        li.remove();
        saveTasks();
    });
    li.appendChild(taskLeft);
    li.appendChild(DeleteBtn);

    return li;
}

function addTask() {
    const title = taskTitle.value.trim();
    const Description = taskDescription.value.trim();
    if (!title) {
        alert ("please enter a task title")
        return;
    }
    const text= Description ? `${title} - ${Description}`: title;
    const li = createTaskElement({ text, completed: false});
    tasklist.appendChild(li);
    saveTasks();
    taskTitle.value = "";
    taskDescription.value = "";
    taskTitle.focus();
}

function loadTasks(){
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task =>{
        const li = createTaskElement(task);
        tasklist.appendChild(li);
    });
}

inputs.forEach((input, index) => {
    input.addEventListener("keydown", (e) => {
        if(e.key === "Enter") {
            e.preventDefault();

            if(index < inputs.length -1) {
                inputs [index + 1].focus();
            }else {
                Addbtn.click();
            }
        }
    });
});

Addbtn.addEventListener("click", addTask);
loadTasks();
