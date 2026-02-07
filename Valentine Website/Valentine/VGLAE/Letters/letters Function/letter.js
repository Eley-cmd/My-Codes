const open = document.getElementById("open");
const close = document.getElementById("close");
const one = document.querySelector(".one");
const two = document.querySelector(".two");
const letter = document.querySelector(".letter");

open.addEventListener("click", () => {
    one.style.transform = "rotateX(90deg)";
    one.style.transitionDelay = "0s";
    two.style.transform = "rotateX(180deg)";
    two.style.transitionDelay = "0.25s";
    letter.style.transform = "translateY(-50%)";
    letter.style.transitionDelay = "0.5s";
});

close.addEventListener("click", () => {
    one.style.transform = "rotateX(0deg)";
    one.style.transitionDelay = "0.75s";   
    two.style.transform = "rotateX(90deg)";
    two.style.transitionDelay = "0.5s";
    letter.style.transform = "translateY(0)";
    letter.style.transitionDelay = "0s";
});

