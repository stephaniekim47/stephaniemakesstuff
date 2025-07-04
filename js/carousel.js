$(function() {
            let $images = $('.carousel-image');
            let current = 0;
            function showImage(idx) {
                $images.removeClass('active').eq(idx).addClass('active');
            }
            $('.carousel-btn.next').click(function() {
                current = (current + 1) % $images.length;
                showImage(current);
            });
            $('.carousel-btn.prev').click(function() {
                current = (current - 1 + $images.length) % $images.length;
                showImage(current);
            });
        });

document.addEventListener('DOMContentLoaded', function() {
            // Remove JS-based swipe logic, as scroll snap handles swiping natively.
            // Optionally, you can update the .active class on scroll for styling:
            const carouselTrack = document.querySelector('.carousel-track');
            const images = document.querySelectorAll('.carousel-image');
            function updateActiveImage() {
                let minDiff = Infinity, activeIdx = 0;
                images.forEach((img, i) => {
                    const rect = img.getBoundingClientRect();
                    const diff = Math.abs(rect.left + rect.width/2 - window.innerWidth/2);
                    if (diff < minDiff) {
                        minDiff = diff;
                        activeIdx = i;
                    }
                });
                images.forEach((img, i) => img.classList.toggle('active', i === activeIdx));
            }
            carouselTrack.addEventListener('scroll', () => {
                window.requestAnimationFrame(updateActiveImage);
            });
            updateActiveImage();
        });