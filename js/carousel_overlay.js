document.addEventListener("DOMContentLoaded", () => {
  var modal = document.getElementById("myModal");
  var captionText = document.getElementById("caption");
  var galleryImages = Array.from(document.querySelectorAll(".photo-box img"));
  var currentIndex = 0;

  var prevBtn = document.querySelector(".prev");
  var nextBtn = document.querySelector(".next");

  var imageTrack = document.querySelector(".modal-image-track");
  var imgPrev = document.getElementById("img-prev");
  var imgCurrent = document.getElementById("img-current");
  var imgNext = document.getElementById("img-next");
  var videoCurrent = document.getElementById("video-current"); // Target the new video element

  var nextIndex = 0;

  let touchStartX = 0;
  let touchMoveX = 0;
  let isSwiping = false;
  const minSwipeDistance = 50;

  function getInitialTrackTransformValue() {
    if (window.innerWidth > 700) {
      return 0;
    } else {
      return 0;
    }
  }

  function applyTrackTransform(value, isPercentage) {
    if (isPercentage) {
      imageTrack.style.transform = `translateX(${value}%)`;
    } else {
      imageTrack.style.transform = `translateX(${value}px)`;
    }
  }

  // Unified helper to close modal and reset media cleanly
  function closeModalWindow() {
    modal.classList.remove("is-open");
    if (videoCurrent) {
      videoCurrent.pause();
      videoCurrent.src = ""; // Hard stops video buffering/playback
    }
  }

  function loadTrackImages(index) {
    const totalImages = galleryImages.length;
    const prevIndex = (index - 1 + totalImages) % totalImages;
    const nextIndex = (index + 1) % totalImages;

    currentIndex = index;

    const currentImgElement = galleryImages[currentIndex];
    const videoSrc = currentImgElement.getAttribute("data-video-src");

    // Toggle between Image and Video mode for the center slide
    if (videoSrc) {
      imgCurrent.style.display = "none";
      if (videoCurrent) {
        videoCurrent.style.display = "block";
        // Only change src if it's a different track item to avoid unnecessary reloading
        if (!videoCurrent.src.endsWith(videoSrc)) {
          videoCurrent.src = videoSrc;
          videoCurrent.play();
        }
      }
    } else {
      if (videoCurrent) {
        videoCurrent.style.display = "none";
        videoCurrent.pause();
        videoCurrent.src = "";
      }
      imgCurrent.style.display = "block";
      imgCurrent.src =
        currentImgElement.getAttribute("data-full-src") ||
        currentImgElement.src;
      imgCurrent.alt = currentImgElement.alt;
    }

    if (window.innerWidth < 700) {
      if (imgPrev) {
        imgPrev.src =
          galleryImages[prevIndex].getAttribute("data-full-src") ||
          galleryImages[prevIndex].src;
        imgPrev.alt = galleryImages[prevIndex].alt;
      }
      if (imgNext) {
        imgNext.src =
          galleryImages[nextIndex].getAttribute("data-full-src") ||
          galleryImages[nextIndex].src;
        imgNext.alt = galleryImages[nextIndex].alt;
      }
    } else {
      // Clear prev/next elements on desktop to prevent them from showing
      if (imgPrev) imgPrev.remove();
      if (imgNext) imgNext.remove();

      // Apply desktop structural style overrides to whatever element is currently active
      const activeMedia = videoSrc
        ? videoCurrent
        : document.querySelector(".modal-content");
      if (activeMedia) {
        activeMedia.style.setProperty("max-height", "none", "important");
        activeMedia.style.setProperty("width", "auto", "important");
      }
    }

    const initialTransform = getInitialTrackTransformValue();
    const isPercentage = window.innerWidth > 700;
    imageTrack.classList.add("no-transition");
    applyTrackTransform(initialTransform, isPercentage);
  }

  if (window.innerWidth < 700) {
    imageTrack.addEventListener("transitionend", (e) => {
      loadTrackImages(nextIndex);
    });
  }

  function navigate(direction) {
    // Stop audio/playback immediately when the sliding movement initiates
    if (videoCurrent) {
      videoCurrent.pause();
    }

    const isPercentageMode = window.innerWidth > 700;
    if (direction === "prev") {
      nextIndex =
        (currentIndex - 1 + galleryImages.length) % galleryImages.length;
      applyTrackTransform(window.innerWidth, isPercentageMode);
    } else {
      nextIndex =
        (currentIndex + 1 + galleryImages.length) % galleryImages.length;
      applyTrackTransform(-window.innerWidth, isPercentageMode);
    }
    if (isPercentageMode) {
      loadTrackImages(nextIndex);
    }

    setTimeout(() => {
      imageTrack.classList.remove("no-transition");
    }, 50);
  }

  galleryImages.forEach((img, index) => {
    img.onclick = function () {
      modal.classList.add("is-open");
      loadTrackImages(index);
    };
  });

  var closeSpan = document.getElementsByClassName("close")[0];
  closeSpan.onclick = function () {
    closeModalWindow();
  };

  window.onclick = function (event) {
    if (
      event.target === modal ||
      event.target.classList.contains("modal-content-wrapper") ||
      event.target.classList.contains("modal-image-track")
    ) {
      closeModalWindow();
    }
  };

  prevBtn.onclick = function () {
    navigate("prev");
  };

  nextBtn.onclick = function () {
    navigate("next");
  };

  document.addEventListener("keydown", function (event) {
    if (modal.classList.contains("is-open")) {
      if (event.key === "ArrowLeft") {
        navigate("prev");
      } else if (event.key === "ArrowRight") {
        navigate("next");
      } else if (event.key === "Escape") {
        closeModalWindow();
      }
    }
  });

  modal.addEventListener("touchstart", (e) => {
    if (e.touches.length === 1) {
      isSwiping = true;
      touchStartX = e.touches[0].clientX;
      imageTrack.classList.add("no-transition");
    }
  });

  modal.addEventListener("touchmove", (e) => {
    if (isSwiping && e.touches.length === 1) {
      touchMoveX = e.touches[0].clientX;
      const deltaX = touchMoveX - touchStartX;

      const isPercentageMode = window.innerWidth > 700;
      const initialTransformValue = getInitialTrackTransformValue();

      let newTranslateValue;

      if (isPercentageMode) {
        const viewportWidth = window.innerWidth;
        const percentageDelta = (deltaX / viewportWidth) * 100;
        newTranslateValue = initialTransformValue + percentageDelta;
        applyTrackTransform(newTranslateValue, true);
      } else {
        newTranslateValue = initialTransformValue + deltaX;
        applyTrackTransform(newTranslateValue, false);
      }

      if (Math.abs(deltaX) > 10) {
        e.preventDefault();
      }
    }
  });

  modal.addEventListener("touchend", () => {
    if (isSwiping && modal.classList.contains("is-open")) {
      const deltaX = touchMoveX - touchStartX;
      imageTrack.classList.remove("no-transition");

      if (Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0) {
          navigate("prev");
        } else {
          navigate("next");
        }
      } else {
        const initialTransform = getInitialTrackTransformValue();
        const isPercentage = window.innerWidth > 700;
        applyTrackTransform(initialTransform, isPercentage);
      }
      isSwiping = false;
      touchStartX = 0;
      touchMoveX = 0;
    }
  });

  window.addEventListener("resize", () => {
    if (modal.classList.contains("is-open")) {
      imageTrack.classList.add("no-transition");
      const initialTransform = getInitialTrackTransformValue();
      const isPercentage = window.innerWidth > 700;
      applyTrackTransform(initialTransform, isPercentage);
      setTimeout(() => {
        imageTrack.classList.remove("no-transition");
      }, 50);
    }
  });
});
