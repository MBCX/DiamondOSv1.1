//#region VARIABLES
//#region TASKBAR CONSTANTS

const TASKBAR_REVEAL_DISTANCE = 735;
const TASKBAR_HIDE_TIMER = 100; //100ms = 0.1seconds
const SIDE_TOOLBAR_REVEAL_DISTANCE_BOTTOM = 250;
const SHOW_VELOCITY = 10;
const lastMovementTimestamp = 0;
//#endregion

//#region TASKBAR VARIABLES
const taskbar = document.querySelector('.taskbar');
const taskbarHideText = document.querySelector('.taskbarHide-text');
const taskbar_apps = document.querySelector('.taskbar__middle');
const taskbar_app = document.querySelector('.app-link');
const taskbar_middle_apps = document.querySelector('.middle-list__item');
const taskbar_right = document.querySelector('.taskbar__right');
const taskbar_date = document.querySelector('.taskbar__left-date');
const taskbar_search_btn = document.querySelector('.taskbar__left-button');
const taskbar_search_btn_close = document.querySelector('.taskbar__left-button-close');
const taskbar_search_forum = document.querySelector('.search-form');
const volume_range_cont = document.querySelector('.volume-range');
const volume_slider = document.querySelector('.slider-range'); /* Input */
const volume_sldr_num = document.querySelector('.volume-range__num'); /* number */
const start_menu = document.querySelector('.startMenu');
const start_left_menu = document.querySelector('.startMenu__left');
const start_middle_menu = document.querySelector('.startMenu__middle');
const system_tray_icons = document.querySelector('.icons-system-tray');
let hideTaskbar = false;
let taskbarTimer = TASKBAR_HIDE_TIMER;

//Right click icons
let hideTaskbarIcon = document.getElementById('icon_taskbar');
//#endregion

//#region Audio variables
const audioFull = document.querySelector('.audioFull');
const audioStandard = document.querySelector('.audioStandard');
const audioLow = document.querySelector('.audioLow');
const audioOff = document.querySelector('.audioOFF');
const audioStates = {
  LOUD: 75,
  STANDARD: 50,
  LOW: 25,
  OFF: 0
};
let audioState = audioStates.STANDARD;
//#endregion

//#region Wifi variables
const wifiStates = {
  CONNECTED: 1,
  OFFLINE: 0
};
let wifiState = wifiStates.CONNECTED;
//#endregion

//#region Battery variables
const batteryFull = document.querySelector('.batteryFull');
const batteryCharging = document.querySelector('.batteryCharging');
const batteryUnknown = document.querySelector('.batteryUnknown');
const batteryAlert = document.querySelector('.batteryAlert');
// const batterySprite = document.querySelectorAll('.battery');
// battery state
const batteryStates = {
  FULL: 0,
  CHARGING: 1,
  ALERT: 2,
  UNKNOWN: 3
};
let batteryState = batteryStates.FULL;
let batteryIsCharging = false;
//#endregion

//#region Message Variables
const randomItem = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}; //|| const randomItem = arr => arr[Math.floor(Math.random() * arr.length)];
const messageTitle = [ //Los diferentes tipos de mensajes
  'info',
  'success',
  'warning',
  'danger',
];
const MESSAGE_MAX_TIMER = 100;

// possible values for the body of the message
// end result of the emmet shortcut p*10>lorem10
var app = "Visual Studio Code ";
var files = 10807;
var apps_current = 3;
const messageText = [
  app + " has installed successfully!.",
  'There are updates available for the Operating System. Please update.',
  'We found a malicious file in your system. We deleted it for your safety.',
  "Antivirus scan done!. We scanned " + files + " files and we did not found any threads",
  'Mail has new messages.',
  'Screenshot took successfully!',
  'Battery is low. To avoid a unexpected shut down, please charge.',
  'The App Store is currently updating ' + apps_current + ' apps'
];
let notification = document.querySelector('.notification');
const notificationSound = document.querySelector('.notificationAudios');
//#endregion

//#region Popup variables
const popup = document.querySelector('.popup');
const blur = document.getElementById('blur');
const userDesc = document.querySelector('.user-view-current');

//#endregion

//#region templates
const appScreen_template = document.querySelector('#appScreenTemplate');
const middleApps_template = document.querySelector('#taskbarMiddleAppsTemplate');

//template arrays
let screens = [];
let apps = document.querySelector('.taskbar__middle-list').childElementCount;

//#endregion

//#region music player states

const notificationStates = {
	OPEN: 0,
	CLOSED: 1,
	MOVE_BY_NOTIFICATION: 2,
	RETURN_TO_NORMAL_POSITION: 3,
	MOVE_BY_VIRUTAL_DESKTOP_VIEW: 4,
	OPEN_MOVING: 5
};
let notificationState = notificationStates.OPEN;
//#endregion

//#endregion VARIABLES

//#region KEYS AND SHORTCUTS
let map = []; //Arreglo de teclados
let down = []; //Arreglo de teclados presionados
var _show = false;
document.addEventListener('keydown', function (e) {
  if (!map[e.keyCode]) //Shortcut keys
  {
    down.push(e.keyCode);
    if (down[0] == 90) { // Z key
      startToggle();
    }

    if (down[0] == 90 && down[1] == 9) { // Z + TAB key
      _show = !_show;
      virtualDesktopView(_show);
    }
	
    if (down[0] == 90 && down[1] == 86) { //Z + V
      audioVolumeSlicerToggle();
    }

    if (down[0] == 17 && down[1] == 40) { //Ctlr + down arrow
      if (!volume_range_cont.classList.contains('show')) {
        volume_range_cont.classList.add('show');
      } else volume_range_cont.classList.remove('show');
    }

    if (down[0] == 17 && down[1] == 38) { //Ctlr + up
      if (!volume_range_cont.classList.contains('show')) {
        volume_range_cont.classList.add('show');
      } else volume_range_cont.classList.remove('show');
    }

    if (down[0] == 90 && down[1] == 85) { //Z + U key
      userView();
    }
    //App keys
    var _numberKeys = down[1] == 49 || down[1] == 50 || down[1] == 51 || down[1] == 52 || down[1] == 53;
    if (down[0] == 90 && _numberKeys) { //Z + 1 or 2 or 3 or 4 keys...

    }
  }
  map[e.keyCode] = true;
});
document.addEventListener('keyup', function (e) {
  map[e.keyCode] = false;
  down.length = 0;
});

//#endregion

//#region Taskbar functions

//Cuando el icono de inicio se haga click
function startToggle() {
  start_menu.classList.toggle('show');
  start_left_menu.classList.toggle('show');
  start_middle_menu.classList.toggle('show');
  virtualDesktopView(false);
  
  if (taskbar_search_forum.classList.contains('show'))
  {
	  activateForm(false);
  }
}

//Cambia de icono
function changeIcon(iconID) {
  var _element = document.getElementById(iconID);

  if (_element.classList.contains('far fa-eye-slash')) {
    _element.classList.add('far fa-eye');
  } else {
    _element.classList.add('far fa-eye-slash');
  }
}

function systemTrayActivate() {
  system_tray_icons.classList.toggle('show-tray');
}

function taskbarHide() {
  var _doAutohide;
  hideTaskbar = !hideTaskbar;
  switch (hideTaskbar) {
    case true:
      taskbar.classList.add('hide');
      taskbarHideText.innerHTML = 'Disable Autohide taskbar';
      if (volume_range_cont.classList.contains('show')) {
        volume_range_cont.classList.remove('show');
      }

      //Si el usuario activo el 'Hide Taskbar' y el audio slider esta activo
      if (volume_range_cont.classList.contains('show')) {
        volume_range_cont.classList.remove('show');
      }

      //Si el usuario presiona el boton de search y esta activo el menu de incio
      if (start_menu.classList.contains('show')) {
        start_menu.classList.remove('show');
        start_left_menu.classList.remove('show');
      }
      _doAutohide = true;
      break;

    default:
      taskbar.classList.remove('hide');
      taskbarHideText.innerHTML = 'Autohide taskbar';
      _doAutohide = false;
      break;
  }

  //Mouse movement event
  document.addEventListener('mousemove', function (e) {
    var _currentUserView = document.querySelector('.user-view-current');

    if (isMouseNear(e)) //Show the taskbar
    {
      if (_doAutohide) {
        taskbar.classList.remove('hide');
        taskbarHideText.innerHTML = 'Autohide taskbar';
        hideTaskbar = false;
      }
    }
    else //Hide the taskbar
    {
      if (start_menu.classList.contains('show')) {
        if (taskbar.classList.contains('hide')) {
          taskbar.classList.remove('hide');
        }
        hideTaskbar = true;
      } else {
        taskbar.classList.remove('hide');
        hideTaskbar = true;
      }

      taskbar.classList.add('hide');
      taskbarHideText.innerHTML = 'Disable Autohide taskbar';
      hideTaskbar = true;
    }

    if (false === _doAutohide) {
      if (taskbar.classList.contains('hide')) {
        taskbar.classList.remove('hide');
        taskbarHideText.innerHTML = 'Autohide taskbar';
      }
      hideTaskbar = false;
    }

    //Maintain the taskbar visible if the user activates the form or the start menu or others
    var _elementContains =
      start_menu.classList.contains('show') || taskbar_search_forum.classList.contains('show') || volume_range_cont.classList.contains('show');
    if (_doAutohide && (_elementContains)) {
      if (taskbar.classList.contains('hide')) {
        taskbar.classList.remove('hide');
      }
    }

    if (_currentUserView.classList.contains('active')) {
      taskbar.classList.add('hide');
      taskbarHideText.innerHTML = 'Taskbar commands';
      hideTaskbar = true;
    }
  });
}

function insertIconTaskbar(icon) {
  
}

//#endregion

//#region Search form
/**
 * activateForm()
 * @param {!boolean} activate Activate the form or not
 * @return {boolean}
 */
function activateForm(activate) {
  var _value = activate;
  switch (_value) {
    case true:
      taskbar_right.classList.add('hide');
      taskbar_apps.classList.add('hide');
      taskbar_date.classList.add('hide');
      taskbar_search_btn.classList.add('active');
      taskbar_search_btn_close.classList.add('active');
      taskbar_search_forum.classList.add('show');

      //Si el usuario activo el search y el audio slider esta activo
      if (volume_range_cont.classList.contains('show')) {
        volume_range_cont.classList.remove('show');
      }

      //Si el usuario presiona el boton de search y esta activo el menu de incio
      if (start_menu.classList.contains('show')) {
        start_menu.classList.remove('show');
        start_left_menu.classList.remove('show');
        start_middle_menu.classList.remove('show');
      }
      break;

    default:
      taskbar_right.classList.remove('hide');
      taskbar_apps.classList.remove('hide');
      taskbar_date.classList.remove('hide');
      taskbar_search_btn.classList.remove('active');
      taskbar_search_btn_close.classList.remove('active');
      taskbar_search_forum.classList.remove('show');

      //Si el usuario activo el search y el audio slider esta activo
      if (volume_range_cont.classList.contains('show')) {
        volume_range_cont.classList.remove('show');
      }

      //Si el usuario presiona el boton de search y esta activo el menu de incio
      if (start_menu.classList.contains('show')) {
        start_menu.classList.remove('show');
        start_left_menu.classList.remove('show');
        start_middle_menu.classList.remove('show');
      }
      break;
  }
  return _value;
}

//Stop the form from submitting when enter is pressed
document.querySelector('.search-form-taskbar').addEventListener('submit', function (e) {
  e.preventDefault();
  activateForm(false);
});

//#endregion

//#region Other

//Audio volume slicer toggle
function audioVolumeSlicerToggle() {
  volume_range_cont.classList.toggle('show');
}

//#endregion

//#region Battery indicator
function updateBattery() {
  navigator.getBattery().then(function (battery) 
  {
    batteryIsCharging = battery.charging;
    battery.addEventListener('chargingchange', function () {
      batteryIsCharging = battery.charging;
    }), ({once: true});
    if (batteryIsCharging) {
      batteryState = batteryStates.CHARGING;
    } 
	else 
	{
      //Battery states
      if (battery.level >= 0.31) {
        batteryState = batteryStates.FULL;
      } else {
        batteryState = batteryStates.ALERT;
	    //notyf.open({type: 'battery-alert', message: 'Battery is low. To avoid a unexpected shut down, please charge.'});
      }
    }
    //Battery states
    switch (batteryState) {
      case batteryStates.FULL: //Full battery
        batteryCharging.style.display = 'none';
        batteryFull.style.display = 'block';
        batteryUnknown.style.display = 'none';
        break;

      case batteryStates.CHARGING: //Charging battery
        batteryCharging.style.display = 'block';
        batteryFull.style.display = 'none';
        batteryAlert.style.display = 'none';
        batteryUnknown.style.display = 'none';
        break;

      case batteryStates.ALERT: //Alert battery
        batteryUnknown.style.display = 'none';
        batteryFull.style.display = 'none';
        batteryAlert.style.display = 'block';
        break;

      case batteryStates.UNKNOWN: //Unknown battery
        batteryFull.style.display = 'none';
        batteryAlert.style.display = 'none';
        batteryCharging.style.display = 'none';
        batteryUnknown.style.display = 'block';
        break;

      default:
        console.log("Battery state undefined.");
        break;
    }
  });
}
//Update battery state and show it to the user.
var batteryInterval = setInterval(updateBattery, 500);

//Show current battery function
function batteryIndicatorToggle() {

}

//#endregion 

//#region Right click menu events
window.addEventListener('contextmenu', function (e) {
  e.preventDefault();
  var contextElement = document.querySelector('.right-click-menu');

  //Auto position to the cursor's location
  contextElement.style.top = e.offsetY + 'px';
  contextElement.style.left = e.offsetX + 'px';

  //Apply animation
  contextElement.classList.add('active');
  contextElement.classList.remove('do-delay');

  //If the context menu is active and the user clicked away
  window.addEventListener('click', function () {
    document.querySelector('.right-click-menu').classList.remove('active');
    document.querySelector('.right-click-menu').classList.add('do-delay');
  });
});
//#endregion

//#region Clock
function clock() {
  //Clock variables
  var hours = document.querySelector('.hour');
  var date = document.querySelector('.date');
  var notifi_date = document.querySelector('.notification-date');

  const currentTime = moment().format("h:mm A"), day = moment().format("dddd"), monthYear = moment().format("MMMM D"), currentDateNotification = day + ", " + monthYear, currentDate = moment().format("DD/MM/YYYY");
  hours.innerHTML = currentTime;
  date.innerHTML = currentDate;
  if (typeof(notifi_date) != 'undefined' && notifi_date != null)
  {
	  notifi_date.innerHTML = currentDateNotification;
  }
}
//Set time interval
var interval = setInterval(clock, 1000);
//#endregion

//#region Number Slider
volume_slider.addEventListener("input", showSliderValue, false);

function showSliderValue() {
  volume_sldr_num.innerHTML = volume_slider.value;
  let bulletPosition = (volume_slider.value / volume_slider.max);

  //Changing the audio icon depending on the slider value
  if (bulletPosition >= 0.75) {
    audioState = audioStates.LOUD;
  } else if (bulletPosition >= 0.50) {
    audioState = audioStates.STANDARD;
  } else if (bulletPosition > 0) {
    audioState = audioStates.LOW;
  } else {
    audioState = audioStates.OFF;
  }
  //Update the icon
  switch (audioState) {
    case 75: //Loud volume
      audioFull.style.display = 'block';
      audioStandard.style.display = 'none';
      break;

    case 50: //Standard volume
      audioFull.style.display = 'none';
      audioStandard.style.display = 'block';
      audioLow.style.display = 'none';
      break;

    case 25: //Low volume
      audioStandard.style.display = 'none';
      audioLow.style.display = 'block';
      audioOff.style.display = 'none';
      break;

    case 0: //Muted audio
      audioOff.style.display = 'block';
      audioLow.style.display = 'none';
      break;

    default:
      console.log("Audio State undefined.");
      break;
  }
  audioState = audioState;
}
//#endregion

//#region virtual Desktop View function
function virtualDesktopView(_activate) {
  var _virtualDesktopView = document.querySelector('.virtual-desktop-view');

  switch (_activate) {
    case true:
      document.getElementById('music-notification').classList.add('hide-from-virtual-desktop-view');
      _virtualDesktopView.classList.add('show');
      blur.classList.add('active');
      break;

    default:
      document.getElementById('music-notification').classList.remove('hide-from-virtual-desktop-view');
      _virtualDesktopView.classList.remove('show');
      blur.classList.remove('active');
      _show = false; //Show from the keyboard shortcut
      break;
  }
}

//#endregion

function aboutApp() {
  popup.classList.toggle('active');
  //Blur popup
  blur.classList.toggle('active');
}

//#endregion

//#region User functions

//Current user description
function userView() {
  userDesc.classList.toggle('active');
  if (!taskbar.classList.contains('hide')) //Hide taskbar
  {
    taskbar.classList.add('hide');
    taskbarHideText.style.cssText = "visibility: hidden;";
  } else {
    taskbar.classList.remove('hide');
    taskbarHideText.style.cssText = "visibility: visible;";
  }

  if (start_menu.classList.contains('show')) //Hide the start menu
  {
    start_menu.classList.remove('show');
    start_left_menu.classList.remove('show');
    start_middle_menu.classList.remove('show');
  }
}

//When going to the users page
function loadGeneralUsers() {
  document.querySelector('.btn').addEventListener('click', function (e) {
    e.preventDefault();
    userDesc.classList.add('out');
  });
}

window.addEventListener('load', function () {
  var _general_user_view = document.querySelector('.general-user-view');
  if (typeof(_general_user_view) != 'undefined' && _general_user_view != null)
  {
	_general_user_view.classList.add('active');
  }
});

//#endregion

//#region Functions made by Google (But Edited)

/**
 * isMouseNear
 * @param {!MouseEvent} e Event to test.
 * @return {boolean} True if the mouse is close to the top of the screen.
 */
function isMouseNear(e) {
  return e.clientY > TASKBAR_REVEAL_DISTANCE;
}

//#endregion

//#region Wifi functions
document.addEventListener('online', function () {
  updateConnectionStatus();
  notyf.open({type: 'wifi-connected', message: 'It looks like you are not connected to the internet.'});
});

document.addEventListener('offline', function () {
  updateConnectionStatus();
  //createMessage('warning', 'It looks like you are not connected to the internet.');
  notyf.open({type: 'wifi-out', message: 'It looks like you are not connected to the internet.'});
});

function updateConnectionStatus()
{
  if (document.navigator.onLine) {
    wifiState = wifiStates.CONNECTED;
	  console.log("CONNECTED");
  } else {
    wifiState = wifiStates.OFFLINE;
	  console.log("OFFLINE");
  }

  switch (wifiState) {
    case wifiStates.CONNECTED:
      document.querySelector('.wifi-connected').style.cssText = "display: block;";
      document.querySelector('.wifi-disabled').style.cssText = "display: none;";
      break;
  
    default:
      document.querySelector('.wifi-connected').style.cssText = "display: none;";
      document.querySelector('.wifi-disabled').style.cssText = "display: block;";
      break;
  }
}

//#endregion


//#region music player functions
function notificationControl(_state)
{
	//Get the elements
	var _music_body = document.querySelector('#music-notification');
	var _music_service = document.querySelector('.service');
	var _music_specifics = document.querySelector('.specifics');
	var _music_controls = document.querySelector('.controls');
	var _music_progress = document.querySelector('.music-progress-bg');
	var _music_image = document.querySelector('.image');
	var _music_info = document.querySelector('.info');
	var _music_closeBtn = document.querySelector('.music-notification-close');
	notificationState = _state;
	
	//Control states
  switch (_state)
  {
		case notificationStates.OPEN:
			//Add the classes
			_music_body.classList.remove('hide');
			_music_body.classList.remove('do-delay');
			_music_service.classList.remove('hide');
			_music_specifics.classList.remove('hide');
			_music_controls.classList.remove('hide');
			_music_progress.classList.remove('hide');
			_music_image.classList.remove('hide');
			_music_info.classList.remove('fill');
			_music_closeBtn.style.cssText = "visibility: visible;";
		break;
		
		case notificationStates.CLOSED:
			//Add the classes
			_music_body.classList.add('hide');
			_music_body.classList.add('do-delay');
			_music_service.classList.add('hide');
			_music_specifics.classList.add('hide');
			_music_controls.classList.add('hide');
			_music_progress.classList.add('hide');
			_music_image.classList.add('hide');
			_music_info.classList.add('fill');
			_music_closeBtn.style.cssText = "visibility: hidden;";
			
			if (_music_body.classList.contains('move-from-message'))
				_music_body.classList.remove('move-from-message');
		break;
		
		case notificationStates.MOVE_BY_NOTIFICATION:
			if (!_music_body.classList.contains('hide'))
				_music_body.classList.add('move-from-message');
		break;
		
		case notificationStates.MOVE_BY_VIRUTAL_DESKTOP_VIEW:
			if (!_music_body.classList.contains('hide'))
				_music_body.classList.add('hide-from-virtual-desktop-view');
		break;
		
		case notificationStates.RETURN_TO_NORMAL_POSITION:
			_music_body.classList.remove('move-from-message');
			_music_body.classList.remove('hide-from-virtual-desktop-view');
		break;
		
		case notificationStates.OPEN_MOVING:
			
		break;
		
		default:
			console.log("Music Notification is trying to be in a state that has not been defined.");
		break;
	}
	console.log(notificationState);
}

function minimizeMusicNotification(_activate)
{
	//Get All elements
	var _notification_controls = document.querySelector('.controls');
	var _notification_details = document.querySelector('.music-details');
	var _specifics_song = document.querySelector('.song');
	var _specifics_artist = document.querySelector('.artist');

	switch (_activate)
	{
		case true:
			//Edit those elements
			_notification_controls.style.cssText = "transform: translateY(30px);";
			_notification_details.innerHTML = '• In Return <i class="fas fa-angle-down icon-option"></i>';
			_specifics_song.style.cssText = "font-size: 1em;";
			_specifics_artist.style.cssText = "font-size: 1em;";
			_notification_details.setAttribute('onclick', 'minimizeMusicNotification(false)');
			break;

		default:
			//Edit those elements
			_notification_controls.style.cssText = "transform: translateY(0px);";
			_notification_details.innerHTML = '• In Return <i class="fas fa-angle-up icon-option"></i>';
			_specifics_song.style.cssText = "font-size: 0.6em;";
			_specifics_artist.style.cssText = "font-size: 0.6em;";
			_notification_details.setAttribute('onclick', 'minimizeMusicNotification(true)');
			break;
	}
}

//#endregion


//jQuery Date
$(document).ready(function() {
	$(".datepicker").datepicker({
		prevText: '<span class="material-icons">chevron_left</span>',
		nextText: '<span class="material-icons">chevron_right</span>'
	});
});

// window.onload = loadGeneralUsers;
