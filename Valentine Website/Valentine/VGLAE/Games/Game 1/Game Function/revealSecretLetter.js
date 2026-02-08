function revealEnvelope() {
    const gameStage = document.getElementById('game-stage');
    const whole = document.getElementsByClassName('whole');
    
    gameStage.classList.add('hidden');
    
    setTimeout(() => {
        gameStage.style.display = 'none';
        whole[0].style.display = 'flex';
        void whole[0].offsetWidth;
    }, 300);
}

const envelope = document.querySelector(".envelope");
const openBtn = document.getElementById("open");
const closeBtn = document.getElementById("close");
const letterOverlay = document.getElementById("letterOverlay");
const music = document.getElementById("envelope-music");

let musicStarted = false;

// ENVELOPE CLICK = unlock audio
envelope.addEventListener("click", () => {
    if (!musicStarted) {
        music.play()
            .then(() => {
                musicStarted = true;
            })
            .catch(err => {
                console.log("Audio blocked:", err);
            });
    }
});

// OPEN BUTTON = show letter (music already unlocked)
openBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // 👈 VERY IMPORTANT

    letterOverlay.classList.add("show");
    document.body.classList.add("no-scroll");
});

// CLOSE LETTER
closeBtn.addEventListener("click", () => {
    letterOverlay.classList.remove("show");
    document.body.classList.remove("no-scroll");

    // optional
    // music.pause();
});
