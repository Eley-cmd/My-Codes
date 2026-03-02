const backgroundAudio = new Audio("song/athousandyears.mp3");
backgroundAudio.loop = true;

let popupAudio = null;
let nextQAfterPopup = null;

function nextQuestion(nextId, currentId) {
    document.getElementById("question" + currentId).classList.remove("active");
    document.getElementById("question" + nextId).classList.add("active");
}

function prevQuestion(prevId, currentId) {
    document.getElementById("question" + currentId).classList.remove("active");
    document.getElementById("question" + prevId).classList.add("active");
}

function submitQuestion(qNum) {
    let answer = document.getElementById("answer" + qNum).value.toLowerCase();
    if (!["a","b","c"].includes(answer)) {
        alert("Please choose A, B, or C sweetie!");
        return;
    }

    const popup = document.getElementById("popup");
    const popupMessage = document.getElementById("popup-message");
    popupMessage.innerHTML = "Initializing... Alert! Some unknown intruder hacked the system and posted a message! ⚠️💌";
    popup.style.display = "flex";

    setTimeout(() => {
        let msg = "";
        let imgSrc = "";
        nextQAfterPopup = null;

        if (qNum === 1) {
            if (answer === "a") { 
                msg = "Oh poor little cutie 🥺, here's a warm honey tea to help you feel better... 🤗 Sending you a warm virtual hug 💖";
                imgSrc = "img/honeytea.png";
            } else if (answer === "b") {
                msg = "Awwww, it’s okay to be tired… You’ve been working so hard lately 🤍 Take a moment to rest and breathe. Here’s a bouquet of flowers, made especially for the loveliest woman 💕";
                imgSrc = "img/bouquet.png";
            } else { 
                msg = "Yayyyy! You’re feeling better today, and knowing that makes my day complete. Stay healthy and always be safe… Here’s a beautiful strawberry for the most lovely woman :)";
                imgSrc = "img/cat.png";
            }

            popupMessage.innerHTML = `${msg}<br>
                <img src="${imgSrc}" style="max-width:340px;width:100%;height:auto;margin-top:10px;border-radius:15px;">`;
            createHearts();
            nextQuestion(2, 1);

        } else if (qNum === 2) {
            if (answer === "a") { 
                msg = "I like seeing you happy, so keep smiling, it looks really good on you and you know it makes me happy too 💖"; 
                imgSrc = "img/smilingcat.jpeg";
                nextQAfterPopup = 3;
            } else if (answer === "b") { 
                msg = "Awwww! What's making you a little down? Tell me... this someone who may or may not like you will bite it for you RAWWWWR! 😾 <br> Oh eh, bakit hindi ka pa naka ngiti? Smile naman diyan kahit pilit oh! HAHAHAHHAHAHH"; 
                imgSrc = "img/sadcat1.jpeg";
                nextQAfterPopup = 3;
            } else { 
                msg = "Ah, here’s a relaxing song for you 🎶💖 Click play to enjoy it!";
                imgSrc = "img/neutralcat.jpeg";
                const audioHTML = `<audio id="relaxSong" controls style="margin-top:10px;width:100%;">
                    <source src="song/closetoyou.mp3" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio>`;

                popupMessage.innerHTML = `${msg}<br>
                    <img src="${imgSrc}" style="max-width:340px;width:100%;height:auto;margin-top:10px;border-radius:15px;"><br>
                    ${audioHTML}`;

                popupAudio = document.getElementById("relaxSong");
                popupAudio.addEventListener("play", () => {
                    backgroundAudio.pause();
                });

                createHearts();
                nextQAfterPopup = 3;
                return;
            }

            popupMessage.innerHTML = `${msg}<br>
                <img src="${imgSrc}" style="max-width:340px;width:100%;height:auto;margin-top:10px;border-radius:15px;">`;
            createHearts();
            nextQuestion(3, 2);

        } else if (qNum === 3) {
            if (answer === "a") { 
                msg = "Goods! I hope na magpatuloy pa ’yan. Sana magkaroon ka na ng maayos na sleeping schedule. Continue your beauty rest :)"; 
                imgSrc = "img/proudcat.jpeg"; 
            } else if (answer === "b") { 
                msg = "Whoooa... grabe ang galing! Keep it up HAHAHAHAHAHHA! Nalala ko tuloy, diba sabi nila laging nagpupuyat ang mga matatalino... now I know why you're so great. Gawin ko nga din sa susunod, since I have a proof now in this theory. Kidding aside, I hope magkaroon ka na ng maayos na sleeping schedule 🌷";
                imgSrc = "img/amazedcaat.jpeg";  
            } else { 
                msg = "Niceee, I see! Pagpatuloy mo lang ’yan, you can do it. By the way, may byahe ka ngayon papuntang dorm, mag-ingat ka palagi ah 💖"; 
                imgSrc = "img/thumbsupcat.jpeg"; 
            }

            if (imgSrc) {
                popupMessage.innerHTML = `${msg}<br>
                    <img src="${imgSrc}" style="max-width:340px;width:100%;height:auto;margin-top:10px;border-radius:15px;">`;
            } else {
                popupMessage.innerHTML = msg;
            }
            createHearts();
        }

    }, 3000);
}

function closePopup() { 
    const popup = document.getElementById("popup");
    popup.style.display = "none"; 

    if (popupAudio) {
        popupAudio.pause();
        popupAudio.currentTime = 0;
        popupAudio = null;
    }

    backgroundAudio.play().catch(() => {});

    if (nextQAfterPopup !== null) {
        nextQuestion(nextQAfterPopup, 2);
        nextQAfterPopup = null;
    }
}

function createHearts() {
    for (let i = 0; i < 10; i++) {
        let heart = document.createElement("div");
        heart.classList.add("heart");
        heart.innerHTML = "💗";

        heart.style.left = Math.random() * window.innerWidth + "px";
        let scale = 0.5 + Math.random() * 1.5;
        heart.style.setProperty("--scale", scale);
        heart.style.fontSize = (15 + Math.random() * 25) + "px";
        heart.style.animationDuration = (3 + Math.random() * 3) + "s";

        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 6000);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    backgroundAudio.play().catch(() => {
        console.log("Autoplay blocked. Click something to start music.");
    });
});