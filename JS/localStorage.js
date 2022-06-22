/**
 * This file contains the necessary information to know if the user first
 * visited the page. If they did, the boot screen will show up,
 * if not, then the boot screen won't show.
 */
const bootScreenValidate = window.localStorage.getItem('completedBoot');
const loaderSection = document.querySelector('.loader-section');
var firstTime = false;

//Load the data
if (bootScreenValidate)
{
    //Get the elements to edit
    var _loadingScreen = document.querySelector('.loading-screen');
    var _contentMain = document.querySelector('.content-main');

    //Edit the elements
    _loadingScreen.classList.add('loaded');
    loaderSection.classList.add('completed');
    loaderSection.style.display = 'none';
    _loadingScreen.style.display = 'none';
    _contentMain.classList.remove('disabled');
    
    _contentMain.style.cssText = `-webkit-transition: -webkit-filter 400ms cubic-bezier(0.5, 0.01, 0.5, 1), opacity 300ms linear;`;
    _contentMain.style.cssText = `-moz-transition: filter 400ms cubic-bezier(0.5, 0.01, 0.5, 1), opacity 300ms linear;`;
    _contentMain.style.cssText = `-o-transition: filter 400ms cubic-bezier(0.5, 0.01, 0.5, 1), opacity 300ms linear;`;
    _contentMain.style.cssText = `transition: filter 400ms cubic-bezier(0.5, 0.01, 0.5, 1), opacity 300ms linear;`;

    //Animation delay reset
    if (true !== firstTime)
    {
        if (screen.width > 1000)
        {
            $('.details-top__text:first-child').removeClass('anim-delay-12700').addClass('anim-delay-500');
            $('.details-top__text:last-child').removeClass('anim-delay-12800').addClass('anim-delay-600');
            $('.details-bottom-left').removeClass('anim-delay-12900').addClass('anim-delay-700');
            $('.details-bottom-right').removeClass('anim-delay-13000').addClass('anim-delay-800');
            $('.user:first-child').removeClass('anim-delay-13100').addClass('anim-delay-900');
            $('.user:nth-child(2)').removeClass('anim-delay-13200').addClass('anim-delay-1000');
            $('.user:nth-child(3)').removeClass('anim-delay-13300').addClass('anim-delay-1100');
        }
        else
        {
            
        }
    }
}
