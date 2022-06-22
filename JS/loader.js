var finished = false;
var count = 0;
const startUpSound = document.querySelector('#startUpSound');
const logo = document.querySelector('.loader')
document.addEventListener("DOMContentLoaded", function() 
{
    var _counter = setInterval(function() {
        if (count < 101) 
        {
            //$('.count').text(count + "%");
            count++;
        }
        else 
        {
            $('.loading-spinner').addClass('hide');
            $('.loading-text').addClass('hide');
            $('.loader').addClass('complete');
            $('.content-main').removeClass('disabled');
            $('.loader-section').addClass('completed');
            $('.loading-screen').addClass('loaded');

            // If the user first visited the page, and the boot screen completed,
            // Save if for later.
            if ($(".loader-section").hasClass("completed")) {
                window.localStorage.setItem("completedBoot", true);
                firstTime = false;
            }
            finished = true;
            clearInterval(_counter);
        }
    }, 80);
});

// Page loading time debug
window.onload = function () {
    var loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    console.log('Page load time is ' + loadTime);
}