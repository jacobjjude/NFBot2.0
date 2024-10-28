const fs = require('fs');
const path = require('path');

async function saveImageLocally(imageUrl) {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(imageUrl);
    const buffer = await response.buffer();

    const fileName = `${Date.now()}.png`;
    const imageDir = path.join(process.cwd(), "src/commands/imake/images");
    const imagePath = path.join(imageDir, fileName);

    if (!fs.existsSync(imageDir)) {
        fs.mkdirSync(imageDir, { recursive: true });
    }

    fs.writeFileSync(imagePath, buffer);
    console.log(`Image saved locally at ${imagePath}`);
    return imagePath;
}

module.exports = { saveImageLocally };
