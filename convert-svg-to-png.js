import sharp from 'sharp';

async function convertSvgToPng() {
  console.log('Converting breathe-icon.svg to app-icon-source.png...');

  try {
    await sharp('public/breathe-icon.svg')
      .resize(512, 512)
      .png()
      .toFile('public/app-icon-source.png');

    console.log('✓ Successfully converted SVG to PNG!');
  } catch (error) {
    console.error('✗ Failed to convert:', error.message);
    process.exit(1);
  }
}

convertSvgToPng();
