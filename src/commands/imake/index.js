// src/commands/imake/index.js

const { SlashCommandBuilder } = require('discord.js');
const { generateImage } = require('../../../utils/openaiHelper');
const { sendImageEmbed } = require('./imageEmbed');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('imake')
    .setDescription('Generates an AI image based off of your prompt')
    .addStringOption( option => option
        .setName('prompt')
        .setDescription('Describe the image you want')
        .setRequired(true)
    ),
    async execute(interaction) {
        const prompt = interaction.options.getString('prompt');

        try {
            await interaction.deferReply();
            const imageUrl = await generateImage(prompt);
            console.log(`Generated image URL: ${imageUrl}`);
            await sendImageEmbed(interaction, imageUrl);
        } catch (error) {
            console.error(`Error generating image: `, error);
            await interaction.reply({ content: 'There was an error generating the image.', ephemeral: true });
        }
    }
}