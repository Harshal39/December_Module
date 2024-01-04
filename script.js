window.addEventListener('load', () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector("#tasks");

    // Retrieve tasks from local storage on page load
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to save tasks to local storage
    const saveTasksToLocalStorage = () => {
        localStorage.setItem('tasks', JSON.stringify(savedTasks));
    };

    // Function to render tasks from local storage
    const renderTasksFromLocalStorage = () => {
        list_el.innerHTML = '';
        savedTasks.forEach(task => {
            const task_el = createTaskElement(task);
            list_el.appendChild(task_el);
        });
    };

    // Function to create task element
    const createTaskElement = (task) => {
        const task_el = document.createElement("div");
        task_el.classList.add("task");

        const task_content_el = document.createElement("div");
        task_content_el.classList.add("content");

        task_el.appendChild(task_content_el);

        const task_input_el = document.createElement("input");
        task_input_el.classList.add("text");
        task_input_el.type = "text";
        task_input_el.value = task;
        task_input_el.setAttribute("readonly", "readonly");

        task_content_el.appendChild(task_input_el);

        const task_actions_el = document.createElement("div");
        task_actions_el.classList.add("actions");

        const task_edit_el = document.createElement("button");
        task_edit_el.classList.add("edit");
        task_edit_el.innerHTML = "Edit";

        const task_delete_el = document.createElement("button");
        task_delete_el.classList.add("delete");
        task_delete_el.innerHTML = "Delete";

        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);

        task_el.appendChild(task_actions_el);

        // Event listener for Edit button
        task_edit_el.addEventListener('click', (e) => {
            toggleEdit(task_edit_el, task_input_el);
            saveTasksToLocalStorage();
        });

        // Event listener for Delete button
        task_delete_el.addEventListener('click', (e) => {
            list_el.removeChild(task_el);
            savedTasks.splice(savedTasks.indexOf(task), 1);
            saveTasksToLocalStorage();
        });

        return task_el;
    };

    // Function to toggle task edit mode
    const toggleEdit = (editButton, inputElement) => {
        if (editButton.innerText.toLowerCase() === "edit") {
            editButton.innerText = "Save";
            inputElement.removeAttribute("readonly");
            inputElement.focus();
        } else {
            editButton.innerText = "Edit";
            inputElement.setAttribute("readonly", "readonly");
        }
    };

    // Render tasks from local storage on page load
    renderTasksFromLocalStorage();

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value;
        if (!task) {
            alert("Please fill out the task");
            return;
        }

        // Add task to savedTasks array
        savedTasks.push(task);

        // Save tasks to local storage
        saveTasksToLocalStorage();

        // Create and append task element to the DOM
        const task_el = createTaskElement(task);
        list_el.appendChild(task_el);

        input.value = "";
    });
});
