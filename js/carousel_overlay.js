document.addEventListener('DOMContentLoaded', () => {
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

    let touchStartX = 0;
    let touchMoveX = 0;
    let isSwiping = false;
    const minSwipeDistance = 50;

    // Helper to get the correct initial transform value for the current image in the middle
    // This value represents the LEFT edge of the current image, so it's negative
    function getInitialTrackTransformValue() {
        if (window.innerWidth > 700) {
            // Shift left by 1 image width (which is 33.33% of the 300% track, effectively 100% of the viewport's width)
            return 0; // This is a percentage value
        } else {
            // Shift left by 100vw
            return 0; // This is a pixel value
        }
    }

    // Helper to apply the transform based on type (px or %)
    function applyTrackTransform(value, isPercentage) {
        if (isPercentage) {
            imageTrack.style.transform = `translateX(${value}%)`;
        } else {
            imageTrack.style.transform = `translateX(${value}px)`;
        }
    }

    function loadTrackImages(index) {
        const totalImages = galleryImages.length;
        const prevIndex = (index - 1 + totalImages) % totalImages;
        const nextIndex = (index + 1) % totalImages;

        currentIndex = index;

        // Load images
        imgCurrent.src = galleryImages[currentIndex].getAttribute('data-full-src') || galleryImages[currentIndex].src;
        imgCurrent.alt = galleryImages[currentIndex].alt;
        
        if (window.innerWidth < 700) {
            imgPrev.src = galleryImages[prevIndex].getAttribute('data-full-src') || galleryImages[prevIndex].src;
            imgPrev.alt = galleryImages[prevIndex].alt;

            imgNext.src = galleryImages[nextIndex].getAttribute('data-full-src') || galleryImages[nextIndex].src;
            imgNext.alt = galleryImages[nextIndex].alt;
        } else {
            // Clear prev/next sources on desktop to prevent them from showing
            imgPrev.remove()
            imgNext.remove()

            // Get a reference to the HTML element
            const imgCurrent = document.querySelector('.modal-content');

            // Remove the 'disabled' attribute from the element
            imgCurrent.style.setProperty('max-height', 'none', 'important');
            imgCurrent.style.setProperty('width', 'auto', 'important');
        }
        // Reset track position to show current image in the middle
        const initialTransform = getInitialTrackTransformValue();
        const isPercentage = window.innerWidth > 700;
        applyTrackTransform(initialTransform, isPercentage);
    }

    function navigate(direction) {
        // Disable transition before updating images to avoid flicker while setting new image
        imageTrack.classList.add('no-transition');

        if (direction === 'prev') {
            loadTrackImages((currentIndex - 1 + galleryImages.length) % galleryImages.length);
        } else { // 'next'
            loadTrackImages((currentIndex + 1) % galleryImages.length);
        }

        // Re-enable transition after a short delay so subsequent swipes/resets are animated
        setTimeout(() => {
            imageTrack.classList.remove('no-transition');
        }, 50);
    }

    galleryImages.forEach((img, index) => {
        img.onclick = function(){
            modal.classList.add('is-open');
            loadTrackImages(index); // This will load images and set initial transform
        }
    });

    var closeSpan = document.getElementsByClassName("close")[0];
    closeSpan.onclick = function() {
        modal.classList.remove('is-open');
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.classList.remove('is-open');
        }
    }

    prevBtn.onclick = function() {
        navigate('prev');
    }

    nextBtn.onclick = function() {
        navigate('next');
    }

    document.addEventListener('keydown', function(event) {
        if (modal.classList.contains('is-open')) {
            if (event.key === "ArrowLeft") {
                navigate('prev');
            } else if (event.key === "ArrowRight") {
                navigate('next');
            } else if (event.key === "Escape") {
                modal.classList.remove('is-open');
            }
        }
    });

    modal.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            isSwiping = true;
            touchStartX = e.touches[0].clientX;
            imageTrack.classList.add('no-transition'); // Disable transition for live dragging
        }
    });

    modal.addEventListener('touchmove', (e) => {
        if (isSwiping && e.touches.length === 1) {
            touchMoveX = e.touches[0].clientX;
            const deltaX = touchMoveX - touchStartX;

            const isPercentageMode = window.innerWidth > 700;
            const initialTransformValue = getInitialTrackTransformValue(); // 0

            let newTranslateValue;

            if (isPercentageMode) {
                // We need deltaX as a percentage of the viewport width (which is 100% for one image)
                const viewportWidth = window.innerWidth;
                const percentageDelta = (deltaX / viewportWidth) * 100; // Delta as a percentage of 100vw
                newTranslateValue = initialTransformValue + percentageDelta; // Add percentage delta to -33.33
                applyTrackTransform(newTranslateValue, true);
            } else {
                // For pixels, simply add deltaX to the initial pixel offset (-window.innerWidth)
                newTranslateValue = initialTransformValue + deltaX;
                applyTrackTransform(newTranslateValue, false);
            }

            if (Math.abs(deltaX) > 10) {
                e.preventDefault(); // Prevent vertical scrolling if horizontal movement is significant
            }
        }
    });

    modal.addEventListener('touchend', () => {
        if (isSwiping && modal.classList.contains('is-open')) {
            const deltaX = touchMoveX - touchStartX;
            imageTrack.classList.remove('no-transition'); // Re-enable transition for snap-back/snap-to-next

            if (Math.abs(deltaX) > minSwipeDistance) {
                if (deltaX > 0) { // Swiped right (to show previous)
                    navigate('prev');
                } else { // Swiped left (to show next)
                    navigate('next');
                }
            } else {
                // Snap back to current image if swipe wasn't significant
                const initialTransform = getInitialTrackTransformValue();
                const isPercentage = window.innerWidth > 700;
                applyTrackTransform(initialTransform, isPercentage);
            }
            isSwiping = false;
            touchStartX = 0;
            touchMoveX = 0;
        }
    });

    window.addEventListener('resize', () => {
        if (modal.classList.contains('is-open')) {
            imageTrack.classList.add('no-transition');
            // Ensure the track snaps to the correct centered position after resize
            const initialTransform = getInitialTrackTransformValue();
            const isPercentage = window.innerWidth > 700;
            applyTrackTransform(initialTransform, isPercentage);
            setTimeout(() => {
                imageTrack.classList.remove('no-transition');
            }, 50);
        }
    });
});
