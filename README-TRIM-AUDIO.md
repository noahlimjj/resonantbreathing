# Audio Trimmer Script

Simple script to trim MP3 files using ffmpeg.

## Prerequisites

Install ffmpeg:

```bash
# macOS
brew install ffmpeg

# Linux (Ubuntu/Debian)
sudo apt install ffmpeg

# Windows
# Download from https://ffmpeg.org/download.html
```

## Usage

1. **Edit the configuration** in `trim-audio.js`:

```javascript
const INPUT_FILE = 'public/breathing-audio.mp3';  // Input file path
const OUTPUT_FILE = 'public/breathing-audio-trimmed.mp3';  // Output file path
const START_TIME = '0:00';   // Start time (MM:SS or HH:MM:SS)
const END_TIME = '5:00';     // End time (MM:SS or HH:MM:SS)
const DURATION = null;       // OR specify duration in seconds (e.g., '30')
```

2. **Run the script**:

```bash
node trim-audio.js
```

## Examples

### Trim from start to 5 minutes
```javascript
const START_TIME = '0:00';
const END_TIME = '5:00';
const DURATION = null;
```

### Trim 30 seconds starting from 1 minute
```javascript
const START_TIME = '1:00';
const END_TIME = null;
const DURATION = '30';
```

### Trim from 2:30 to 8:45
```javascript
const START_TIME = '2:30';
const END_TIME = '8:45';
const DURATION = null;
```

## Time Format

- **Seconds only**: `30` (30 seconds)
- **Minutes:Seconds**: `2:30` (2 minutes 30 seconds)
- **Hours:Minutes:Seconds**: `1:30:00` (1 hour 30 minutes)

## Notes

- The script uses `-c copy` for fast trimming without re-encoding
- Original file is not modified; trimmed version is saved as new file
- Output file will be overwritten if it already exists (-y flag)
