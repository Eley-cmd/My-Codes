const correctPassword = "7242546452";
const display = document.getElementById("inputDisplay");
let input = "";

// Called when a digit is pressed
function enterDigit(digit) {
    if (input.length >= 10) return;
    input += digit;
    updateDisplay();

    if (input.length === 10) {
        if (input === correctPassword) {
            // Create audio element and play it NOW (user interaction)
            const audio = new Audio("athousandyears.mp3");
            audio.play().catch(() => {
                console.log("Autoplay blocked, but user clicked keypad so this should work");
            });

            // Delay redirect slightly so the audio can start
            setTimeout(() => {
                window.location.href = "aiChatBox.html";
            }, 500); // half-second delay
        } else {
            alert("❌ Wrong password! Clue: it's your Birthday.");
        }
    }
}

function clearInput() {
    if (input.length > 0) {
        input = input.slice(0, -1);
        updateDisplay();
    }
}

function updateDisplay() {
    let numbers = input;
    let remainingDots = "•".repeat(10 - input.length);
    display.textContent = numbers + remainingDots;
}
