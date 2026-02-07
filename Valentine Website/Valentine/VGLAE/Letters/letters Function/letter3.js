const open3 = document.getElementById("open3");
const close3 = document.getElementById("close3");
const one3 = document.querySelector(".one3");
const two3 = document.querySelector(".two3");
const letter3 = document.querySelector(".letter3"); 

open3.addEventListener("click", () => {
    one3.style.transform = "rotateX(90deg)";
    one3.style.transitionDelay = "0s";      
    two3.style.transform = "rotateX(180deg)";
    two3.style.transitionDelay = "0.25s";
    letter3.style.transform = "translateY(-50%)";
    letter3.style.transitionDelay = "0.5s";
});

close3.addEventListener("click", () => {
    one3.style.transform = "rotateX(0deg)";
    one3.style.transitionDelay = "0.75s";   
    two3.style.transform = "rotateX(90deg)";
    two3.style.transitionDelay = "0.5s";
    letter3.style.transform = "translateY(0)";
    letter3.style.transitionDelay = "0s";
});