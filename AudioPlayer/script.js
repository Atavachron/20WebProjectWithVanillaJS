const musicContainer = document.getElementById('music-container');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const title = document.getElementById('title');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const cover = document.getElementById('cover');

const songs = ['hey', 'summer', 'ukulele'];

let songIndex = 2;

//Loads the song, based on the songIndex variable
loadSong(songs[songIndex]);

function loadSong(song) {
  title.innerText = song;
  cover.src = `images/${song}.jpg`;
  audio.src = `music/${song}.mp3`;
}

//Add event listener to the play button that will either play or pause the song
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

function playSong() {
  musicContainer.classList.add('play');

  //Change the play button to pause button when the music starts playin
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove('play');

  //Change the pause button to a play button when the music is paused
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  playBtn.querySelector('i.fas').classList.add('fa-play');

  audio.pause();
}

function updateProgress() {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  //Get the width of the progress container
  const width = this.clientWidth;

  //Get the location of the click, relative to the progress container. use offsetX for this purpose
  const clickX = e.offsetX;

  //change the current time of the audio depending on the click
  audio.currentTime = (clickX / width) * audio.duration;
}

function nextSong() {
  if (songIndex === songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex++;
  }
  loadSong(songs[songIndex]);

  //Check if music is playing at the moment and if so, immediately start playin the next song loaded
  if (musicContainer.classList.contains('play')) {
    playSong();
  }
}

function prevSong() {
  if (songIndex === 0) {
    songIndex = songs.length - 1;
  } else {
    songIndex--;
  }
  loadSong(songs[songIndex]);

  //Check if music is playing at the moment and if so, immediately start playin the next song loaded
  if (musicContainer.classList.contains('play')) {
    playSong();
  }
}

//Play the next song when next button is clicked
nextBtn.addEventListener('click', nextSong);

//Play the previous song when previous button is clicked
prevBtn.addEventListener('click', prevSong);

//Update progress bar. Listen to the timeupdate event on the audio element
audio.addEventListener('timeupdate', updateProgress);

//Click on the progress bar
progressContainer.addEventListener('click', setProgress);

//Start next song automatically. Listen to the ended event and call the nextSong function
audio.addEventListener('ended', nextSong);
