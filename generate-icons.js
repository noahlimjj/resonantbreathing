import sharp from 'sharp';
import path from 'path';

const sourceImage = 'public/app-icon-source.png';
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

async function generateIcons() {
  console.log('Generating PWA icons from screenshot...');

  for (const size of sizes) {
    const outputPath = path.join('public', `icon-${size}x${size}.png`);

    try {
      await sharp(sourceImage)
        .resize(size, size, {
          fit: 'cover',
          position: 'center'
        })
        .toFile(outputPath);

      console.log(`✓ Generated ${outputPath}`);
    } catch (error) {
      console.error(`✗ Failed to generate ${outputPath}:`, error.message);
    }
  }

  console.log('Done!');
}

generateIcons();
