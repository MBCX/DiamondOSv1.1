const music = document.querySelector('.coconut-flavor-music');
var durationBar = document.querySelector('.music-bar-duration');
var playBtn = document.querySelector('.play-btn');
var duration = document.querySelector('.duration');
var currentTime = document.querySelector('.current-time');
// Player
function playSong() 
{
	if (music.paused)
	{
		music.play();
		playBtn.innerHTML = '<i class="fas fa-stop" title="stop song"></i>';
	}
	else
	{
		music.pause();
		playBtn.innerHTML = '<i class="fas fa-play play-btn" title="play song"></i>';
	}
	music.addEventListener('ended', function() {
		playBtn.innerHTML = '<i class="fas fa-play play-btn" title="play song"></i>';
		music.currentTime = 0;
	});
}

music.onloadeddata = function() {
	durationBar.max = music.duration;
    var ds = parseInt(music.duration % 60);
    var dm = parseInt((music.duration / 60) % 60);
	duration.innerHTML = '0' + dm + ':' + ds;
};

music.ontimeupdate = function () {
	durationBar.value = music.currentTime;
};

handleMusicBar = function () {
  music.currentTime = durationBar.value;
};

music.addEventListener("timeupdate", function () {
    var cs = parseInt(music.currentTime % 60);
    var cm = parseInt((music.currentTime / 60) % 60);
    currentTime.innerHTML = cm + ":" + cs;
}, false);

//Lower the music volume if there is a notification
var _soundNotification = document.querySelector('.notificationAudios');
_soundNotification.onplay = function() {
	if ((document.querySelector('.slider-range').value / 100) > 0.70)
	{
		music.volume = 25 / 100;
	}
};

_soundNotification.onended = function() {
	music.volume = document.querySelector('.slider-range').value / 100;
};