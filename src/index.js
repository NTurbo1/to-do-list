import {loadNavBarContent} from './dom-manipulation/nav-bar-DOM';
import {loadSideBarContent} from './dom-manipulation/side-bar-DOM';
import {loadNewTaskBar, loadContentHeaderDiv} from './dom-manipulation/content-DOM';

import './style/overall-home-page-style.css';
import './style/nav-bar-style.css';
import './style/side-bar-style.css';
import './style/content-style.css';

const contentDiv = document.querySelector("#content");
contentDiv.classList.add("todays-content");

loadNavBarContent();
loadSideBarContent();

loadContentHeaderDiv("todays-header-div", "todays-header", "Today");
loadNewTaskBar("todays-new-task-bar", "todays-new-task-header");