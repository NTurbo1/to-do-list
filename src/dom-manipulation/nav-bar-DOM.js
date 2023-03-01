import Icon from "../icons/nav-bar-icon.png";

function loadNavBarContent() {
    const navBar = document.querySelector('#nav-bar');

    const navBarIcon = new Image();
    navBarIcon.src = Icon;
    navBarIcon.id = "nav-bar-icon";

    navBar.appendChild(navBarIcon);

    const navBarHeader = document.createElement('h1');
    navBarHeader.id = "nav-bar-header";
    navBarHeader.textContent = "To Do list";

    navBar.appendChild(navBarHeader)
}

export {
    loadNavBarContent
}