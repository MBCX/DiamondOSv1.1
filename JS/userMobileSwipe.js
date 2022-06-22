const slider = document.querySelector(".user-view-mobile");
const slides = document.querySelectorAll(".user-mobile");
const button = document.querySelectorAll(".carousel-btn");
let current = 0;
let prev = 2;
let next = 1;
const gotoPrev = function ()
{
    return (0 < current) ? gotoNum(current - 1) : gotoNum(slides.length - 1);
}

const gotoNext = function ()
{
    return (3 > current) ? gotoNum(current + 1) : gotoNum(0);
}

const gotoNum = function(number) {
    current = number;
    prev = current - 1;
    next = current + 1;

    for (var i = 0; i < slides.length; i++)
    {
        slides[i].classList.remove("active");
        slides[i].classList.remove("prev");
        slides[i].classList.remove("next");
    }

    if (next == 4) {
        next = 0;
    }

    if (prev == -1) {
        prev = 3;
    }

    //Add and remove the current active user based on the one who has the active class
    slides[current].classList.add("active");
    slides[prev].classList.add("prev");
    slides[next].classList.add("next");
}