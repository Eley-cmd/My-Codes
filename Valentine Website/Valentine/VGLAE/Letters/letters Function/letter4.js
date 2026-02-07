const open4 = document.getElementById("open4");
const close4 = document.getElementById("close4");
const one4 = document.querySelector(".one4");
const two4 = document.querySelector(".two4");
const letter4 = document.querySelector(".letter4"); 

open4.addEventListener("click", () => {
    one4.style.transform = "rotateX(90deg)";
    one4.style.transitionDelay = "0s";      
    two4.style.transform = "rotateX(180deg)";
    two4.style.transitionDelay = "0.25s";
    letter4.style.transform = "translateY(-50%)";
    letter4.style.transitionDelay = "0.5s";
});

close4.addEventListener("click", () => {
    one4.style.transform = "rotateX(0deg)";
    one4.style.transitionDelay = "0.75s";   
    two4.style.transform = "rotateX(90deg)";
    two4.style.transitionDelay = "0.5s";
    letter4.style.transform = "translateY(0)";
    letter4.style.transitionDelay = "0s";
});