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
let isRepeat = false;

// Initialize first song
updateSong();

prevSongButton.addEventListener("click", function() {
    if (isShuffle) {
        currentSongIndex = Math.floor(Math.random() * songs.length);
    } else {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    }
    updateSong();
    audio.play(); // autoplay
});

nextSongButton.addEventListener("click", function() {
    if (isShuffle) {
        currentSongIndex = Math.floor(Math.random() * songs.length);
    } else {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
    }
    updateSong();
    audio.play(); // autoplay
});

playpauseButton.addEventListener("click", function() {
    if (!audio.paused) {
        audio.pause();
    } else {
        audio.play();
    }
});

shuffleButton.addEventListener("click", function() {
    isShuffle = !isShuffle;
    shuffleButton.classList.toggle("active", isShuffle); // toggle style if desired
});

repeatButton.addEventListener("click", function() {
    isRepeat = !isRepeat;
    repeatButton.classList.toggle("active", isRepeat); // toggle style if desired
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

// Update slider every second
function moveSlider() {
    songSlider.value = audio.currentTime;
}
setInterval(moveSlider, 500);

// Auto next song on end
audio.addEventListener("ended", function() {
    if (isRepeat) {
        audio.currentTime = 0;
        audio.play();
    } else {
        nextSongButton.click(); // simulate click on next
    }
});
