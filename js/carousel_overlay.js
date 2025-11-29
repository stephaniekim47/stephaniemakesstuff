document.addEventListener('DOMContentLoaded', () => {
    var modal = document.getElementById("myModal");
    modal.classList.add('hidden'); // Add this line to initially hide the modal properly

    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");
    var galleryImages = Array.from(document.querySelectorAll(".gallery img"));
    var currentIndex = 0;

    var prevBtn = document.querySelector(".prev");
    var nextBtn = document.querySelector(".next");

    // Variables for swipe detection
    let touchStartX = 0;
    let touchEndX = 0;
    const minSwipeDistance = 50; // Minimum pixels to qualify as a swipe

    function updateModalContent(index) {
        if (index < 0) {
            currentIndex = galleryImages.length - 1;
        } else if (index >= galleryImages.length) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }

        const currentImage = galleryImages[currentIndex];
        modalImg.src = currentImage.getAttribute('data-full-src') || currentImage.src;
        captionText.innerHTML = currentImage.alt;
    }

    galleryImages.forEach((img, index) => {
        img.onclick = function(){
            modal.classList.remove('hidden'); // Remove hidden class to display
            modal.style.display = "flex"; // Ensure display is flex when shown
            currentIndex = index;
            updateModalContent(currentIndex);
        }
    });

    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
        modal.style.display = "none";
        modal.classList.add('hidden'); // Add hidden class back when closed
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            modal.classList.add('hidden'); // Add hidden class back when closed
        }
    }

    prevBtn.onclick = function() {
        updateModalContent(currentIndex - 1);
    }

    nextBtn.onclick = function() {
        updateModalContent(currentIndex + 1);
    }

    document.addEventListener('keydown', function(event) {
        if (modal.style.display === "flex") { // Check for "flex" now
            if (event.key === "ArrowLeft") {
                updateModalContent(currentIndex - 1);
            } else if (event.key === "ArrowRight") {
                updateModalContent(currentIndex + 1);
            } else if (event.key === "Escape") {
                modal.style.display = "none";
                modal.classList.add('hidden');
            }
        }
    });

    // --- New Swipe Gesture Code ---
    modal.addEventListener('touchstart', (e) => {
        // We only care about single touch for horizontal swipe
        if (e.touches.length === 1) {
            touchStartX = e.touches[0].clientX;
        }
    });

    modal.addEventListener('touchmove', (e) => {
        // Prevent default vertical scrolling if a horizontal swipe is being performed
        // This is important to ensure the swipe is smooth and doesn't conflict with browser scroll
        if (e.touches.length === 1) {
            touchEndX = e.touches[0].clientX;
            const deltaX = touchEndX - touchStartX;
            // Only prevent default if movement is predominantly horizontal and significant
            if (Math.abs(deltaX) > 10) { // Small threshold to detect intent
                e.preventDefault();
            }
        }
    });

    modal.addEventListener('touchend', () => {
        if (modal.style.display === "flex") { // Only process swipe if modal is open
            const deltaX = touchEndX - touchStartX;

            if (Math.abs(deltaX) > minSwipeDistance) {
                if (deltaX > 0) { // Swiped right (start X was less than end X)
                    // This means "previous" image
                    updateModalContent(currentIndex - 1);
                } else { // Swiped left (start X was greater than end X)
                    // This means "next" image
                    updateModalContent(currentIndex + 1);
                }
            }
            // Reset touch positions
            touchStartX = 0;
            touchEndX = 0;
        }
    });
    // --- End New Swipe Gesture Code ---
});
