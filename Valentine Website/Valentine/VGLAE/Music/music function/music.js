const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");

const songSlider = document.getElementById("slider-song");

const playpauseButton = document.getElementById("playpause-song");
const prevSongButton = document.getElementById("prev-song");
const nextSongButton = document.getElementById("next-song");
const shuffleButton = document.getElementById("shuffle-song");
const repeatButton = document.getElementById("repeat-song");

const songs = [
    { image: "./img1.jpg", name: "After All", artist: "Cher & Peter Cetera", audio: "./AfterALL.mp3" },
    { image: "./img2.jpg", name: "All I Want", artist: "Olivia Rodrigo", audio: "./AllIWant.mp3" },
    { image: "./img3.jpg", name: "Aubrey", artist: "Bread", audio: "./Aubrey.mp3" },
    { image: "./img4.jpg", name: "Bato sa Buhangin", artist: "Cindirella", audio: "./BatoSaBuhangin.mp3" },
    { image: "./img5.jpg", name: "With You", artist: "Chris Brown", audio: "./BeWithYou.mp3" },
    { image: "./img6.jpg", name: "Enough For You", artist: "Olivia Rodrigo", audio: "./EnoughForYou.mp3" },
    { image: "./img7.jpg", name: "Lover Girl", artist: "Laufey", audio: "./LoverGirl.mp3" },
    { image: "./img8.jpg", name: "Maging Sino Ka Man", artist: "Rey Valera", audio: "./MagingSinoKaMan.mp3" },
    { image: "./img9.jpg", name: "Magnolia", artist: "Laufey", audio: "./Magnolia.mp3" },
    { image: "./img10.jpg", name: "Matilda", artist: "Harry Styles", audio: "./Matilda.mp3" },
    { image: "./img11.jpg", name: "Who Knows", artist: "Air Supply", audio: "./WhoKnows.mp3" }
];

const audio = document.createElement("audio");
let currentSongIndex = 0;
let isShuffle = false;
let repeatState = 0; // 0 = no repeat, 1 = repeat all, 2 = repeat one

// Initialize first song
updateSong();

prevSongButton.addEventListener("click", function() {
    if (isShuffle) {
        currentSongIndex = Math.floor(Math.random() * songs.length);
    } else {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    }
    updateSong();
    audio.play();
    playpauseButton.classList.remove("fa-circle-play");
    playpauseButton.classList.add("fa-circle-pause");
});

nextSongButton.addEventListener("click", function() {
    if (isShuffle) {
        currentSongIndex = Math.floor(Math.random() * songs.length);
    } else {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
    }
    updateSong();
    audio.play();
    playpauseButton.classList.remove("fa-circle-play");
    playpauseButton.classList.add("fa-circle-pause");
});

playpauseButton.addEventListener("click", function() {
    if (!audio.paused) {
        audio.pause();
        playpauseButton.classList.remove("fa-circle-pause");
        playpauseButton.classList.add("fa-circle-play");
    } else {
        audio.play();
        playpauseButton.classList.remove("fa-circle-play");
        playpauseButton.classList.add("fa-circle-pause");
    }
});

shuffleButton.addEventListener("click", function() {
    isShuffle = !isShuffle;
    shuffleButton.classList.toggle("active", isShuffle);
});

repeatButton.addEventListener("click", function() {
    repeatState = (repeatState + 1) % 3; // cycles 0 → 1 → 2 → 0

    // Remove all classes first
    repeatButton.classList.remove("active");
    repeatButton.classList.remove("repeat-one");

    if (repeatState === 1) {
        // Repeat all
        repeatButton.classList.add("active");
    } else if (repeatState === 2) {
        // Repeat one
        repeatButton.classList.add("active");
        repeatButton.classList.add("repeat-one");
    }
});

function updateSong() {
    const song = songs[currentSongIndex];
    songImage.src = song.image;
    songName.innerText = song.name;
    songArtist.innerText = song.artist;

    audio.src = song.audio;

    audio.onloadedmetadata = function() {
        songSlider.value = 0;
        songSlider.max = audio.duration;
    };
}

// Slider change
songSlider.addEventListener("input", function() {
    audio.currentTime = songSlider.value;
});

// Update slider every 0.5 sec
function moveSlider() {
    songSlider.value = audio.currentTime;
}
setInterval(moveSlider, 500);

// Auto next song on end
audio.addEventListener("ended", function() {
    if (repeatState === 2) {
        // Repeat one
        audio.currentTime = 0;
        audio.play();
    } else if (repeatState === 1) {
        // Repeat all
        nextSongButton.click();
    } else {
        // No repeat
        playpauseButton.classList.remove("fa-circle-pause");
        playpauseButton.classList.add("fa-circle-play");
    }
});
