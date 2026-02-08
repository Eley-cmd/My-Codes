 const correctPassword = "05142007";
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
            alert("❌ Wrong password! Press X to remove one digit.");
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

// Add floating hearts dynamically
for (let i = 0; i < 15; i++) {
    let heart = document.createElement("div");
    heart.classList.add("heart-bg");
    heart.textContent = "❤";
    heart.style.left = Math.random() * 100 + "%";
    heart.style.fontSize = Math.random() * 24 + 16 + "px";
    heart.style.animationDuration = (3 + Math.random() * 4) + "s";
    document.body.appendChild(heart);
}
