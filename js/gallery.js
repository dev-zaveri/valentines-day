// Gallery Page JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const bgMusic = document.getElementById('bgMusic');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const backBtn = document.getElementById('backBtn');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const closeLightbox = document.getElementById('closeLightbox');
    const prevPhoto = document.getElementById('prevPhoto');
    const nextPhoto = document.getElementById('nextPhoto');
    const photoCounter = document.getElementById('photoCounter');

    let currentPhotoIndex = 0;
    const totalPhotos = galleryItems.length;

    // Auto-play background music
    let musicStarted = false;
    document.body.addEventListener('click', () => {
        if (!musicStarted) {
            bgMusic.play().catch(err => console.log('Audio autoplay prevented'));
            musicStarted = true;
        }
    }, { once: true });

    // Gallery item click handlers
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentPhotoIndex = index;
            openLightbox();
        });
    });

    function openLightbox() {
        const img = galleryItems[currentPhotoIndex].querySelector('img');
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        updateCounter();
        lightbox.classList.add('active');
        
        // Lower background music volume in lightbox
        bgMusic.volume = 0.3;
    }

    function closeLightboxFunc() {
        lightbox.classList.remove('active');
        bgMusic.volume = 1;
    }

    function showPrevPhoto() {
        currentPhotoIndex = (currentPhotoIndex - 1 + totalPhotos) % totalPhotos;
        const img = galleryItems[currentPhotoIndex].querySelector('img');
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        updateCounter();
    }

    function showNextPhoto() {
        currentPhotoIndex = (currentPhotoIndex + 1) % totalPhotos;
        const img = galleryItems[currentPhotoIndex].querySelector('img');
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        updateCounter();
    }

    function updateCounter() {
        photoCounter.textContent = `${currentPhotoIndex + 1} / ${totalPhotos}`;
    }

    // Lightbox controls
    closeLightbox.addEventListener('click', closeLightboxFunc);
    prevPhoto.addEventListener('click', showPrevPhoto);
    nextPhoto.addEventListener('click', showNextPhoto);

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightboxFunc();
        }
    });

    // Back button
    backBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            switch(e.key) {
                case 'Escape':
                    closeLightboxFunc();
                    break;
                case 'ArrowLeft':
                    showPrevPhoto();
                    break;
                case 'ArrowRight':
                    showNextPhoto();
                    break;
            }
        } else {
            if (e.key === 'Escape') {
                window.location.href = 'index.html';
            }
        }
    });
});
