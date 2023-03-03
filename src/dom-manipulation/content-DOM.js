export {
    loadNewTaskBar,
    loadContentHeaderDiv
}

function loadNewTaskBar(newTaskBarId, newTaskHeaderId) {
    const contentDiv = document.querySelector("#content");

    const newTaskBar = document.createElement('div');
    newTaskBar.id = newTaskBarId;
    newTaskBar.classList.add("new-task-bar");
    newTaskBar.classList.add("new-task-bar-hover");

    newTaskBar.addEventListener('click', newTaskBarClicked);

    if (contentDiv.classList.contains("todays-content")) {
        newTaskBar.addEventListener('click', loadTodaysNewTaskForm);
    }
    
    const newTaskHeader = document.createElement("h1");
    newTaskHeader.id = newTaskHeaderId;
    newTaskHeader.classList.add("new-task-header");
    newTaskHeader.textContent = "+ Add New Task ...";

    newTaskBar.appendChild(newTaskHeader);

    contentDiv.appendChild(newTaskBar);
}

function loadContentHeaderDiv(contentHeaderDivId, contentHeaderId, contentHeaderText) {
    const contentDiv = document.querySelector("#content");

    const div = document.createElement("div");
    div.id = contentHeaderDivId;
    div.classList.add("content-header-div");

    const header = document.createElement("h1");
    header.id = contentHeaderId;
    header.classList.add("content-header");
    header.textContent = contentHeaderText;

    div.appendChild(header);

    contentDiv.appendChild(div);
}

function newTaskBarClicked() {
    this.classList.remove("new-task-bar-hover");
    this.classList.add("new-task-bar-hover");
}

function loadTodaysNewTaskForm() {
    const todaysContentDiv = document.querySelector(".todays-content");
    const todaysNewTaskBar = document.querySelector("#todays-new-task-bar");

    todaysContentDiv.removeChild(todaysNewTaskBar);

    const todaysTasksDiv = document.querySelector("#todays-tasks-div");

    if(todaysTasksDiv !== null) {
        todaysContentDiv.removeChild(todaysTasksDiv);
    }

    const todaysNewTaskFormDiv = document.createElement('div');
    todaysNewTaskFormDiv.id = "todays-new-task-form-div";

    const todaysNewTaskForm = createTodaysNewTaskForm();

    todaysNewTaskFormDiv.appendChild(todaysNewTaskForm);

    todaysContentDiv.appendChild(todaysNewTaskFormDiv);
}

function createTodaysNewTaskForm() {
    const todaysNewTaskForm = document.createElement('form');
    todaysNewTaskForm.id = "todays-new-task-form";

    const titleDiv = createNewTaskInputDiv("title-div", "title-label", 
                                      "Title", "title-input", "text", true);
    
    const descriptionDiv = createNewTaskInputDiv("description-div", "description-label", 
                                            "Description", "description-input", "text", 
                                            false);

    const highPriorityDiv = createNewTaskInputDiv("high-priority-div", "high-priority-label", 
                                    "High Priority", "high-priority-input", "radio", true);

    const mediumPriorityDiv = createNewTaskInputDiv("medium-priority-div", "medium-priority-label", 
                                    "Medium Priority", "medium-priority-input", "radio", true);

    const lowPriorityDiv = createNewTaskInputDiv("low-priority-div", "low-priority-label", 
                                    "Low Priority", "low-priority-input", "radio", true);

    const projectSelectDiv = createProjectSelectDiv();

    const newTaskBtnDiv = createNewTaskBtnDiv();

    todaysNewTaskForm.append(titleDiv, descriptionDiv, highPriorityDiv, mediumPriorityDiv,
                            lowPriorityDiv, projectSelectDiv, newTaskBtnDiv);

    return todaysNewTaskForm;
    
}

function createNewTaskInputDiv(inputDivClass, labelClass, labelText, inputClass, 
                          inputType, isRequired) {

    const div = document.createElement("div");
    div.classList.add(inputDivClass);
    div.classList.add("new-task-form-input-div");
    
    const label = document.createElement("label");
    label.classList.add(labelClass);
    label.textContent = labelText;

    const input = document.createElement("input");
    input.classList.add(inputClass);
    input.type = inputType;

    if (isRequired) {
        input.required = true;
    }

    if (inputType === "radio") {
        let labelTextWords = labelText.toLowerCase().split(" ");
        const inputId = labelTextWords.join("-");
        input.id = inputId;

        input.name = "priority"; 

        if (labelTextWords.includes("high")) {
            input.value = "High";
        } else if (labelTextWords.includes("medium")) {
            input.value = "Medium";
        } else {
            input.value = "Low";
        }

        input.classList.add("priority-input");
    }

    div.append(label, input);

    return div;
}

function createProjectSelectDiv() {
    const projectSelectDiv = document.createElement("div");
    projectSelectDiv.classList.add("project-select-div");

    const projectSelect = document.createElement("select");
    projectSelect.classList.add("project-select");

    //Sample options. Should be obtained dynamically in the future
    const projectOption1 =  document.createElement("option");
    projectOption1.textContent = "Project 1";
    projectOption1.value = "Project 1"

    const projectOption2 =  document.createElement("option");
    projectOption2.textContent = "Project 2";
    projectOption2.value = "Project 2";

    projectSelect.append(projectOption1, projectOption2);
    projectSelectDiv.appendChild(projectSelect);

    return projectSelectDiv;
}

function createNewTaskBtnDiv() {

    const newTaskBtnDiv = document.createElement('div');
    newTaskBtnDiv.id = "todays-new-task-btn-div";
    newTaskBtnDiv.classList.add("new-task-btn-div");

    const newTaskBtn = document.createElement("button");
    newTaskBtn.id = "todays-new-task-btn";
    newTaskBtn.classList.add("new-task-btn");
    newTaskBtn.textContent = "Add";
    newTaskBtn.type = "submit";

    newTaskBtnDiv.appendChild(newTaskBtn);

    return newTaskBtnDiv;
}