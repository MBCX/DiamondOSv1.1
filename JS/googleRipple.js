var btns = document.querySelectorAll(".btn.ripple");
btns.forEach(function(btn) {
  btn.addEventListener("click", function(e) {
    var x = e.clientX - e.target.offsetLeft;
    var y = e.clientY - e.target.offsetTop;
    var rips = document.createElement("span");
    rips.style.left = x + "px";
    rips.style.top = y + "px";
    this.appendChild(rips);
    setTimeout(function() {
      rips.remove();
    }, 1000);
  });
});