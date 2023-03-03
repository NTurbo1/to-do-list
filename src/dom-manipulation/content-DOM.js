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

    let newTaskFormDivId = returnAppropriateNewTaskFormDivIdAccordingTo(contentDiv.classList);
    newTaskBar.addEventListener('click', e => {
        loadNewTaskFormDiv(newTaskFormDivId);
    });
    
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

function loadNewTaskFormDiv(newTaskFormDivId) {

    const contentDiv = removeAllChildrenOfContentDivExceptContentHeaderDiv();

    const newTaskFormDiv = document.createElement('div');
    newTaskFormDiv.classList.add("new-task-form-div");
    newTaskFormDiv.id = newTaskFormDivId;

    const newTaskFormId = newTaskFormDivId.split("-").slice(0, -1).join("-");
    const newTaskForm = createNewTaskForm(newTaskFormId);

    newTaskFormDiv.appendChild(newTaskForm);

    contentDiv.appendChild(newTaskFormDiv);
}

function removeAllChildrenOfContentDivExceptContentHeaderDiv() { // Returns a contentDiv with
                                                                 // '.content-header-div' as
                                                                 // the only child.
    const contentDiv = document.querySelector("#content");
    const newTaskBar = document.querySelector(".new-task-bar");

    contentDiv.removeChild(newTaskBar);

    const tasksDiv = document.querySelector(".tasks-div");

    if(tasksDiv !== null) {
        contentDiv.removeChild(tasksDiv);
    }

    return contentDiv;
}

function createNewTaskForm(newTaskFormId) {
    const newTaskForm = document.createElement('form');
    newTaskForm.id = newTaskFormId;
    newTaskForm.classList.add("new-task-form");

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

    const newTaskBtnDiv = createNewTaskBtnDiv("todays-new-task-btn-div", 
                                                "todays-new-task-btn");

    let dueDateDiv = createNewTaskInputDiv("dueDate-div", "dueDate-label", "Due Date", 
                                            "dueDate-input", "date", false);

    if (newTaskFormId.split("-")[0] === "todays") {
        let dueDateInput = dueDateDiv.children[1];
        dueDateInput.disabled = true;
    } 

    newTaskForm.append(titleDiv, descriptionDiv, dueDateDiv, highPriorityDiv, 
                        mediumPriorityDiv, lowPriorityDiv, projectSelectDiv, newTaskBtnDiv);
    
    return newTaskForm;
    
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

    if (inputType === "date") {
        let today = toYyyyMmDdFormat(new Date());
        input.value = today;
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

function createNewTaskBtnDiv(newTaskBtnDivId, newTaskBtnId) {

    const newTaskBtnDiv = document.createElement('div');
    newTaskBtnDiv.id = newTaskBtnDivId;
    newTaskBtnDiv.classList.add("new-task-btn-div");

    const newTaskBtn = document.createElement("button");
    newTaskBtn.id = newTaskBtnId;
    newTaskBtn.classList.add("new-task-btn");
    newTaskBtn.textContent = "Add";
    newTaskBtn.type = "submit";

    newTaskBtnDiv.appendChild(newTaskBtn);

    return newTaskBtnDiv;
}

function returnAppropriateNewTaskFormDivIdAccordingTo(contentDivClassList) {
    if (contentDivClassList.contains("todays-content")) {
        return "todays-new-task-form-div";
    } else if (contentDivClassList.contains("inbox-content")) {
        return "inbox-new-task-form-div";
    } else if (contentDivClassList.contains("seven-days-content")) {
        return "seven-days-new-task-form-div";
    } else if (contentDivClassList.contains("upcoming-content")) {
        return "upcoming-new-task-form-div";
    } else {
        return "projects-new-task-form-div";
    }
}

function toYyyyMmDdFormat(date) {
    let yyyy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    
    if (dd < 10) {
        dd = "0" + dd;
    }

    if (mm < 10) {
        mm = "0" + mm; 
    }

    return yyyy + "-" + mm + "-" + dd;
}

