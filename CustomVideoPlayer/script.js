const playBtn = document.getElementById('play');
const stopBtn = document.getElementById('stop');
const video = document.getElementById('video');
const progressBar = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

playBtn.addEventListener('click', toggleVideoStatus);
stopBtn.addEventListener('click', stopVideo);
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updatePlayProgress);
progressBar.addEventListener('change', setVideoProgress);

//Play or stop the video depending on its status
function toggleVideoStatus() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

//Change the play button to pause button
function updatePlayIcon() {
  if (video.paused) {
    play.innerHTML = `<i class="fa fa-play fa-2x"></i>`;
  } else {
    play.innerHTML = `<i class="fa fa-pause fa-2x"></i>`;
  }
}

function updatePlayProgress() {
  progress.value = (video.currentTime / video.duration) * 100;
  console.log(video.currentTime);
  let mins = Math.floor(video.currentTime / 60);
  let secs = Math.floor(video.currentTime % 60);

  timestamp.innerHTML = `${mins
    .toString()
    .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function setVideoProgress() {
  video.currentTime = (+progress.value / 100) * video.duration;
}

//Stop the video
function stopVideo() {
  video.currentTime = 0;
  video.pause();
}
