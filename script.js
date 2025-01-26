document.addEventListener("DOMContentLoaded", function () {
  // Функция воспроизведения/паузы для конкретного видео
  window.togglePlay = function (videoId) {
    const video = document.getElementById(videoId);
    const playButton = video.parentElement.querySelector(".play-pause i");

    if (video.paused) {
      video.play();
      playButton.className = "fas fa-pause";
    } else {
      video.pause();
      playButton.className = "fas fa-play";
    }
  };

  // Инициализация для каждого видео
  document.querySelectorAll(".video-container").forEach((container) => {
    const video = container.querySelector(".video-player");
    const playButton = container.querySelector(".play-pause i");
    const progressBar = container.querySelector(".progress-bar");
    const progress = container.querySelector(".progress");
    const volumeBtn = container.querySelector(".volume");
    const volumeSlider = container.querySelector(".volume-slider");
    const volumeProgress = container.querySelector(".volume-progress");
    const fullscreenBtn = container.querySelector(".fullscreen");

    // Обновление прогресс-бара
    video.addEventListener("timeupdate", () => {
      const percentage = (video.currentTime / video.duration) * 100;
      progress.style.width = percentage + "%";
    });

    // Перемотка видео
    progressBar.addEventListener("click", (e) => {
      const rect = progressBar.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      video.currentTime = pos * video.duration;
    });

    // Управление громкостью
    volumeBtn.addEventListener("click", () => {
      if (video.volume > 0) {
        video.volume = 0;
        volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
      } else {
        video.volume = 1;
        volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
      }
    });

    // Полноэкранный режим
    fullscreenBtn.addEventListener("click", () => {
      if (!document.fullscreenElement) {
        container.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    });
  });
});
