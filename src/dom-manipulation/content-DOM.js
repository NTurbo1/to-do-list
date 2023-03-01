function loadNewTaskBar() {
    const contentDiv = document.querySelector("#content");
    contentDiv.classList.add("todays-content");

    const todayHeaderDiv = document.createElement("div");
    todayHeaderDiv.id = "today-header-div";

    const todayHeader = document.createElement("h1");
    todayHeader.id = "today-header";
    todayHeader.textContent = "Today";

    todayHeaderDiv.appendChild(todayHeader);

    const newTaskBar = document.createElement('div');
    newTaskBar.id = "todays-new-task-bar";
    newTaskBar.classList.add("new-task-bar");
    
    const newTaskHeader = document.createElement("h1");
    newTaskHeader.id = "todays-new-task-header";
    newTaskHeader.classList.add("new-task-header");
    newTaskHeader.textContent = "+ Add New Task ...";

    newTaskBar.appendChild(newTaskHeader);

    contentDiv.append(todayHeaderDiv, newTaskBar);
}

export {
    loadNewTaskBar
}