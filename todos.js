document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const saveTasksBtn = document.getElementById('saveTasksBtn');

    // Load tasks from local storage on page load
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to render tasks
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(function (task, index) {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `
                <span>${task}</span>
                <div>
                    <input type="checkbox" id="checkbox-${index}" class="mr-2">
                    <button class="btn btn-danger btn-sm delete-btn">Delete</button>
                </div>
            `;
            taskList.appendChild(li);

            // Add event listener for delete button
            const deleteBtn = li.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', function () {
                tasks.splice(index, 1);
                renderTasks();
            });

            // Add event listener for checkbox
            const checkbox = li.querySelector(`#checkbox-${index}`);
            checkbox.addEventListener('change', function () {
                if (checkbox.checked) {
                    li.style.textDecoration = 'line-through';
                } else {
                    li.style.textDecoration = 'none';
                }
            });
        });
    }

    // Render tasks on page load
    renderTasks();

    // Function to add new task
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            tasks.push(taskText);
            renderTasks();
            taskInput.value = '';
        }
    }

    // Event listener for add task button
    addTaskBtn.addEventListener('click', addTask);

    // Event listener for save tasks button
    saveTasksBtn.addEventListener('click', function () {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        alert('Tasks saved successfully!');
    });
});
