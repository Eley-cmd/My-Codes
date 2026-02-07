const open5 = document.getElementById("open5");
const close5 = document.getElementById("close5");
const one5 = document.querySelector(".one5");
const two5 = document.querySelector(".two5");
const letter5 = document.querySelector(".letter5"); 

open5.addEventListener("click", () => {
    one5.style.transform = "rotateX(90deg)";
    one5.style.transitionDelay = "0s";      
    two5.style.transform = "rotateX(180deg)";
    two5.style.transitionDelay = "0.25s";
    letter5.style.transform = "translateY(-50%)";
    letter5.style.transitionDelay = "0.5s";
});

close5.addEventListener("click", () => {
    one5.style.transform = "rotateX(0deg)";
    one5.style.transitionDelay = "0.75s";   
    two5.style.transform = "rotateX(90deg)";
    two5.style.transitionDelay = "0.5s";
    letter5.style.transform = "translateY(0)";
    letter5.style.transitionDelay = "0s";
});