document.addEventListener("DOMContentLoaded", function () {
  const videoPlayer = document.getElementById("myVideo");
  const videoContainer = document.querySelector(".video-container");
  const playPauseBtn = document.querySelector(".play-pause");
  const volumeBtn = document.querySelector(".volume");
  const fullscreenBtn = document.querySelector(".fullscreen");
  const progressBar = document.querySelector(".progress-bar");
  const progress = document.querySelector(".progress");
  const timeDisplay = document.querySelector(".current");
  const durationDisplay = document.querySelector(".duration");
  const volumeSlider = document.querySelector(".volume-slider");
  const volumeProgress = document.querySelector(".volume-progress");

  // Play/Pause
  function togglePlay() {
    if (videoPlayer.paused) {
      videoPlayer.play();
      playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
      videoPlayer.pause();
      playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
  }

  playPauseBtn.addEventListener("click", togglePlay);
  videoPlayer.addEventListener("click", togglePlay);

  // Progress Bar
  videoPlayer.addEventListener("timeupdate", () => {
    const percentage = (videoPlayer.currentTime / videoPlayer.duration) * 100;
    progress.style.width = `${percentage}%`;

    // Time Display
    const currentMinutes = Math.floor(videoPlayer.currentTime / 60);
    const currentSeconds = Math.floor(videoPlayer.currentTime % 60);
    timeDisplay.textContent = `${currentMinutes}:${currentSeconds
      .toString()
      .padStart(2, "0")}`;
  });

  videoPlayer.addEventListener("loadedmetadata", () => {
    const durationMinutes = Math.floor(videoPlayer.duration / 60);
    const durationSeconds = Math.floor(videoPlayer.duration % 60);
    durationDisplay.textContent = `${durationMinutes}:${durationSeconds
      .toString()
      .padStart(2, "0")}`;
  });

  // Click on Progress Bar
  progressBar.addEventListener("click", (e) => {
    const pos = (e.pageX - progressBar.offsetLeft) / progressBar.offsetWidth;
    videoPlayer.currentTime = pos * videoPlayer.duration;
  });

  // Volume
  let lastVolume = 1;
  volumeBtn.addEventListener("click", () => {
    if (videoPlayer.volume) {
      lastVolume = videoPlayer.volume;
      videoPlayer.volume = 0;
      volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else {
      videoPlayer.volume = lastVolume;
      volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
  });

  volumeSlider.addEventListener("click", (e) => {
    const pos = (e.pageX - volumeSlider.offsetLeft) / volumeSlider.offsetWidth;
    videoPlayer.volume = pos;
    volumeProgress.style.transform = `translateX(${(pos - 1) * 100}%)`;

    if (pos === 0) {
      volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else {
      volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
  });

  // Fullscreen
  fullscreenBtn.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen();
      } else if (videoContainer.mozRequestFullScreen) {
        videoContainer.mozRequestFullScreen();
      } else if (videoContainer.webkitRequestFullscreen) {
        videoContainer.webkitRequestFullscreen();
      } else if (videoContainer.msRequestFullscreen) {
        videoContainer.msRequestFullscreen();
      }
      fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
    }
  });

  // Handle screen orientation on mobile
  if (screen.orientation) {
    fullscreenBtn.addEventListener("click", () => {
      if (document.fullscreenElement) {
        screen.orientation
          .lock("landscape")
          .catch((error) => console.log(error));
      }
    });
  }

  // Auto hide controls
  let timeout;
  videoContainer.addEventListener("mousemove", () => {
    document.querySelector(".video-controls").style.opacity = "1";
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (!videoPlayer.paused) {
        document.querySelector(".video-controls").style.opacity = "0";
      }
    }, 3000);
  });
});
