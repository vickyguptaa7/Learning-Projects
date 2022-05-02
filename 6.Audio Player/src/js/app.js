import { songs } from "./Music";
const image = document.querySelector('img');
const title = document.querySelector('.title');
const artist = document.querySelector('.artist');

// Controls
const audioElement = document.querySelector('audio');
const controlNext = document.querySelector('.control-next');
const controlPrev = document.querySelector('.control-prev');
const controlPlay = document.querySelector('.control-play');

// Progress
const progressContainer = document.querySelector('.progress-container');
const progress = document.querySelector('.progress');
const currDuration = document.querySelector('.curr-duration');
const totalDuration = document.querySelector('.total-duration');

// Boolean 
let isPlaying = false;

// Play
function playSong() {
    isPlaying = true;
    controlPlay.classList.replace('fa-play', 'fa-pause');
    controlPlay.setAttribute('title', 'Pause');
    audioElement.play();
}

// Pause
function pauseSong() {
    isPlaying = false;
    controlPlay.setAttribute('title', 'Play');
    controlPlay.classList.replace('fa-pause', 'fa-play');
    audioElement.pause();
}

// Updating Dom
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artistName;
    audioElement.src = `./src/Songs/${song.name}.mp3`;
    if (song.name === 'Insane')
        image.src = `./src/Img/${song.name}.webp`
    else
        image.src = `./src/Img/${song.name}.jpeg`
}


let currSongsIndex = 0;
loadSong(songs[currSongsIndex]);

function prevSong() {
    currSongsIndex--;
    if (currSongsIndex < 0)
        currSongsIndex += songs.length;
    loadSong(songs[currSongsIndex]);
    playSong();
}

function nextSong() {
    currSongsIndex++;
    currSongsIndex %= songs.length;
    loadSong(songs[currSongsIndex]);
    playSong();
}


// play-pause
controlPlay.addEventListener('click', () => ((isPlaying) ? pauseSong() : playSong()));
// Prev
controlPrev.addEventListener('click', prevSong);
// Next
controlNext.addEventListener('click', nextSong);

function updateProgressBar(e) {
    // if (!isPlaying) {
    //     return;
    // }
    const { duration, currentTime } = e.srcElement;

    // Update progress Bar
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`

    // Updating Total Duration
    let durationMinute = Math.floor(duration / 60);
    let durationSecond = Math.floor(duration % 60);
    if (durationSecond < 10) {
        durationSecond = `0${durationSecond}`;
    }

    // Delay Switching Duration To Avoid Not A Number
    if (durationSecond) {
        totalDuration.textContent = `${durationMinute}:${durationSecond}`;
    }

    // Updating Curr Time
    durationMinute = Math.floor(currentTime / 60);
    durationSecond = Math.floor(currentTime % 60);
    if (durationSecond < 10) {
        durationSecond = `0${durationSecond}`;
    }
    currDuration.textContent = `${durationMinute}:${durationSecond}`;
}


function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = audioElement;
    audioElement.currentTime = (clickX / width) * duration;
}

audioElement.addEventListener('timeupdate', updateProgressBar);

progressContainer.addEventListener('click', setProgressBar);

audioElement.addEventListener('ended', nextSong);