let heartsFound = 0;
const totalHearts = 5;
const hidingItems = ['1','2','3','4','5','6','7','8','9','10','11','12'];
let spots = [];

window.onload = function () {
    initGame();
};

function initGame() {
    const container = document.querySelector('.hiding-spots-container');
    container.innerHTML = ''; // Clear previous spots
    spots = [];

    // Shuffle items
    const shuffledItems = [...hidingItems].sort(() => Math.random() - 0.5);
    const displayItems = shuffledItems.slice(0, 12);

    // Pick 5 random hearts
    let heartIndices = new Set();
    while (heartIndices.size < totalHearts) {
        heartIndices.add(Math.floor(Math.random() * displayItems.length));
    }

    displayItems.forEach((icon, index) => {
        const spot = document.createElement('div');
        spot.classList.add('hiding-spot');
        spot.innerText = icon;
        spot.dataset.hasHeart = heartIndices.has(index) ? "true" : "false";
        spot.onclick = () => checkSpot(spot);

        // Staggered spawn animation
        const delay = 0.05 + index * 0.05; // 0.05s, 0.1s, 0.15s...
        spot.style.animation = `spawn 0.5s ease forwards ${delay}s`;

        // Optional: remove inline animation after it ends to allow other animations
        spot.addEventListener('animationend', () => {
            spot.style.animation = '';
        });

        container.appendChild(spot);
        spots.push(spot);
    });
}

function checkSpot(element) {
    const correctSound = document.getElementById('correct');
    const wrongSound = document.getElementById('buzz');

    if (element.dataset.hasHeart === "true") {
        // Force winPop animation to replay
        element.classList.remove('revealed');
        void element.offsetWidth;
        element.classList.add('revealed');

        correctSound.currentTime = 0;
        correctSound.play().catch(err => console.warn(err));

        // Floating heart
        const heart = document.createElement('div');
        heart.classList.add('hidden-heart-popup');
        void heart.offsetWidth; // trigger reflow
        heart.classList.add('pop-anim');
        heart.innerText = '❤️';
        element.appendChild(heart);

        heartsFound++;
        document.getElementById('counter').innerText = heartsFound;

        if (heartsFound === totalHearts) setTimeout(revealEnvelope, 1200);
    } else {
        // Force shake animation to replay
        element.classList.remove('shaking');
        void element.offsetWidth;
        element.classList.add('shaking');

        wrongSound.currentTime = 0;
        wrongSound.play().catch(err => console.warn(err));
    }
}
