// References to DOM Elements
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const book = document.querySelector("#book");
const paper1 = document.querySelector("#p1");
const paper2 = document.querySelector("#p2");
const paper3 = document.querySelector("#p3");

// Event Listener
prevBtn.addEventListener("click", goPrevPage);
nextBtn.addEventListener("click", goNextPage);

// Business Logic
let currentLocation = 1;
let numOfPapers = 3;
let maxLocation = numOfPapers + 1;

function goNextPage() {
    if(currentLocation < maxLocation) {

        switch(currentLocation) {
            case 1:
                paper1.classList.add("flipped");
                paper1.style.zIndex = 1;
                book.style.transform = "translateX(45%)";
                break;

            case 2:
                paper2.classList.add("flipped");
                paper2.style.zIndex = 2;
                break;

            case 3:
                paper3.classList.add("flipped");
                paper3.style.zIndex = 3;

                // 👇 When last page flips, reset book
                book.style.transform = "translateX(95%)";
                break;

            default:
                throw new Error("unknown state");
        }

        currentLocation++;
    }
}

function goPrevPage() {
    if(currentLocation > 1) {
        switch(currentLocation) {
            case 2:
                paper1.classList.remove("flipped");
                paper1.style.zIndex = 3;

                // 👇 Move book back to center
                book.style.transform = "translateX(0%)";
                break;

            case 3:
                paper2.classList.remove("flipped");
                paper2.style.zIndex = 2;
                break;

            case 4:
                paper3.classList.remove("flipped");
                paper3.style.zIndex = 1;
                book.style.transform = "translateX(45%)";
                break;

            default:
                throw new Error("unknown state");
        }

        currentLocation--;
    }
}

