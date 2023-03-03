import { loadNewTaskBar, loadContentHeaderDiv } from './content-DOM';

import inboxIconSrc from '../icons/inbox-icon.png';
import todayIconSrc from '../icons/today-icon.png';
import sevenDaysIconSrc from '../icons/seven-days-icon.png';
import upcomingIconSrc from '../icons/upcoming-icon.png';
import projectsIconSrc from '../icons/projects-icon.png';

export {
    loadSideBarContent
}

function loadSideBarContent() {
    const sideBar = document.querySelector("#side-bar");

    //Loads #inbox-div
    loadSideBarChildDiv(sideBar, "inbox-div", "inbox-btn", "Inbox");

    //Loads #today-div
    loadSideBarChildDiv(sideBar, "today-div", "today-btn", "Today");

    //Loads #seven-days-div
    loadSideBarChildDiv(sideBar, "seven-days-div", "seven-days-btn", "Next 7 Days");

    //Loads #upcoming-div
    loadSideBarChildDiv(sideBar, "upcoming-div", "upcoming-btn", "Upcoming");

    //Loads #projects-div
    loadSideBarChildDiv(sideBar, "projects-div", "projects-btn", "Projects");
}

function loadSideBarChildDiv(sideBar, sideBarChildDivId, sideBarChildDivBtnId, 
                            sideBarChildDivBtnText) {

    const sideBarChildDiv = document.createElement('div');
    sideBarChildDiv.id = sideBarChildDivId;
    sideBarChildDiv.classList.add("side-bar-child-div");

    const sideBarChildDivBtn = document.createElement('button');
    sideBarChildDivBtn.id = sideBarChildDivBtnId;
    sideBarChildDivBtn.classList.add("side-bar-btn");
    sideBarChildDivBtn.textContent = sideBarChildDivBtnText;
    sideBarChildDivBtn.addEventListener('click', e => {

        let sideBarChild = e.target.id.split("-")[0];
        const contentDiv = emptyContentDiv();

        let capitalizedSideBarChild = sideBarChild.slice(0, 1).toUpperCase() + sideBarChild.slice(1);

        if (sideBarChild === "seven") {
            capitalizedSideBarChild = "Next 7 Days";
            sideBarChild += "-days";
        }

        loadContentHeaderDiv(sideBarChild + "-header-div", sideBarChild + "-header", 
                            capitalizedSideBarChild);

        if (sideBarChild === "today") {
            sideBarChild = sideBarChild + "s";
        }
        
        contentDiv.classList.add(sideBarChild + "-content");

        //loadNewTaskBar() should be called after adding a class to contentDiv
        loadNewTaskBar(sideBarChild + "-new-task-bar", sideBarChild + "-new-task-header");
    });         

    const sideBarChildIcon = new Image();
    let sideBarChild = sideBarChildDivId.split("-")[0];

    if (sideBarChild === "today") {
        sideBarChildIcon.src = todayIconSrc;
    } else if (sideBarChild === "inbox") {
        sideBarChildIcon.src = inboxIconSrc;
    } else if (sideBarChild === "seven") {
        sideBarChildIcon.src = sevenDaysIconSrc;
    } else if (sideBarChild === "upcoming") {
        sideBarChildIcon.src = upcomingIconSrc;
    } else if (sideBarChild === "inbox") {
        sideBarChildIcon.src = inboxIconSrc;
    } else if (sideBarChild === "projects") {
        sideBarChildIcon.src = projectsIconSrc;
    }

    sideBarChildIcon.id = sideBarChild + "-icon";
    sideBarChildIcon.classList.add("side-bar-icon");

    sideBarChildDiv.append(sideBarChildIcon, sideBarChildDivBtn);

    sideBar.appendChild(sideBarChildDiv);
}

function emptyContentDiv() { //Returns an emptied contentDiv
    const contentDiv = document.querySelector("#content");
    contentDiv.classList.remove("inbox-content", "todays-content", "seven-days-content", 
                                "upcoming-content", "projects-content");

    const currentContentHeaderDiv = document.querySelector(".content-header-div");
    const currentNewTaskBar = document.querySelector(".new-task-bar");

    contentDiv.removeChild(currentContentHeaderDiv);
    contentDiv.removeChild(currentNewTaskBar);

    return contentDiv;
}