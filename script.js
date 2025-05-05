document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    // Charger les tâches depuis localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => addTask(task.text, task.completed));
    }

    // Sauvegarder les tâches dans localStorage
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

    // Ajouter une nouvelle tâche
    function addTask(text, completed = false) {
        if (text.trim() === "") return;

        const li = document.createElement("li");

        // Case à cocher
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = completed;
        checkbox.addEventListener("change", () => {
            li.classList.toggle("completed");
            saveTasks();
        });

        const span = document.createElement("span");
        span.textContent = text;

        // Bouton pour supprimer la tâche
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "❌";
        deleteButton.classList.add("delete");
        deleteButton.addEventListener("click", () => {
            li.remove();
            saveTasks();
        });

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton);
        if (completed) li.classList.add("completed");

        taskList.appendChild(li);
        saveTasks();
    }

    // Ajouter une tâche via le bouton
    addTaskButton.addEventListener("click", () => {
        addTask(taskInput.value);
        taskInput.value = "";
    });

    // Ajouter une tâche en appuyant sur "Enter"
    taskInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            addTask(taskInput.value);
            taskInput.value = "";
        }
    });

    // Charger les tâches au démarrage
    loadTasks();
});
