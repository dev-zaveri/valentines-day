// Scenes Page JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const bgMusic = document.getElementById('bgMusic');
    const sceneItems = document.querySelectorAll('.scene-item');
    const backBtn = document.getElementById('backBtn');

    // Auto-play background music
    let musicStarted = false;
    document.body.addEventListener('click', () => {
        if (!musicStarted) {
            bgMusic.play().catch(err => console.log('Audio autoplay prevented'));
            musicStarted = true;
        }
    }, { once: true });

    // Scene click handlers
    sceneItems.forEach(item => {
        item.addEventListener('click', () => {
            // Add click animation
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
                item.style.transform = '';
            }, 100);

            // Navigate to play page - all scenes go to the same video
            setTimeout(() => {
                window.location.href = 'play.html';
            }, 200);
        });

        // Add hover effect sound (optional)
        item.addEventListener('mouseenter', () => {
            // const hoverSound = new Audio('audio/hover.mp3');
            // hoverSound.play();
        });
    });

    // Back button
    backBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    // Keyboard navigation
    let selectedIndex = 0;
    const sceneArray = Array.from(sceneItems);

    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
                e.preventDefault();
                selectedIndex = (selectedIndex + 1) % sceneArray.length;
                highlightScene(selectedIndex);
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
                e.preventDefault();
                selectedIndex = (selectedIndex - 1 + sceneArray.length) % sceneArray.length;
                highlightScene(selectedIndex);
                break;
            case 'Enter':
                e.preventDefault();
                sceneArray[selectedIndex].click();
                break;
            case 'Escape':
                window.location.href = 'index.html';
                break;
        }
    });

    function highlightScene(index) {
        sceneArray.forEach((item, i) => {
            if (i === index) {
                item.style.transform = 'scale(1.05)';
                item.style.zIndex = '10';
            } else {
                item.style.transform = '';
                item.style.zIndex = '';
            }
        });
    }
});
