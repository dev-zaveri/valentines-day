# Valentine's Day DVD Menu Website 💕

A retro-styled DVD menu website for Valentine's Day with authentic early 2000s DVD aesthetics including bouncing DVD logo, CRT scan lines, and animated transitions.

## 🎬 Features

- **Main Menu**: Classic DVD menu with bouncing logo animation
- **Play Page**: Video player with custom controls and timecode
- **Scene Select**: Grid of navigable scene thumbnails
- **Photo Gallery**: Interactive photo grid with lightbox viewer
- **Error/Closing Page**: Fun "DVD crashed" ending with floating hearts
- **Custom Music**: Each page supports unique background music
- **Retro Effects**: Scanlines, CRT vignette, glitch effects
- **Keyboard Navigation**: Full keyboard support throughout
- **Responsive Design**: Works on desktop and mobile devices

## 📁 Project Structure

```
valentine-dvd-menu/
├── index.html          # Main menu page
├── play.html           # Video player page
├── scenes.html         # Scene selection page
├── gallery.html        # Photo gallery page
├── close.html          # Error/closing page
├── css/
│   └── main.css        # All styles
├── js/
│   ├── main.js         # Main menu logic
│   ├── play.js         # Video player logic
│   ├── scenes.js       # Scene selection logic
│   ├── gallery.js      # Gallery + lightbox logic
│   └── close.js        # Closing page logic
├── images/             # Your images go here
│   ├── scene-1.jpg     # Scene thumbnails (4 images)
│   ├── scene-2.jpg
│   ├── scene-3.jpg
│   ├── scene-4.jpg
│   ├── photo-1.jpg     # Gallery photos (6 images)
│   ├── photo-2.jpg
│   ├── photo-3.jpg
│   ├── photo-4.jpg
│   ├── photo-5.jpg
│   └── photo-6.jpg
├── audio/              # Your music files go here
│   ├── menu-music.mp3  # Main menu background music
│   ├── play-music.mp3  # Play page music
│   ├── scenes-music.mp3 # Scenes page music
│   ├── gallery-music.mp3 # Gallery page music
│   └── close-music.mp3  # Closing page music
└── videos/             # Your video goes here
    └── valentine-video.mp4 # Main video file
```

## 🎨 Adding Your Content

### Images
Place your images in the `images/` folder:
- **Scene thumbnails**: `scene-1.jpg` through `scene-4.jpg` (16:9 aspect ratio recommended)
- **Gallery photos**: `photo-1.jpg` through `photo-6.jpg` (square aspect ratio recommended)

### Videos
Place your video in the `videos/` folder:
- **Main video**: `valentine-video.mp4` (MP4 format, H.264 codec recommended)

### Music
Place your music files in the `audio/` folder:
- **Main menu music**: `menu-music.mp3` (plays on menu, scenes, and gallery pages)
- **Play page music**: `play-music.mp3` (optional - plays on video page if you want different music)
- **Close page music**: `close-music.mp3` (optional - plays on closing page)
- All files should be MP3 format
- Music loops automatically on each page

**Note:** The main menu music (`menu-music.mp3`) will play throughout the menu, scene selection, and gallery. Only the video page and closing page have different music.

## 🚀 Deployment to Netlify

### Method 1: Drag and Drop (Easiest)

1. **Prepare your folder**:
   - Add all your images to the `images/` folder
   - Add all your music to the `audio/` folder
   - Add your video to the `videos/` folder

2. **Go to Netlify**:
   - Visit [netlify.com](https://www.netlify.com/)
   - Sign up or log in
   - Click "Add new site" → "Deploy manually"

3. **Deploy**:
   - Drag and drop the entire `valentine-dvd-menu` folder
   - Netlify will automatically deploy your site
   - You'll get a URL like `https://random-name-12345.netlify.app`

4. **Customize domain** (optional):
   - Go to "Site settings" → "Domain management"
   - Click "Add custom domain" or "Change site name"

### Method 2: Git/GitHub (Recommended)

1. **Create a GitHub repository**:
   ```bash
   cd valentine-dvd-menu
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/valentine-dvd.git
   git push -u origin main
   ```

2. **Connect to Netlify**:
   - Go to [netlify.com](https://www.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and select your repository
   - Build settings: Leave default (no build command needed)
   - Click "Deploy site"

3. **Automatic updates**:
   - Every time you push to GitHub, Netlify automatically redeploys

### Method 3: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Navigate to your project
cd valentine-dvd-menu

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

## 🎮 Usage Guide

### Navigation

**Main Menu**:
- Click any button to navigate to that section
- Watch the bouncing DVD logo (it changes color when it hits corners!)

**Play Page**:
- Click the video overlay to start playing
- Use the "Back to Menu" button to return
- Keyboard: Space to play/pause, Escape to return

**Scene Select**:
- Click any scene thumbnail to jump to that part of the video
- Keyboard: Arrow keys to navigate, Enter to select, Escape to return

**Photo Gallery**:
- Click any photo to open in lightbox view
- In lightbox: Click arrows to navigate, X to close
- Keyboard: Arrow keys to navigate photos, Escape to close

**Closing Page**:
- Enjoy the floating hearts animation
- Click "Return to Menu" to start over

### Customization Tips

**Change Colors**: 
Edit CSS variables in `css/main.css`:
```css
:root {
    --dvd-blue: #0047AB;      /* Main accent color */
    --dvd-gold: #FFD700;      /* Highlight color */
    --glow-color: #00FFFF;    /* Glow effects */
}
```

**Modify Text**:
- Edit page titles directly in the HTML files
- Update scene titles in `scenes.html`
- Customize error messages in `close.html`

**Add More Photos/Scenes**:
- Duplicate existing `.scene-item` or `.gallery-item` divs
- Update the image paths and indices
- Adjust the total count in JavaScript if needed

## 📱 Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Responsive design

## 🎵 Audio Notes

- Music auto-plays on first user interaction (browser requirement)
- Volume automatically adjusts when video plays
- All music files loop automatically

## 🐛 Troubleshooting

**Images not showing?**
- Check that image filenames match exactly (case-sensitive)
- Ensure images are in the correct `images/` folder

**Music not playing?**
- Check that audio files are MP3 format
- Verify filenames match those in the HTML files
- Remember: browsers require user interaction before audio plays

**Video not loading?**
- Use MP4 format with H.264 codec
- Keep file size reasonable (under 100MB recommended)
- Test video plays in your browser before uploading

## 💝 Final Tips

1. **Test locally first**: Open `index.html` in your browser to test everything
2. **Optimize images**: Compress images to reduce load time
3. **Video size**: Consider compressing your video for faster loading
4. **Preview before sharing**: Test the full experience before sending the link
5. **Share the love**: Send the link to your Valentine! 💕

## 📄 License

This project is free to use for personal Valentine's Day gifts! ❤️

---

Made with ❤️ for Valentine's Day
