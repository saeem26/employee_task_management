let employees = [];

let tasks = [];

// Show employees
function loadEmployees() {
    let list = document.getElementById("employeeList");
    list.innerHTML = "";

    employees.forEach((emp, index) => {
        let li = document.createElement("li");

        let statusClass = emp.status === "Available" ? "available" : "busy";

        li.innerHTML = `
            ${emp.name}
            <div style="display: flex; gap: 5px;">
                <span class="status ${statusClass}">${emp.status}</span>
                <button onclick="removeEmployeeFromList(${index})" class="remove-btn">Remove</button>
            </div>
        `;

        list.appendChild(li);
    });
}

// Show tasks
function loadTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.className = "task-item";
        li.innerHTML = `
            ${task.description} (Assigned to: ${task.employee})
            <button onclick="completeTask(${index})" style="margin-left: 10px; background: #28a745; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">Complete</button>
        `;
        list.appendChild(li);
    });
}

// Add task and update status
function addTask() {
    let taskInput = document.getElementById("taskInput");
    let employeeInput = document.getElementById("employeeInput");
    let message = document.getElementById("taskMessage");

    let task = taskInput.value.trim();
    let employeeName = employeeInput.value.trim();

    if (task === "" || employeeName === "") {
        showMessage("Please fill all fields", "red");
        return;
    }

    let employee = employees.find(e => 
        e.name.toLowerCase() === employeeName.toLowerCase()
    );

    if (!employee) {
        showMessage("Employee not found", "red");
        return;
    }

    if (employee.status === "Busy") {
        showMessage("Employee is already busy", "red");
        return;
    }

    // Add task
    tasks.push({ description: task, employee: employee.name, completed: false });

    // Update status
    employee.status = "Busy";

    loadEmployees();
    loadTasks();

    // Clear input
    taskInput.value = "";
    employeeInput.value = "";

    showMessage("Task added successfully!", "green");
}

function completeTask(index) {
    let task = tasks[index];
    let employee = employees.find(e => e.name === task.employee);

    if (employee) {
        employee.status = "Available";
    }

    tasks.splice(index, 1);

    loadEmployees();
    loadTasks();

    showMessage("Task completed!", "green");
}

function showMessage(text, color) {
    let message = document.getElementById("taskMessage");
    message.textContent = text;
    message.style.color = color;
    message.style.display = "block";
    setTimeout(() => {
        message.style.display = "none";
    }, 3000);
}

// Add new employee
function addEmployee() {
    let input = document.getElementById("newEmployeeInput");
    let employeeName = input.value.trim();

    if (employeeName === "") {
        showEmployeeMessage("Please enter employee name", "red");
        return;
    }

    // Check if employee already exists
    if (employees.find(e => e.name.toLowerCase() === employeeName.toLowerCase())) {
        showEmployeeMessage("Employee already exists", "red");
        return;
    }

    // Add employee
    employees.push({ name: employeeName, status: "Available" });
    loadEmployees();
    updateEmployeeDatalist();
    updateRemoveEmployeeSelect();
    input.value = "";
    showEmployeeMessage("Employee added successfully!", "green");
}

// Remove employee
function removeEmployee() {
    let select = document.getElementById("removeEmployeeSelect");
    let employeeName = select.value.trim();

    if (employeeName === "") {
        showEmployeeMessage("Please select an employee to remove", "red");
        return;
    }

    // Find employee to remove
    let empIndex = employees.findIndex(e => e.name.toLowerCase() === employeeName.toLowerCase());

    if (empIndex === -1) {
        showEmployeeMessage("Employee not found", "red");
        return;
    }

    // Check if employee has tasks
    if (tasks.find(t => t.employee === employees[empIndex].name)) {
        showEmployeeMessage("Cannot remove employee with pending tasks", "red");
        return;
    }

    // Remove employee
    employees.splice(empIndex, 1);
    loadEmployees();
    updateEmployeeDatalist();
    updateRemoveEmployeeSelect();
    select.value = "";
    showEmployeeMessage("Employee removed successfully!", "green");
}

// Remove employee from list
function removeEmployeeFromList(index) {
    let emp = employees[index];
    
    // Check if employee has tasks
    if (tasks.find(t => t.employee === emp.name)) {
        showEmployeeMessage("Cannot remove employee with pending tasks", "red");
        return;
    }

    employees.splice(index, 1);
    loadEmployees();
    updateEmployeeDatalist();
    updateRemoveEmployeeSelect();
    showEmployeeMessage("Employee removed successfully!", "green");
}

// Update datalist with current employees
function updateEmployeeDatalist() {
    let datalist = document.getElementById("employees");
    datalist.innerHTML = "";

    employees.forEach(emp => {
        let option = document.createElement("option");
        option.value = emp.name;
        datalist.appendChild(option);
    });
}

// Update select dropdown with current employees
function updateRemoveEmployeeSelect() {
    let select = document.getElementById("removeEmployeeSelect");
    let currentValue = select.value;
    select.innerHTML = '<option value="">Select employee to remove</option>';

    employees.forEach(emp => {
        let option = document.createElement("option");
        option.value = emp.name;
        option.textContent = emp.name;
        select.appendChild(option);
    });

    select.value = currentValue;
}

// Show employee management message
function showEmployeeMessage(text, color) {
    let message = document.getElementById("employeeMessage");
    message.textContent = text;
    message.style.color = color;
    message.style.display = "block";
    setTimeout(() => {
        message.style.display = "none";
    }, 3000);
}

// Add new employee
function addEmployee() {
    let input = document.getElementById("newEmployeeInput");
    let employeeName = input.value.trim();

    if (employeeName === "") {
        showEmployeeMessage("Please enter employee name", "red");
        return;
    }

    // Check if employee already exists
    if (employees.find(e => e.name.toLowerCase() === employeeName.toLowerCase())) {
        showEmployeeMessage("Employee already exists", "red");
        return;
    }

    // Add employee
    employees.push({ name: employeeName, status: "Available" });
    loadEmployees();
    updateEmployeeDatalist();
    updateRemoveEmployeeSelect();
    input.value = "";
    showEmployeeMessage("Employee added successfully!", "green");
}

// Remove employee
function removeEmployee() {
    let select = document.getElementById("removeEmployeeSelect");
    let employeeName = select.value.trim();

    if (employeeName === "") {
        showEmployeeMessage("Please select an employee to remove", "red");
        return;
    }

    // Find employee to remove
    let empIndex = employees.findIndex(e => e.name.toLowerCase() === employeeName.toLowerCase());

    if (empIndex === -1) {
        showEmployeeMessage("Employee not found", "red");
        return;
    }

    // Check if employee has tasks
    if (tasks.find(t => t.employee === employees[empIndex].name)) {
        showEmployeeMessage("Cannot remove employee with pending tasks", "red");
        return;
    }

    // Remove employee
    employees.splice(empIndex, 1);
    loadEmployees();
    updateEmployeeDatalist();
    updateRemoveEmployeeSelect();
    select.value = "";
    showEmployeeMessage("Employee removed successfully!", "green");
}

// Update datalist with current employees
function updateEmployeeDatalist() {
    let datalist = document.getElementById("employees");
    datalist.innerHTML = "";

    employees.forEach(emp => {
        let option = document.createElement("option");
        option.value = emp.name;
        datalist.appendChild(option);
    });
}

// Update select dropdown with current employees
function updateRemoveEmployeeSelect() {
    let select = document.getElementById("removeEmployeeSelect");
    let currentValue = select.value;
    select.innerHTML = '<option value="">Select employee to remove</option>';

    employees.forEach(emp => {
        let option = document.createElement("option");
        option.value = emp.name;
        option.textContent = emp.name;
        select.appendChild(option);
    });

    select.value = currentValue;
}

// Show employee management message
function showEmployeeMessage(text, color) {
    let message = document.getElementById("employeeMessage");
    message.textContent = text;
    message.style.color = color;
    message.style.display = "block";
    setTimeout(() => {
        message.style.display = "none";
    }, 3000);
}

// Update employees list with remove buttons
function loadEmployees() {
    let list = document.getElementById("employeeList");
    list.innerHTML = "";

    employees.forEach((emp, index) => {
        let li = document.createElement("li");

        let statusClass = emp.status === "Available" ? "available" : "busy";

        li.innerHTML = `
            ${emp.name}
            <div style="display: flex; gap: 5px;">
                <span class="status ${statusClass}">${emp.status}</span>
            </div>
        `;

        list.appendChild(li);
    });
}

// Remove employee from list
function removeEmployeeFromList(index) {
    let emp = employees[index];
    
    // Check if employee has tasks
    if (tasks.find(t => t.employee === emp.name)) {
        showEmployeeMessage("Cannot remove employee with pending tasks", "red");
        return;
    }

    employees.splice(index, 1);
    loadEmployees();
    updateEmployeeDatalist();
    updateRemoveEmployeeSelect();
    showEmployeeMessage("Employee removed successfully!", "green");
}

// Load on page load
window.onload = function() {
    loadEmployees();
    loadTasks();
    updateEmployeeDatalist();
    updateRemoveEmployeeSelect();
};
