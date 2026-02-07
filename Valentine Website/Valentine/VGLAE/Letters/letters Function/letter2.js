const opening = document.getElementById("opening");
const closing = document.getElementById("closing");
const one2 = document.querySelector(".one2");
const two2 = document.querySelector(".two2");
const letter2 = document.querySelector(".letter2"); 

opening.addEventListener("click", () => {
    one2.style.transform = "rotateX(90deg)";
    one2.style.transitionDelay = "0s";      
    two2.style.transform = "rotateX(180deg)";
    two2.style.transitionDelay = "0.25s";
    letter2.style.transform = "translateY(-50%)";
    letter2.style.transitionDelay = "0.5s";
});

closing.addEventListener("click", () => {
    one2.style.transform = "rotateX(0deg)";
    one2.style.transitionDelay = "0.75s";   
    two2.style.transform = "rotateX(90deg)";
    two2.style.transitionDelay = "0.5s";
    letter2.style.transform = "translateY(0)";
    letter2.style.transitionDelay = "0s";
});
