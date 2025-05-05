document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => addTask(task.text, task.completed));
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll("li").forEach(task => {
            tasks.push({
                text: task.querySelector("span").textContent,
                completed: task.classList.contains("completed")
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function addTask(text, completed = false) {
        if (text.trim() === "") return;

        const li = document.createElement("li");
        const span = document.createElement("span");
        span.textContent = text;
        li.appendChild(span);

        const checkButton = document.createElement("button");
        checkButton.textContent = "✔";
        checkButton.addEventListener("click", () => {
            li.classList.toggle("completed");
            saveTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "❌";
        deleteButton.addEventListener("click", () => {
            li.remove();
            saveTasks();
        });

        li.appendChild(checkButton);
        li.appendChild(deleteButton);
        if (completed) li.classList.add("completed");

        taskList.appendChild(li);
        saveTasks();
    }

    addTaskButton.addEventListener("click", () => {
        addTask(taskInput.value);
        taskInput.value = "";
    });

    taskInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            addTask(taskInput.value);
            taskInput.value = "";
        }
    });

    loadTasks();
});
