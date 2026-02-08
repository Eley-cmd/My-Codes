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

const openBtn = document.getElementById("open");
const closeBtn = document.getElementById("close");
const letterOverlay = document.getElementById("letterOverlay");
const music = document.getElementById("envelope-music");

openBtn.addEventListener("click", () => {
    // SHOW LETTER
    letterOverlay.classList.add("show");
    document.body.classList.add("no-scroll");

    // PLAY MUSIC – directly triggered by button click
    if (music) {
        music.currentTime = 0; // restart from beginning
        music.volume = 1;
        music.muted = false;
        const playPromise = music.play();

        // handle autoplay block
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    console.log("Music started!");
                })
                .catch((error) => {
                    console.log("Music blocked by browser:", error);
                });
        }
    }
});

closeBtn.addEventListener("click", () => {
    letterOverlay.classList.remove("show");
    document.body.classList.remove("no-scroll");

    // Optional: stop music when closing
    music.pause();
});


