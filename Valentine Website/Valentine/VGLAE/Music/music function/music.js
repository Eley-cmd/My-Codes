const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");

const songSlider = document.getElementById("slider-song");

const playpauseButton = document.getElementById("playpause-song");
const prevSongButton = document.getElementById("prev-song");
const nextSongButton = document.getElementById("next-song");

const songs = [
    {
        image: "./album-art1.jpg",
        name: "After All",
        artist: "Cher & Peter Cetera",
        audio: "./AfterALL.mp3"
    },
    {
        image: "./album-art2.jpg",
        name: "All I Want",
        artist: "Olivia Rodrigo",
        audio: "./AllIWant.mp3"
    },
    {
        image: "./album-art3.jpg",
        name: "Aubrey",
        artist: "Bread",
        audio: "./Aubrey.mp3",
    },
    {
        image: "./album-art4.jpg",
        name: "Bato sa Buhangin",
        artist: "Cindirella",
        audio: "./BatoSaBuhangin.mp3",
    },
];

const audio = document.createElement("audio");
let currentSongIndex = 0;

updateSong();

prevSongButton.addEventListener("click", function() {
    if (currentSongIndex == 0) {
        return;
    }
    currentSongIndex--;
    updateSong();
});

nextSongButton.addEventListener("click", function() {
    if (currentSongIndex == songs.length - 1) {
        return;
    }
    currentSongIndex++;
    updateSong();
});

playpauseButton.addEventListener("click", function() {
    if (!audio.paused) {
        audio.pause();
    }
    else {
        audio.play();
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

songSlider.addEventListener("change", function() {
    audio.currentTime = songSlider.value;
})

function moveSlider() {
    songSlider.value = audio.currentTime;
};

setInterval(moveSlider, 1000);