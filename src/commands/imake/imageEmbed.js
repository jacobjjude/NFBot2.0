//src/commands/imake/imageEmbed.js
const { EmbedBuilder } = require('discord.js');
const path = require('path');

async function sendImageEmbed(interaction, imagePath) {
    // Use EmbedBuilder to create an embed with the image
    const imageEmbed = new EmbedBuilder()
        .setTitle('Here’s your generated image!')
        .setImage(`attachment://${path.basename(imagePath)}`);

    // Reply with the embed and attach the image file
    await interaction.editReply({
        embeds: [imageEmbed],
        files: [{ attachment: imagePath, name: path.basename(imagePath) }]
    });
}

module.exports = { sendImageEmbed };