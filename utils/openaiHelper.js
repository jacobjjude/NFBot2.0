// utils/openaiHelper.js

const OpenAI = require("openai");
const dotenv = require("dotenv");
const { saveImageLocally } = require("./fileHelper");
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function generateImage(prompt, size, quality, style) {
    try {
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: prompt,
            n: 1,
            size,
            quality,
            style,
        });
        
        const imageUrl = response.data[0].url;
        const imagePath = await saveImageLocally(imageUrl);
        return imagePath;
        
    } catch (error) {
        console.error("Error generating image:", error);
        throw error;
    }
}

module.exports = { generateImage };