//src/commands/imake/imageEmbed.js
const { EmbedBuilder } = require('discord.js');
const path = require('path');
const fs = require('fs');

async function sendImageEmbed(interaction, imagePath, prompt) {
    const imageEmbed = new EmbedBuilder()
        .setTitle(`I made ${interaction.user.globalName} an image for...`)
        .setDescription(prompt)
        .setImage(`attachment://${path.basename(imagePath)}`)
        .setColor([81, 27, 143]);

    await interaction.editReply({
        embeds: [imageEmbed],
        files: [{ attachment: imagePath, name: path.basename(imagePath) }]
    });

    try {
        fs.unlinkSync(imagePath);
        console.log(`Deleted local image file: ${imagePath}`);
    } catch (error) {
        console.error(`Failed to delete image file: ${error}`);
    }
}

module.exports = { sendImageEmbed };