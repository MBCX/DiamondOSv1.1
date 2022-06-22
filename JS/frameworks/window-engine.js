/* Window Engine - MIT License - Copyright (c) 2019 Gauthier Staehler */

const metaTag = document.createElement("meta");
metaTag.name = "viewport";
metaTag.content = "user-scalable=1";
document.getElementsByTagName("head")[0].appendChild(metaTag);

const lastWindow = document.getElementsByClassName("windowGroup")[0].lastElementChild.id.substring(6);
const active = document.getElementsByClassName("window");

for (let i = 1; i <= lastWindow; i++) {
    createWindow(i);
}

function createWindow(id) {
    let windowID = document.getElementById("window" + id);
    let headerID = windowID.firstElementChild;
    headerID.id = "window" + id + "header";

    let createCloseButton = document.createElement("b");
    let aboutWindowButton = document.createElement("span");
    let maximizeWindowButton = document.createElement("span");
	let minimizeWindowButton = document.createElement("span");
	let divisor = document.createElement("div");
	
	//Close window button
    createCloseButton.id = "closeButton" + id;
    createCloseButton.innerHTML = "&times;";
	createCloseButton.classList.add('material-icons');
	createCloseButton.setAttribute("role", "tooltip");
	createCloseButton.setAttribute("aria-label", "Close this Window");
	createCloseButton.setAttribute("data-microtip-position", "bottom-left");
	createCloseButton.setAttribute("data-microtip-theme", "dark");
	
	//Maximize Button
    maximizeWindowButton.id = "maximizeWindowButton" + id;
    maximizeWindowButton.innerHTML = "&#9744;";
	maximizeWindowButton.classList.add('material-icons');
	maximizeWindowButton.setAttribute("role", "tooltip");
	maximizeWindowButton.setAttribute("aria-label", "Maximize Window");
	maximizeWindowButton.setAttribute("data-microtip-position", "bottom-left");
	maximizeWindowButton.setAttribute("data-microtip-theme", "dark");
	
	//Minimize Button
    minimizeWindowButton.id = "minimizeWindowButton" + id;
    minimizeWindowButton.innerHTML = "&#9866;";
	minimizeWindowButton.classList.add('material-icons');
	minimizeWindowButton.setAttribute("role", "tooltip");
	minimizeWindowButton.setAttribute("aria-label", "Minimize Window");
	minimizeWindowButton.setAttribute("data-microtip-position", "bottom-left");
	minimizeWindowButton.setAttribute("data-microtip-theme", "dark");
	
	//About window button
	aboutWindowButton.id = "aboutWindowButton" + id;
	aboutWindowButton.innerHTML = "&#9483;";
	aboutWindowButton.classList.add('material-icons');
	aboutWindowButton.setAttribute("role", "tooltip");
	aboutWindowButton.setAttribute("aria-label", "App Properties");
	aboutWindowButton.setAttribute("data-microtip-position", "bottom-left");
	aboutWindowButton.setAttribute("data-microtip-theme", "dark");
	
	//Divisor
	divisor.classList.add('window-divisor');
    document.getElementById("window" + id + "header").appendChild(divisor);
	divisor.appendChild(createCloseButton);
	divisor.appendChild(maximizeWindowButton);
	divisor.appendChild(minimizeWindowButton);
	divisor.appendChild(aboutWindowButton);

    document.getElementById("closeButton" + id).onclick = function () {
        fadeOut(windowID);
    };
	document.getElementById("maximizeWindowButton" + id).onclick = function() {
		if (!document.querySelector('.taskbar').classList.contains('hide')) 
		{
			windowID.classList.add('fullscreen');
			windowID.classList.add('to-top');
		}
		else 
		{
			windowID.classList.add('fullscreen-2');
			windowID.classList.add('to-top');
		}
	};
    document.querySelector("#button" + id).onclick = function () {
        if (windowID.style.display === "initial") {
			activeWindow(windowID);
        } else {
            windowID.style = "position: absolute;";
            fadeIn(windowID);
        }
    };
    dragElement(windowID);
}

function dragElement(elmnt) {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    if ("ontouchstart" in document.documentElement) {
        var pos3touch = 0, pos4touch = 0;
    }
    if (document.getElementById(elmnt.id + "header")) {
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
        document.getElementById(elmnt.id + "header").ontouchstart = dragMouseDown;
    }

    function dragMouseDown(e) {
        if (!"ontouchstart" in document.documentElement) {
            e.preventDefault();
        }
        pos3 = e.clientX;
        pos4 = e.clientY;
        if ("ontouchstart" in document.documentElement) {
            try {
                pos3touch = e.touches[0].clientX;
                pos4touch = e.touches[0].clientY;			
            } catch(error) {}
        }
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
        document.ontouchend = closeDragElement;
        document.ontouchmove = elementDrag;
        activeWindow(document.getElementById(elmnt.id));
    }

    function elementDrag(e) {
        e.preventDefault();
        if ("ontouchstart" in document.documentElement) {
            pos1touch = pos3touch - e.touches[0].clientX;
            pos2touch = pos4touch - e.touches[0].clientY;
            pos3touch = e.touches[0].clientX;
            pos4touch = e.touches[0].clientY;			
			if (elmnt.classList.contains("fullscreen"))
			{
				elmnt.classList.remove('fullscreen');
                elmnt.classList.remove('to-top');
				elmnt.style.top = 0;
				elmnt.style.left = 0;
			}
			else if (elmnt.classList.contains("fullscreen-2"))
			{
				elmnt.classList.remove('fullscreen-2');
                elmnt.classList.remove('to-top');
				elmnt.style.top = 0;
				elmnt.style.left = 0;
			}
			else
			{
				elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
				elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
			}
        } else { //Moving the window
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
			if (elmnt.classList.contains("fullscreen")) 
			{
				elmnt.classList.remove('fullscreen');
                elmnt.classList.remove('to-top');
				elmnt.style.top = 0;
				elmnt.style.left = 0;
			}
			else if (elmnt.classList.contains("fullscreen-2"))
			{
				elmnt.classList.remove('fullscreen-2');
                elmnt.classList.remove('to-top');
				elmnt.style.top = 0;
				elmnt.style.left = 0;
			}
			else
			{
				elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
				elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
			}
        }
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        document.ontouchend = null;
        document.ontouchmove = null;
    }
}

function fadeIn(elmnt) {
    elmnt.style.opacity = 0;
    elmnt.style.display = "initial";
    if (elmnt.classList.contains("fade")) {
        var opacity = 0;
        var timer = setInterval(function () {
            opacity += 30 / 70;
            if (opacity >= 1) {
                clearInterval(timer);
                opacity = 1;
            }
            elmnt.style.opacity = opacity;
            activeWindow(elmnt);
        }, 50);
    } else {
        elmnt.style.opacity = "0.9";
        activeWindow(elmnt);
    }
}

function fadeOut(elmnt) {
    if (elmnt.classList.contains("fade")) {
        var opacity = 1;
        var timer = setInterval(function () {
            opacity -= 30 / 70;
            if (opacity <= 0) {
                clearInterval(timer);
                opacity = 0;
                elmnt.style.display = "none";
            }
            elmnt.style.opacity = opacity;
        }, 50);
    } else {
        elmnt.style.display = "none";
        activeWindow(elmnt);
    }
}

function activeWindow(elmnt) {
    for (let i = active.length - 1; i > -1; i--) {
        active[i].classList.remove("windowActive");
        elmnt.className += " windowActive";
    }
}
