// Play Page JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const bgMusic = document.getElementById('bgMusic');
    const mainVideo = document.getElementById('mainVideo');
    const videoOverlay = document.getElementById('videoOverlay');
    const backBtn = document.getElementById('backBtn');
    const timecode = document.getElementById('timecode');

    // Auto-play background music
    let musicStarted = false;
    document.body.addEventListener('click', () => {
        if (!musicStarted) {
            bgMusic.play().catch(err => console.log('Audio autoplay prevented'));
            musicStarted = true;
        }
    }, { once: true });

    // Video overlay click to play
    videoOverlay.addEventListener('click', () => {
        mainVideo.play();
        videoOverlay.classList.add('hidden');
        // Fade out background music when video plays
        bgMusic.volume = 0.2;
    });

    // Update timecode
    mainVideo.addEventListener('timeupdate', () => {
        const currentTime = mainVideo.currentTime;
        const hours = Math.floor(currentTime / 3600);
        const minutes = Math.floor((currentTime % 3600) / 60);
        const seconds = Math.floor(currentTime % 60);
        
        timecode.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    });

    // Show overlay when video ends
    mainVideo.addEventListener('ended', () => {
        videoOverlay.classList.remove('hidden');
        bgMusic.volume = 1;
    });

    // Pause video if it was playing when we show overlay
    mainVideo.addEventListener('pause', () => {
        if (!mainVideo.ended) {
            bgMusic.volume = 1;
        }
    });

    // Back button
    backBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case ' ':
                e.preventDefault();
                if (mainVideo.paused) {
                    mainVideo.play();
                    videoOverlay.classList.add('hidden');
                } else {
                    mainVideo.pause();
                }
                break;
            case 'Escape':
                window.location.href = 'index.html';
                break;
        }
    });
});
