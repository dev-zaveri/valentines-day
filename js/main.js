// Main Menu JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const bgMusic = document.getElementById('bgMusic');
    const menuButtons = document.querySelectorAll('.menu-btn');
    const dvdLogo = document.getElementById('dvdLogo');
    const audioCanvas = document.getElementById('audioCanvas');
    const canvasCtx = audioCanvas.getContext('2d');
    const heartsBackground = document.getElementById('heartsBackground');
    const clickToStart = document.getElementById('clickToStart');

    // Audio context and analyzer setup
    let audioContext;
    let analyser;
    let dataArray;
    let bufferLength;
    let audioInitialized = false;

    // Auto-play background music with user interaction
    let musicStarted = false;
    const startMusic = () => {
        if (!musicStarted) {
            // Hide the click to start overlay
            clickToStart.classList.add('hidden');
            
            // Try to play the music
            bgMusic.play()
                .then(() => {
                    console.log('Music started successfully! 🎵');
                    musicStarted = true;
                    initAudioVisualization();
                })
                .catch(err => {
                    console.log('Audio autoplay prevented:', err);
                    // Show alert if music fails to play
                    alert('Please make sure your audio file is at: audio/menu-music.mp3');
                });
        }
    };

    // Create animated hearts background
    function createBackgroundHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart-bg');
        heart.innerHTML = '❤';
        
        // Random horizontal position
        heart.style.left = Math.random() * 100 + '%';
        
        // Random animation delay
        heart.style.animationDelay = Math.random() * 5 + 's';
        
        // Random animation duration (between 10-20s)
        heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
        
        // Random size
        const size = 0.8 + Math.random() * 1.2;
        heart.style.fontSize = size + 'rem';
        
        heartsBackground.appendChild(heart);
        
        // Remove heart after animation completes
        setTimeout(() => {
            heart.remove();
        }, 20000);
    }

    // Create hearts periodically
    setInterval(createBackgroundHeart, 800);

    // Create initial batch of hearts
    for (let i = 0; i < 15; i++) {
        setTimeout(() => createBackgroundHeart(), i * 400);
    }

    // Initialize audio visualization
    function initAudioVisualization() {
        if (audioInitialized) return;
        
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioContext.createAnalyser();
            const source = audioContext.createMediaElementSource(bgMusic);
            
            source.connect(analyser);
            analyser.connect(audioContext.destination);
            
            analyser.fftSize = 256;
            bufferLength = analyser.frequencyBinCount;
            dataArray = new Uint8Array(bufferLength);
            
            audioInitialized = true;
            
            // Set canvas size
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);
            
            // Start visualization
            visualize();
        } catch (err) {
            console.log('Audio visualization not supported:', err);
        }
    }

    function resizeCanvas() {
        audioCanvas.width = window.innerWidth;
        audioCanvas.height = window.innerHeight;
    }

    // Audio visualization renderer
    function visualize() {
        requestAnimationFrame(visualize);
        
        if (!analyser) return;
        
        analyser.getByteFrequencyData(dataArray);
        
        // Clear canvas with fade effect
        canvasCtx.fillStyle = 'rgba(10, 0, 5, 0.1)';
        canvasCtx.fillRect(0, 0, audioCanvas.width, audioCanvas.height);
        
        // Calculate average frequency for overall intensity
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
            sum += dataArray[i];
        }
        const average = sum / bufferLength;
        const intensity = average / 255;
        
        // Draw romantic pulsating circles from center
        const centerX = audioCanvas.width / 2;
        const centerY = audioCanvas.height / 2;
        
        // Multiple layers of circles
        for (let i = 0; i < 5; i++) {
            const radius = 100 + (i * 80) + (intensity * 200);
            const alpha = (0.3 - i * 0.05) * intensity;
            
            // Gradient for romantic effect
            const gradient = canvasCtx.createRadialGradient(
                centerX, centerY, radius * 0.5,
                centerX, centerY, radius
            );
            
            gradient.addColorStop(0, `rgba(255, 20, 147, ${alpha})`);
            gradient.addColorStop(0.5, `rgba(233, 30, 99, ${alpha * 0.6})`);
            gradient.addColorStop(1, `rgba(139, 10, 60, 0)`);
            
            canvasCtx.beginPath();
            canvasCtx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            canvasCtx.fillStyle = gradient;
            canvasCtx.fill();
        }
        
        // Draw frequency bars around the edge
        const barCount = 64;
        const angleStep = (Math.PI * 2) / barCount;
        const baseRadius = Math.min(audioCanvas.width, audioCanvas.height) * 0.35;
        
        for (let i = 0; i < barCount; i++) {
            const dataIndex = Math.floor(i * (bufferLength / barCount));
            const value = dataArray[dataIndex];
            const barHeight = (value / 255) * 150;
            
            const angle = i * angleStep;
            const x1 = centerX + Math.cos(angle) * baseRadius;
            const y1 = centerY + Math.sin(angle) * baseRadius;
            const x2 = centerX + Math.cos(angle) * (baseRadius + barHeight);
            const y2 = centerY + Math.sin(angle) * (baseRadius + barHeight);
            
            // Color based on frequency
            const hue = 320 + (i / barCount) * 60; // Pink to rose range
            const alpha = 0.3 + (value / 255) * 0.5;
            
            canvasCtx.strokeStyle = `hsla(${hue}, 80%, 60%, ${alpha})`;
            canvasCtx.lineWidth = 3;
            canvasCtx.beginPath();
            canvasCtx.moveTo(x1, y1);
            canvasCtx.lineTo(x2, y2);
            canvasCtx.stroke();
        }
        
        // Draw particles that react to bass frequencies
        const bassFreq = dataArray.slice(0, 10);
        const bassAverage = bassFreq.reduce((a, b) => a + b, 0) / bassFreq.length;
        const bassIntensity = bassAverage / 255;
        
        if (bassIntensity > 0.3) {
            const particleCount = Math.floor(bassIntensity * 20);
            for (let i = 0; i < particleCount; i++) {
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * 200 + 100;
                const x = centerX + Math.cos(angle) * distance;
                const y = centerY + Math.sin(angle) * distance;
                const size = Math.random() * 4 + 2;
                
                canvasCtx.beginPath();
                canvasCtx.arc(x, y, size, 0, Math.PI * 2);
                canvasCtx.fillStyle = `rgba(255, 105, 180, ${bassIntensity * 0.8})`;
                canvasCtx.fill();
            }
        }
    }

    // Start music on first interaction
    document.body.addEventListener('click', startMusic, { once: true });
    clickToStart.addEventListener('click', startMusic);

    // DVD Logo Bouncing Animation
    let x = Math.random() * (window.innerWidth - 120);
    let y = Math.random() * (window.innerHeight - 60);
    let dx = 2;
    let dy = 2;

    function animateDVDLogo() {
        x += dx;
        y += dy;

        // Bounce off edges
        if (x + 120 >= window.innerWidth || x <= 0) {
            dx = -dx;
            changeLogoColor();
        }
        if (y + 60 >= window.innerHeight || y <= 0) {
            dy = -dy;
            changeLogoColor();
        }

        dvdLogo.style.left = x + 'px';
        dvdLogo.style.top = y + 'px';

        requestAnimationFrame(animateDVDLogo);
    }

    function changeLogoColor() {
        const colors = ['#FF1493', '#FF69B4', '#FFB6C1', '#DC143C', '#E91E63', '#FF6B9D'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        dvdLogo.style.color = randomColor;
    }

    animateDVDLogo();

    // Menu button navigation
    menuButtons.forEach(button => {
        button.addEventListener('click', () => {
            const page = button.getAttribute('data-page');
            
            // Add click animation
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 100);

            // Navigate after short delay
            setTimeout(() => {
                switch(page) {
                    case 'play':
                        window.location.href = 'play.html';
                        break;
                    case 'scenes':
                        window.location.href = 'scenes.html';
                        break;
                    case 'gallery':
                        window.location.href = 'gallery.html';
                        break;
                    case 'close':
                        window.location.href = 'close.html';
                        break;
                }
            }, 200);
        });

        // Hover sound effect (optional - you can add a click sound file)
        button.addEventListener('mouseenter', () => {
            // If you want to add hover sound:
            // const hoverSound = new Audio('audio/hover.mp3');
            // hoverSound.play();
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && document.activeElement.classList.contains('menu-btn')) {
            document.activeElement.click();
        }
    });
});
