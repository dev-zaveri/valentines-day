# Audio Troubleshooting Guide 🎵

## Why isn't my music playing?

### Common Issues & Solutions:

### 1. **File Location** (Most Common!)
Your music file MUST be in the correct location:
```
valentine-dvd-menu/
├── index.html
├── audio/
│   └── menu-music.mp3  ← MUST be exactly here!
```

**Check:**
- Open the `audio` folder
- Make sure your file is named EXACTLY `menu-music.mp3` (case-sensitive!)
- No extra spaces, no capital letters

### 2. **File Format**
- Must be MP3 format
- If your file is M4A, WAV, or other format, convert it to MP3 first
- Free converters: CloudConvert.com, Online-Convert.com

### 3. **Browser Restrictions**
- You MUST click on the page first before music plays
- Look for the "Click Anywhere to Start" overlay
- Click it to start the music

### 4. **File Corruption**
- Try playing your MP3 file in a media player first
- If it doesn't play there, the file might be corrupted
- Re-download or re-export the music file

### 5. **Testing Locally**
When opening `index.html` directly from your computer:
- **Chrome/Edge**: May block audio - use Firefox instead OR run a local server
- **Firefox**: Usually works fine
- **Safari**: Usually works fine

**Better way to test:**
```bash
# Install simple HTTP server (one-time setup)
npm install -g http-server

# Run server in your project folder
cd valentine-dvd-menu
http-server

# Open http://localhost:8080 in your browser
```

### 6. **Browser Console Check**
1. Open your browser's Developer Tools (F12)
2. Go to the "Console" tab
3. Refresh the page
4. Look for error messages like:
   - `Failed to load resource` = file not found
   - `CORS error` = need to use a server
   - `Decode error` = file format issue

### 7. **Volume Check**
- Make sure your computer volume is up
- Check browser tab isn't muted (look for 🔇 icon on tab)
- Check the audio element in DevTools

## Quick Test:

To verify everything is set up correctly:

1. **Check file exists:**
   - Navigate to `valentine-dvd-menu/audio/`
   - See `menu-music.mp3` file there

2. **Check file plays:**
   - Double-click `menu-music.mp3`
   - Does it play in your media player?

3. **Open index.html:**
   - Use Firefox browser (recommended for local testing)
   - Click "Click Anywhere to Start"
   - Music should start!

## Still Not Working?

### Option A: Upload to Netlify
The easiest solution! Music will work 100% when hosted:
1. Go to netlify.com/drop
2. Drag your `valentine-dvd-menu` folder
3. Music will work perfectly on the live site

### Option B: Check the file is actually MP3
```bash
# On Mac/Linux terminal:
file audio/menu-music.mp3

# Should say: "Audio file with ID3 version..."
# If it says something else, it's not a valid MP3
```

### Option C: Try a different audio file
Download a test MP3 from freesound.org and rename it to `menu-music.mp3` to verify your setup works.

## Success Checklist ✅

- [ ] File is named exactly `menu-music.mp3`
- [ ] File is in the `audio/` folder
- [ ] File is MP3 format (not M4A, WAV, etc.)
- [ ] File plays when opened directly
- [ ] Using Firefox or running a local server
- [ ] Clicked "Click Anywhere to Start" button
- [ ] Computer volume is up
- [ ] Browser tab is not muted

If all checked and still not working, the issue is likely with the audio file itself - try a different MP3!
