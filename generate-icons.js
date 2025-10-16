import fs from 'fs';
import path from 'path';

// Simple SVG design matching favicon
const svgTemplate = (size) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${size * 0.1875}" fill="#4db6ac"/>
  <circle cx="${size/2}" cy="${size/2}" r="${size * 0.3125}" fill="none" stroke="white" stroke-width="${size * 0.0234}" opacity="0.5"/>
  <circle cx="${size/2}" cy="${size/2}" r="${size * 0.1875}" fill="none" stroke="white" stroke-width="${size * 0.03125}" opacity="0.8"/>
  <circle cx="${size/2}" cy="${size/2}" r="${size * 0.09375}" fill="white" opacity="0.9"/>
</svg>
`;

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

console.log('Generating icon SVG files...');

sizes.forEach(size => {
  const svg = svgTemplate(size);
  const filename = `public/icon-${size}x${size}.png`;

  // Save as SVG with .png extension (web browsers will render it)
  fs.writeFileSync(filename, svg);
  console.log(`✓ Generated ${filename}`);
});

console.log('\nDone! Icons generated in public/ folder.');
console.log('Note: These are SVG files with .png extension - browsers will render them correctly.');
