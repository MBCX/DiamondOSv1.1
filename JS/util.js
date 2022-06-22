const getEl = function(el) {
  return document.getElementById(el);
};
const setStyle = function(el, prop, val) {
  return el.style[prop] = val;
};
const setAttr = function(el, attr, val) {
  return el.setAttribute(attr, val);
};
const hasClass = function(el, className) {
  return el.classList.contains(className);
};
const addClass = function(el, className) {
  if (!hasClass(el, className)) {
    el.classList.add(className);
  }
};
const removeClass = function(el, className) {
  if (hasClass(el, className)) {
    el.classList.remove(className);
  }
};
const resetStyles = function(el) {
  return el.removeAttribute("style");
};
const removeChild = function(el, child) {
  if (child.parentNode === el) {
    el.removeChild(child);
  }
};
const removeAllChildren = function(el) {
  while (el.hasChildNodes()) {
    el.removeChild(el.lastChild);
  }
};
const removeLastChild = function(el) {
  if (el.hasChildNodes()) {
    el.removeChild(el.lastChild);
  }
};
const removeChildren = function(el) {
  while (el.hasChildNodes()) {
    el.removeChild(el.lastChild);
  }
};
const getElPos = function(el) {
  var offset = el.getBoundingClientRect();
  return {left:offset.left, top:offset.top};
};
const setElPos = function(el, x, y) {
  setStyle(el, "left", x + "px");
  setStyle(el, "top", y + "px");
};
const getRand = function(min, max) {
  return Math.floor(Math.random() * max) + min;
};
const getRandExcept = function(min, max, exception) {
  var rand = getRand(min, max);
  return rand === exception ? getRandExcept(min, max, exception) : rand;
};
const getRandPosOffScreen = function(overrideQuadrant) {
  var lowX1 = 0 - window.innerWidth * 0.2;
  var highX1 = 0 - window.innerWidth * 0.1;
  var lowY1 = 0;
  var highY1 = window.innerHeight;
  var lowX2 = window.innerWidth * 1.1;
  var highX2 = window.innerWidth * 1.2;
  var lowY2 = 0;
  var highY2 = window.innerHeight;
  var lowX3 = 0;
  var highX3 = window.innerWidth;
  var lowY3 = 0 - window.innerHeight * 0.2;
  var highY3 = 0 - window.innerHeight * 0.1;
  var lowX4 = 0;
  var highX4 = window.innerWidth;
  var lowY4 = window.innerHeight * 1.1;
  var highY4 = window.innerHeight * 1.2;
  var rand = Math.floor(Math.random() * 4 + 1);
  if (overrideQuadrant) {
    rand = overrideQuadrant;
  }
  var x = 0, y = 0;
  switch(rand) {
    case 1:
      x = Math.floor(Math.random() * (highX1 - lowX1 + 1)) + lowX1;
      y = Math.floor(Math.random() * (highY1 - lowY1)) + lowY1;
      break;
    case 2:
      x = Math.floor(Math.random() * (highX2 - lowX2 + 1)) + lowX2;
      y = Math.floor(Math.random() * (highY2 - lowY2)) + lowY2;
      break;
    case 3:
      x = Math.floor(Math.random() * (highX3 - lowX3 + 1)) + lowX3;
      y = Math.floor(Math.random() * (highY3 - lowY3)) + lowY3;
      break;
    case 4:
      x = Math.floor(Math.random() * (highX4 - lowX4 + 1)) + lowX4;
      y = Math.floor(Math.random() * (highY4 - lowY4)) + lowY4;
      break;
  }
  return {x:x, y:y};
};
const resetAllTimeouts = function() {
  var id = window.setTimeout(function() {
  }, 0);
  while (id--) {
    window.clearTimeout(id);
  }
};
const resetAllIntervals = function() {
  var id = window.setInterval(function() {
  }, 0);
  while (id--) {
    window.clearInterval(id);
  }
};