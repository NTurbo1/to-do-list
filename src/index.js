import {loadNavBarContent} from './dom-manipulation/nav-bar-DOM';
import {loadSideBarContent} from './dom-manipulation/side-bar-DOM';
import {loadNewTaskBar} from './dom-manipulation/content-DOM';

import './style/overall-home-page-style.css';
import './style/nav-bar-style.css';
import './style/side-bar-style.css';
import './style/content-style.css';

loadNavBarContent();
loadSideBarContent();
loadNewTaskBar();