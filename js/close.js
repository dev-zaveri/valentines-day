// Close/Error Page JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const bgMusic = document.getElementById('bgMusic');
    const restartBtn = document.getElementById('restartBtn');
    const floatingHeartsContainer = document.getElementById('floatingHearts');

    // Auto-play background music
    let musicStarted = false;
    document.body.addEventListener('click', () => {
        if (!musicStarted) {
            bgMusic.play().catch(err => console.log('Audio autoplay prevented'));
            musicStarted = true;
        }
    }, { once: true });

    // Create floating hearts animation
    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = '❤';
        
        // Random horizontal position
        heart.style.left = Math.random() * 100 + '%';
        
        // Random animation delay
        heart.style.animationDelay = Math.random() * 2 + 's';
        
        // Random animation duration (between 6-10s)
        heart.style.animationDuration = (Math.random() * 4 + 6) + 's';
        
        floatingHeartsContainer.appendChild(heart);
        
        // Remove heart after animation completes
        setTimeout(() => {
            heart.remove();
        }, 10000);
    }

    // Create hearts periodically
    setInterval(createFloatingHeart, 400);

    // Create initial batch of hearts
    for (let i = 0; i < 10; i++) {
        setTimeout(() => createFloatingHeart(), i * 200);
    }

    // Restart button - return to menu
    restartBtn.addEventListener('click', () => {
        // Add click animation
        restartBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 200);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === 'Escape') {
            window.location.href = 'index.html';
        }
    });

    // Add glitch effect to error title occasionally
    const errorTitle = document.querySelector('.error-title');
    setInterval(() => {
        if (Math.random() > 0.7) {
            errorTitle.style.animation = 'none';
            setTimeout(() => {
                errorTitle.style.animation = '';
            }, 50);
        }
    }, 3000);
});
