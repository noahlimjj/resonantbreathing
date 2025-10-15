# Resonant Breathing

A simple, mindful breathing meditation app that helps you complete 5-minute resonant breathing sessions. Track your progress with a session counter that saves your completed sessions.

## Features

- 5-minute guided breathing sessions with audio
- Session completion counter (stored in browser localStorage)
- Mindful aesthetic design with calming colors
- Responsive design for all devices

## Development

### Install dependencies
```bash
npm install
```

### Run development server
```bash
npm run dev
```

### Build for production
```bash
npm run build
```

## Deployment to Netlify

### Option 1: Deploy via Netlify UI

1. Push your code to GitHub (instructions below)
2. Go to [Netlify](https://app.netlify.com/)
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub and select your repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

### Option 2: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

When prompted:
- Build command: `npm run build`
- Publish directory: `dist`

## Git Setup and Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Resonant breathing app"
git branch -M main
git remote add origin https://github.com/noahlimjj/resonantbreathing.git
git push -u origin main
```

## Audio File

The app expects an MP3 file at `/public/breathing-audio.mp3`. The included audio file provides a 5-minute resonant breathing guide.

## Tech Stack

- React 18
- Vite
- CSS3 with gradients and modern styling
- HTML5 Audio API
