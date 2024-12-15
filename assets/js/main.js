// DOM Elements
let form = document.querySelector("form");
let input = document.getElementById("input-task");
let buttonSave = document.getElementById("button-save");
let list = document.querySelector(".list");

// To track task edit mode
let editingIndex = -1;

// Task array to store task objects
let tasksArray =/*  localStorage.getItem("tasks")?localStorage.getItem("tasks"): */[];

// Function to create a task list item (li)
function createTaskElement(task, index) {
    let li = document.createElement("li");

    // Checkbox
    let inputCheckbox = document.createElement("input");
    inputCheckbox.type = "checkbox";
    inputCheckbox.classList.add("checkbox-input");
    inputCheckbox.id = `task${index}`;
    inputCheckbox.onclick =  () => changeCheckBox(index , `task${index}`);
    // Label
    let label = document.createElement("label");
    label.setAttribute("for", `task${index}`);
    label.innerText = task.value;
    label.classList.add("task-text");

    let divButton = document.createElement("div");
    divButton.classList.add("buttons");

    // Edit Button
    let buttonEdit = document.createElement("button");
    buttonEdit.classList.add("task-edit");
    buttonEdit.innerText = "Edit";
    buttonEdit.onclick = () => editTask(index);

    // Delete Button
    let buttonDelete = document.createElement("button");
    buttonDelete.classList.add("task-delete");
    buttonDelete.innerText = "Delete";
    buttonDelete.onclick = () => deleteTask(index);
    

    divButton.appendChild(buttonEdit)
    divButton.appendChild(buttonDelete)
    // Append all elements to the list item
    li.appendChild(inputCheckbox);
    li.appendChild(label);
    li.appendChild(divButton);


    return li;
}

// Function to delete a task
function deleteTask(index) {
    tasksArray.splice(index, 1); // Remove task from array
    localStorage.setItem("tasks" , JSON.stringify(tasksArray)) 

    renderTasks(); // Re-render tasks

}

// Function to edit a task
function editTask(index) {
    buttonSave.innerText = "Update Task"; // Change button text
    input.value = tasksArray[index].value; // Set input value to task value
    editingIndex = index; // Set editing index

}

/* If Chane In CheckBox What Do */
function changeCheckBox(index,id){
      // Get the checkbox
    let checkBox = document.getElementById(id);
      // If the checkbox is checked, display the output text
  if (checkBox.checked == true){
     tasksArray[index].doneTask = true
  } else {
    tasksArray[index].doneTask = false
    
  }
  /* Save Data In Local Storage */
  localStorage.setItem("tasks" , JSON.stringify(tasksArray)) 
}
// Function to add a new task
function addTask() {
    if (input.value.trim()) {
        const newTask = { value: input.value.trim(), doneTask: false };
        tasksArray?.push(newTask); // Add task to array
        localStorage.setItem("tasks" , JSON.stringify(tasksArray)) 
        renderTasks(); // Re-render tasks
        input.value = ""; // Clear input
    }
}

// Function to render tasks
function renderTasks() {
    /*if (!localStorage.getItem("tasks")) {
        console.log("first")
     localStorage.removeItem("tasks")
        let noAnyELement = document.createElement("h4")
        noAnyELement.innerText = "No Any TodoList"
        list.appendChild(noAnyELement) 
    } */
    if(localStorage.getItem("tasks")){
        tasksArray =JSON.parse( localStorage.getItem("tasks"))
    }  if(tasksArray == ""){
        localStorage.removeItem("tasks")
        list.innerHTML = ""
        let noAnyELement = document.createElement("h4")
        noAnyELement.textContent  = "No Any TodoList"
        list.appendChild(noAnyELement) 
        /* To Exit To This Medods */
        return false
    }


    list.innerHTML = ""; // Clear current tasks
    let h4 = document.createElement("h4")
    h4.textContent = "List of Works Todo List:";
    list.appendChild(h4)
    tasksArray.forEach((task, index) => {
        let taskElement = createTaskElement(task, index);
        list.appendChild(taskElement); // Add task element to the list
    });
}

renderTasks();
// Form submit event listener
form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form submission
    if (input.value.trim()) {
        if (editingIndex > -1) {
            // Update existing task if editing
            tasksArray[editingIndex].value = input.value.trim();
            console.log(tasksArray[editingIndex].doneTask)
            buttonSave.innerText = "Save Task"; // Reset button text
            input.value = ""; // Clear input
            editingIndex = -1; // Reset editing index
            localStorage.setItem("tasks" , JSON.stringify(tasksArray)) 

            renderTasks(); // Re-render tasks
        } else {
            // Add new task
            addTask();
        }
    }
});
