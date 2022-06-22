/* import { createWindow, dragElement, fadeIn, fadeOut, activeWindow } from '/frameworks/window-engine.js' */
import { fadeOut } from "./frameworks/window-engine.js";

const input_field = document.querySelector('.input-field');
const input_display = document.querySelector('.input-display');
const cursor = document.querySelector('.cursor');
const state = {
    cursorIndex: 0
};

//Terminal output
const _output = document.querySelector('.input-result');
var toOutput;
const moveCursorPos = function (left, top) {
    setStyle(cursor, 'top', top + 'px');
    setStyle(cursor, 'left', left + 'px');
}

//Prints out the result of the terminal!
function output(data) {
	$(data).appendTo(_output);
}

//Move the cursor position in increments of 12px
const moveCursor = function (index) {
    var _startPos = 12;
    var _moveCursorTopCurrent = cursor.offsetTop;
    var _terminal_window = document.getElementById('window2');
    state.cursorIndex = Math.max(0, index);
    var _leftPos = state.cursorIndex * 12;
    setStyle(cursor, 'left', _leftPos + 'px');

    if (!_terminal_window.classList.contains('fullscreen')) {
        if (_leftPos >= _terminal_window.offsetWidth - 8) {
            _leftPos = 0;
            moveCursorPos(12, _moveCursorTopCurrent + 20);
        } else {
            _leftPos = state.cursorIndex * 12;
            setStyle(cursor, 'left', _leftPos + 'px');
            setStyle(cursor, 'top', 17 + 'px');
        }
    } else {

    }
}

//Wipe all the contents of input display and then repopulate them with <span>
const appendInput = function (input) {
    removeAllChildren(input_display);
    for (var i = 0; i < input.length; i++) {
        var _span = document.createElement("span");
        _span.innerHTML = input[i];
        input_display.appendChild(_span);
    }
}

//This function handles the enter key for the commands
const handleEnter = function (e) {
    e.preventDefault();
	var _inputVal = input_field.value;
	switch (_inputVal)
	{
		case "help":
			seeAllCommands();
			moveCursor(0);
			removeChildren(input_display);
		break;
				
		case "clear":
			clearConsole();
			moveCursor(0);
			removeChildren(input_display);
		break;
		
		case "exit":
			fadeOut("window2");
		break;
		
		case "version -t":
			consoleVersion();
			moveCursor(0);
			removeChildren(input_display);
		break;
		
		case "open changelog.txt":
			moveCursor(0);
			removeChildren(input_display);
		break;
		
		case "time":
			output("<span> Today is " + moment().format('MMMM Do YYYY, h:mm:ss a') + "</span>")
			moveCursor(0);
			removeChildren(input_display);
		break;
				
		default:
			var _inputVal = input_field.value;
			output("<span>" + _inputVal +  " is not a valid command. Please try again <br> </span> ");
			moveCursor(0);
			removeChildren(input_display);
		break;
	}
    return null;
}

//Handles the backspace key
const handleBackspace = function () {
    var _newIndex = state.cursorIndex - 1;
    if (state.cursorIndex < 1)
        return null;

    moveCursor(_newIndex);
    var _input = input_field.value;
    _input = _input.slice(0, _newIndex) + _input.slice(_newIndex + 1);
    appendInput(_input);
}

//Handles the delete key
const handleDelete = function () {
    moveCursor(state.cursorIndex);
    var _input = input_field.value;
    _input = _input.slice(0, state.cursorIndex) + _input.slice(state.cursorIndex + 1)
    appendInput(_input);
}

//Handles all the key pressed
const handleKeyPresses = function (e) {
    var _newIndex = state.cursorIndex + 1;
    moveCursor(_newIndex);
    var _input = input_field.value;
    _input = _input.slice(0, _newIndex - 1) + e.key + _input.slice(_newIndex - 1);
    appendInput(_input);
}

//Keys
const handleKeyDown = function (e) {
    if (e.ctrlKey) {
        e.preventDefault();
        return null;
    } else {
        switch (e.key) {
            case "Enter":
                handleEnter(e);
                break;
            case "Home":
                moveCursor(0);
                break;
            case "End":
                moveCursor(input_field.value.length);
                break;
            case "ArrowLeft":
                moveCursor(state.cursorIndex - 1);
                break;
            case "ArrowRight":
                moveCursor(state.cursorIndex + 1);
                break;
            case "Backspace":
                handleBackspace();
                break;
            case "Delete":
                handleDelete();
                break;
        }
    }
};

function clearConsole()
{
	document.querySelector('.input-result').innerHTML = "";
}

function seeAllCommands()
{
	var commandsArray = [
		"Help: Here's a list of all available commands",
		">goto			Goes to something. To see more, type help--goto(unavailable)",
		">version -t	Says the version of the terminal",
		">execute		Executes a command. To see more, type help--execute(unavailable)",
		">open			Opens the program specified. To see more, type help--open(unavailable)",
		">time			Tells you the current time",
		">exit			Exits the terminal."
	];
	for (var i = 0; commandsArray.length > i; i++)
	{
		output("<span>" + commandsArray[i] + "</span><br>");
	}
}

function consoleVersion()
{
	output("<span> [Diamond OS Terminal v1.0a] </span> <br>");
}

//Initialization
input_field.onkeypress = function (e) {
    return handleKeyPresses(e);
}
input_field.onkeydown = function (e) {
    return handleKeyDown(e);
}
input_field.onfocus = function () {
    return input_field.selectionStart = input_field.selectionEnd = input_field.value.length;
}
input_display.onclick = function () {
    return input_display.focus();
}
window.onclick = function () {
    return input_field.focus();
}
