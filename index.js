const correctPassword = "14052007";
const display = document.getElementById("inputDisplay");
let input = "";

// Called when a digit is pressed
function enterDigit(digit) {
    if (input.length >= 8) return; // max 8 digits
    input += digit;
    updateDisplay();

    // Check full input
    if (input.length === 8) {
        if (input === correctPassword) {
            window.location.href = "main.html"; 
        } else {
            alert("❌ Wrong password! Clue it's your Birthday. Start from month to year! Follow this format: 03052007");
            // DON'T clear input automatically
        }
    }
}

// Remove last digit (X button)
function clearInput() {
    if (input.length > 0) {
        input = input.slice(0, -1);
        updateDisplay();
    }
}

// Update display with actual numbers + remaining dots
function updateDisplay() {
    let numbers = input;                   // show typed numbers
    let remainingDots = "•".repeat(8 - input.length); // remaining
    display.textContent = numbers + remainingDots;
}

// Initialize display
updateDisplay();

const heartCount = 25;

for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement("div");
    heart.classList.add("heart-bg");
    heart.textContent = "❤";

    // Random horizontal position across the viewport
    heart.style.left = Math.random() * 100 + "vw";

    // Random size for overlap effect
    heart.style.fontSize = (12 + Math.random() * 24) + "px";

    // Random animation duration and delay for natural effect
    heart.style.animationDuration = (6 + Math.random() * 4) + "s";
    heart.style.animationDelay = Math.random() * 5 + "s";

    document.body.appendChild(heart);
}

