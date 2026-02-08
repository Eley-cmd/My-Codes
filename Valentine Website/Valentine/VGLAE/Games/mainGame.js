const heartBg = document.querySelector(".heart-bg");
const content = document.querySelector(".content");
const HEART_COUNT = 18;

/* Red shade palette */
const heartColors = [
    "#ffccd5",
    "#ff9aa2",
    "#ff6f91",
    "#ff4d6d",
    "#e63946",
    "#c1121f",
    "#9b111e",
    "#7f1d1d"
];

const hearts = [];

function overlapsRect(x, y, size, rect) {
    return (
        x + size > rect.left &&
        x < rect.right &&
        y + size > rect.top &&
        y < rect.bottom
    );
}

function overlapsOtherHearts(x, y, size) {
    return hearts.some(h =>
        x < h.x + h.size &&
        x + size > h.x &&
        y < h.y + h.size &&
        y + size > h.y
    );
}

function getSafePosition(size) {
    const rect = content.getBoundingClientRect();
    let x, y, tries = 0;

    do {
        x = Math.random() * (window.innerWidth - size);
        y = Math.random() * (window.innerHeight - size);
        tries++;
    } while (
        (overlapsRect(x, y, size, rect) ||
         overlapsOtherHearts(x, y, size)) &&
        tries < 200
    );

    return { x, y };
}

function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");

    const size = 15 + Math.random() * 30;
    const color = heartColors[Math.floor(Math.random() * heartColors.length)];
    const pos = getSafePosition(size);

    heart.style.width = size + "px";
    heart.style.height = size + "px";
    heart.style.left = pos.x + "px";
    heart.style.top = pos.y + "px";
    heart.style.background = color;

    const heartData = { x: pos.x, y: pos.y, size };
    hearts.push(heartData);

    heart.addEventListener("click", () => {
        heart.classList.add("pop");
        setTimeout(() => {
            heart.remove();
            hearts.splice(hearts.indexOf(heartData), 1);
            createHeart();
        }, 300);
    });

    heartBg.appendChild(heart);
}

/* Spawn hearts */
for (let i = 0; i < HEART_COUNT; i++) {
    createHeart();
}

