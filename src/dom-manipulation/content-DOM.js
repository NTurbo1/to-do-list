import {allTasks, createNewtoDoTask, removeTaskWithTitle, returnToDoTasksDueOn, 
        returnToDoTasksDueNotOn, returnToDoTasksDueBetween, returnToDoTasksWithoutDueDates
    } from '../app-logic/to-do-task';
import addDays from 'date-fns/addDays';

export {
    loadNewTaskBar, loadContentHeaderDiv, loadTodaysToDoTasks, loadAllToDoTasks,
    loadUpcomingToDoTasks, loadNextSevenDaysToDoTasks, loadInboxToDoTasks
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
        disableAllSideBarBtns();
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

    const toDoTasksDiv = document.querySelector(".to-do-tasks-div");

    if(toDoTasksDiv !== null) {
        contentDiv.removeChild(toDoTasksDiv);
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

    const newTaskFormBtnsDiv = document.createElement('div');
    newTaskFormBtnsDiv.classList.add("new-task-form-btns-div");
    const newTaskBtnDiv = createNewTaskBtnDiv();
    const newTaskFormDivCloseBtnDiv = createNewTaskFormDivCloseBtnDiv();
    newTaskFormBtnsDiv.append(newTaskBtnDiv, newTaskFormDivCloseBtnDiv);

    let dueDateDiv = createNewTaskInputDiv("dueDate-div", "dueDate-label", "Due Date", 
                                            "dueDate-input", "date", false);

    if (newTaskFormId.split("-")[0] === "todays") {
        let dueDateInput = dueDateDiv.children[1];
        dueDateInput.disabled = true;
    } 

    newTaskForm.append(titleDiv, descriptionDiv, dueDateDiv, highPriorityDiv, 
                        mediumPriorityDiv, lowPriorityDiv, projectSelectDiv, 
                        newTaskFormBtnsDiv);
    
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

    //No project option
    const noProjectOption =  document.createElement("option");
    noProjectOption.textContent = "No Project";
    noProjectOption.value = "";

    projectSelect.append(projectOption1, projectOption2, noProjectOption);
    projectSelectDiv.appendChild(projectSelect);

    return projectSelectDiv;
}

function createNewTaskBtnDiv() {

    const newTaskBtnDiv = document.createElement('div');
    newTaskBtnDiv.classList.add("new-task-btn-div");

    const newTaskBtn = document.createElement("button");
    newTaskBtn.classList.add("new-task-btn");
    newTaskBtn.textContent = "Add";
    newTaskBtn.type = "submit";

    newTaskBtn.addEventListener('click', e => {
        e.preventDefault();
        
        const titleInputValue = document.querySelector(".title-input").value;
        const descriptionInputValue = document.querySelector(".description-input").value;
        const dueDateInputValue = document.querySelector(".dueDate-input").value;

        let priorityInputValue = "";
        for (let radioInput of document.getElementsByName("priority")) {
            if (radioInput.checked) {
                priorityInputValue = radioInput.value;
                break;
            }
        }

        const projectInputValue = document.querySelector(".project-select").value;

        let newToDoTask = createNewtoDoTask(titleInputValue, descriptionInputValue, 
                                            dueDateInputValue, priorityInputValue,
                                            projectInputValue);

        allTasks.push(newToDoTask);

        reloadInsideContentDivAfterNewTaskForm();

        enableAllSideBarBtnsExceptTheOneThatLoadsCurrentContentDivContent();
    });

    newTaskBtnDiv.appendChild(newTaskBtn);

    return newTaskBtnDiv;
}

function createNewTaskFormDivCloseBtnDiv() {
    const newTaskFormCloseBtnDiv = document.createElement('div');
    newTaskFormCloseBtnDiv.classList.add("new-task-form-close-btn-div");

    const newTaskFormCloseBtn = document.createElement("button");
    newTaskFormCloseBtn.classList.add("new-task-form-close-btn");
    newTaskFormCloseBtn.textContent = "Close";

    newTaskFormCloseBtn.addEventListener('click', e => {
        reloadInsideContentDivAfterNewTaskForm();
        enableAllSideBarBtnsExceptTheOneThatLoadsCurrentContentDivContent();
    });

    newTaskFormCloseBtnDiv.appendChild(newTaskFormCloseBtn);

    return newTaskFormCloseBtnDiv;
}

function reloadInsideContentDivAfterNewTaskForm() {
    const contentDiv = document.getElementById("content");
    const formDiv = document.querySelector(".new-task-form-div");
    contentDiv.removeChild(formDiv);

    if (contentDiv.classList.contains("todays-content")) {
        loadTodaysToDoTasks();
        loadNewTaskBar("todays-new-task-bar", "todays-new-task-header");
    } else if (contentDiv.classList.contains("inbox-content")) {
        loadInboxToDoTasks();
        loadNewTaskBar("inbox-new-task-bar", "inbox-new-task-header");
    } else if (contentDiv.classList.contains("upcoming-content")) {
        loadUpcomingToDoTasks();
        loadNewTaskBar("upcoming-new-task-bar", "upcoming-new-task-header");
    } else if (contentDiv.classList.contains("seven-days-content")) {
        loadNextSevenDaysToDoTasks();
        loadNewTaskBar("seven-days-new-task-bar", "seven-days-new-task-header");
        } //else if (contentDiv.classList.contains("projects-content")) {
    //     //function to load projects
    //     loadNewTaskBar("projects-new-task-bar", "projects-new-task-header");
    // }
}

function enableAllSideBarBtnsExceptTheOneThatLoadsCurrentContentDivContent() {
    const sideBarBtns = document.querySelectorAll(".side-bar-btn");
    let identifier = document.getElementById("content").classList[0].split("-")[0];

    if (identifier === "todays") {
        identifier = "todays"; 
    } else if (identifier === "seven") {
        identifier = "seven-days";
    }

    identifier += "-btn";

    // enables all the side bar btns except the one that loads the current "contentDiv's" 
    // content when is clicked.  
    sideBarBtns.forEach(sideBarBtn => {   
        if (sideBarBtn.id !== identifier) {
            sideBarBtn.disabled = false;
        }
    });
}

function disableAllSideBarBtns() {
    const sideBarBtns = document.querySelectorAll(".side-bar-btn");
    sideBarBtns.forEach(sideBarBtn => { // disables all the side bar btns.
        sideBarBtn.disabled = true;
    });
}

function loadTodaysToDoTasks() {
    let todaysToDoTasks = returnToDoTasksDueOn(toYyyyMmDdFormat(new Date()));
    if (todaysToDoTasks.length > 0) {
        loadToDoTasksIn(todaysToDoTasks);
    }
}

function loadAllToDoTasks() {
    if (allTasks.length > 0) {
        loadToDoTasksIn(allTasks);
    }
}

function loadUpcomingToDoTasks() {
    let upcomingToDoTasks = returnToDoTasksDueNotOn(toYyyyMmDdFormat(new Date()));
    if (upcomingToDoTasks.length > 0) {
        loadToDoTasksIn(upcomingToDoTasks);
    }
}

function loadNextSevenDaysToDoTasks() {
    let today = new Date();
    let afterSevenDays = addDays(today, 7);
    console.log("after7Days: " + afterSevenDays);
    let toDoTasksForNextSevenDays = returnToDoTasksDueBetween(toYyyyMmDdFormat(today), 
                                                            toYyyyMmDdFormat(afterSevenDays));
    console.log(toDoTasksForNextSevenDays);
    loadToDoTasksIn(toDoTasksForNextSevenDays);
}

function loadInboxToDoTasks() {
    let toDoTasksWithoutDueDates = returnToDoTasksWithoutDueDates();
    if (toDoTasksWithoutDueDates.length > 0) {
        loadToDoTasksIn(toDoTasksWithoutDueDates);
    }
}

function loadToDoTasksIn(toDoTasksList) {

    const contentDiv = document.getElementById("content");
    const newTaskBar = document.querySelector(".new-task-bar");
    let toDoTasksDiv = document.createElement('div');
    toDoTasksDiv.classList.add("to-do-tasks-div");
    contentDiv.insertBefore(toDoTasksDiv, newTaskBar);

    toDoTasksList.forEach( toDoTask => {
        const toDoTaskDiv = document.createElement('div');
        toDoTaskDiv.classList.add("to-do-task-div");

        let toDoTaskLabel = document.createElement("label");
        toDoTaskLabel.classList.add("to-do-task-label");
        toDoTaskLabel.textContent = toDoTask.title;

        const toDoTaskInput = document.createElement('input');
        toDoTaskInput.type = "checkbox";
        toDoTaskInput.id = toDoTask.title.split(" ").join("-");

        toDoTaskLabel.htmlFor = toDoTaskInput.id; //Sets the label's 'for' to the input's id

        toDoTaskInput.addEventListener('change', e => {
            const taskInput = e.target;
            const taskDiv = taskInput.parentElement; 

            if (taskInput.checked) {
                let toDoTasksDiv = document.querySelector(".to-do-tasks-div");
                toDoTasksDiv.removeChild(taskDiv);
                
                removeTaskWithTitle(taskDiv.lastChild.textContent);
            }
        });

        toDoTaskDiv.appendChild(toDoTaskInput);
        toDoTaskDiv.appendChild(toDoTaskLabel);

        toDoTasksDiv.appendChild(toDoTaskDiv);
    });
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

