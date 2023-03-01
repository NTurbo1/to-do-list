import inboxIconSrc from '../icons/inbox-icon.png';
import todayIconSrc from '../icons/today-icon.png';
import sevenDaysIconSrc from '../icons/seven-days-icon.png';
import upcomingIconSrc from '../icons/upcoming-icon.png';
import projectsIconSrc from '../icons/projects-icon.png';

function loadSideBarContent() {
    const sideBar = document.querySelector("#side-bar");

    //Loads #inbox-div
    loadInboxDiv(sideBar);

    //Loads #today-div
    loadTodayDiv(sideBar);

    //Loads #seven-days-div
    loadSevenDaysDiv(sideBar);

    //Loads #upcoming-div
    loadUpcomingDiv(sideBar);

    //Loads #projects-div
    loadProjectsDiv(sideBar);
}

export {
    loadSideBarContent
}

function loadInboxDiv(sideBar) {
    const inboxDiv = document.createElement('div');
    inboxDiv.id = "inbox-div";
    inboxDiv.classList.add("side-bar-child-div");

    const inboxBtn = document.createElement('button');
    inboxBtn.id = "inbox-btn";
    inboxBtn.classList.add("side-bar-btn");
    inboxBtn.textContent = "Inbox";

    const inboxIcon = new Image();
    inboxIcon.src = inboxIconSrc;
    inboxIcon.id = "inbox-icon";
    inboxIcon.classList.add("side-bar-icon");

    inboxDiv.append(inboxIcon, inboxBtn);

    sideBar.appendChild(inboxDiv);
}

function loadTodayDiv(sideBar) {
    const todayDiv = document.createElement('div');
    todayDiv.id = "today-div";
    todayDiv.classList.add("side-bar-child-div");

    const todayBtn = document.createElement('button');
    todayBtn.id = "today-btn";
    todayBtn.classList.add("side-bar-btn");
    todayBtn.textContent = "Today";

    const todayIcon = new Image();
    todayIcon.src = todayIconSrc;
    todayIcon.id = "today-icon";
    todayIcon.classList.add("side-bar-icon");

    todayDiv.append(todayIcon, todayBtn);

    sideBar.appendChild(todayDiv);
}

function loadSevenDaysDiv(sideBar) {
    const sevenDaysDiv = document.createElement('div');
    sevenDaysDiv.id = "seven-days-div";
    sevenDaysDiv.classList.add("side-bar-child-div");

    const sevenDaysBtn = document.createElement('button');
    sevenDaysBtn.id = "seven-days-btn";
    sevenDaysBtn.classList.add("side-bar-btn");
    sevenDaysBtn.textContent = "Next 7 Days";

    const sevenDaysIcon = new Image();
    sevenDaysIcon.src = sevenDaysIconSrc;
    sevenDaysIcon.id = "seven-days-icon";
    sevenDaysIcon.classList.add("side-bar-icon");

    sevenDaysDiv.append(sevenDaysIcon, sevenDaysBtn);

    sideBar.appendChild(sevenDaysDiv);
}

function loadUpcomingDiv(sideBar) {
    const upcomingDiv = document.createElement('div');
    upcomingDiv.id = "upcoming-div";
    upcomingDiv.classList.add("side-bar-child-div");

    const upcomingBtn = document.createElement('button');
    upcomingBtn.id = "upcoming-btn";
    upcomingBtn.classList.add("side-bar-btn");
    upcomingBtn.textContent = "Upcoming";

    const upcomingIcon = new Image();
    upcomingIcon.src = upcomingIconSrc;
    upcomingIcon.id = "upcoming-icon";
    upcomingIcon.classList.add("side-bar-icon");

    upcomingDiv.append(upcomingIcon, upcomingBtn);

    sideBar.appendChild(upcomingDiv);
}

function loadProjectsDiv(sideBar) {
    const projectsDiv = document.createElement('div');
    projectsDiv.id = "projects-div";
    projectsDiv.classList.add("side-bar-child-div");

    const projectsBtn = document.createElement('button');
    projectsBtn.id = "projects-btn";
    projectsBtn.classList.add("side-bar-btn");
    projectsBtn.textContent = "Projects";

    const projectsIcon = new Image();
    projectsIcon.src = projectsIconSrc;
    projectsIcon.id = "projects-icon";
    projectsIcon.classList.add("side-bar-icon");

    projectsDiv.append(projectsIcon, projectsBtn);

    sideBar.appendChild(projectsDiv);
}