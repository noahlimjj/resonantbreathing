import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';

const execPromise = promisify(exec);

// Configuration
const INPUT_FILE = 'public/15 Minute Parasympathetic Breathwork For Stress & Anxiety  I Pranayama.mp3';
const OUTPUT_FILE = 'public/pns-breathing-trimmed.mp3';
const BACKUP_FILE = 'public/15 Minute Parasympathetic Breathwork For Stress & Anxiety  I Pranayama-BACKUP.mp3';
const START_TIME = '1:17';  // Format: MM:SS or HH:MM:SS - Skip first 1 min 17 seconds
const END_TIME = null;    // Format: MM:SS or HH:MM:SS
const DURATION = null;      // Alternative: specify duration instead of end time (e.g., '30' for 30 seconds)

async function trimAudio() {
  console.log('🎵 Audio Trimmer\n');

  // Check if input file exists
  if (!fs.existsSync(INPUT_FILE)) {
    console.error(`❌ Error: Input file "${INPUT_FILE}" not found!`);
    process.exit(1);
  }

  // Create backup
  console.log(`📦 Creating backup: ${BACKUP_FILE}`);
  fs.copyFileSync(INPUT_FILE, BACKUP_FILE);
  console.log(`✅ Backup created!\n`);

  // Check if ffmpeg is installed
  try {
    await execPromise('ffmpeg -version');
  } catch (error) {
    console.error('❌ Error: ffmpeg is not installed!');
    console.log('\nTo install ffmpeg:');
    console.log('  macOS: brew install ffmpeg');
    console.log('  Linux: sudo apt install ffmpeg');
    console.log('  Windows: Download from https://ffmpeg.org/download.html');
    process.exit(1);
  }

  // Build ffmpeg command
  let command = `ffmpeg -i "${INPUT_FILE}" -ss ${START_TIME}`;

  if (DURATION) {
    command += ` -t ${DURATION}`;
  } else if (END_TIME) {
    command += ` -to ${END_TIME}`;
  }

  command += ` -c copy "${OUTPUT_FILE}" -y`;

  console.log(`📂 Input:  ${INPUT_FILE}`);
  console.log(`📂 Output: ${OUTPUT_FILE}`);
  console.log(`⏰ Start:  ${START_TIME}`);
  if (DURATION) {
    console.log(`⏱️  Duration: ${DURATION} seconds`);
  } else {
    console.log(`⏰ End:    ${END_TIME}`);
  }
  console.log(`\n🔧 Running: ${command}\n`);

  try {
    const { stdout, stderr } = await execPromise(command);

    // ffmpeg outputs to stderr by default
    if (stderr) {
      console.log(stderr);
    }

    console.log('\n✅ Audio trimmed successfully!');
    console.log(`📦 Output saved to: ${OUTPUT_FILE}`);

    // Show file sizes
    const inputSize = fs.statSync(INPUT_FILE).size;
    const outputSize = fs.statSync(OUTPUT_FILE).size;
    console.log(`\n📊 File sizes:`);
    console.log(`   Original: ${(inputSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Trimmed:  ${(outputSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   Saved:    ${((inputSize - outputSize) / 1024 / 1024).toFixed(2)} MB`);

  } catch (error) {
    console.error('❌ Error trimming audio:', error.message);
    process.exit(1);
  }
}

// Run the script
trimAudio();
