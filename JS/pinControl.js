const ENTERED_NUMBERS = document.querySelector('.entered-numbers');
let STATES = {
	enteredPin: ''
};
const ADMIN_PIN = '282808';

function addToEnteredNumbers(num)
{
	let _num = document.createElement('div'),
		_numVal = isNaN(num) ? e.currentTarget.dataset.num : num;
	addClass(_num, 'entered-number');
	_num.innerText = _numVal;
	ENTERED_NUMBERS.appendChild(_num);
	STATES.enteredPin += _numVal;
	setTimeout(function() {
		addClass(_num, 'hidden');
	}, 500);
}

function backspacePin()
{
  if (ENTERED_NUMBERS.hasChildNodes()) 
  {
    const toBeRemoved = ENTERED_NUMBERS.lastChild;
    addClass(toBeRemoved, 'erased');
    setTimeout(function() {
      removeChild(ENTERED_NUMBERS, toBeRemoved);
      if (STATES.enteredPin.length >= 1) 
	  {
        STATES.enteredPin = STATES.enteredPin.slice(0, -1);
      }
    }, 100);
  }
}

function confirmPin()
{
	var _errorTimeout = null;
	if (STATES.enteredPin == ADMIN_PIN)
	{
		window.location.replace("C:/Users/UserGP/Desktop/DiamondOSv1.1beta/pages/adminUser.html");
	}
	else
	{
		document.querySelector('.pin-input-text').innerHTML = "Typed input is incorrect";
		document.querySelector('.pin-input-text').style.cssText = `color: #F00000;`;
		document.querySelector('.pin-input-field').style.cssText = `background: rgba(255, 0, 0, 0.2);`;
	}
}

window.onkeydown = function(e) {
	if (e.keyCode >= 48 && e.keyCode <= 57) { //from 1 to 0
		let num = (e.keyCode - 48).toString();
		addToEnteredNumbers(num);
	}
	else
	{
		switch (e.keyCode)
		{
			case 8: //Backspace
				backspacePin();
			break;
			case 13: //Enter key
				confirmPin();
			break;
			default:
				console.log("Incorrect key pressed");
			break;
		}
	}
};