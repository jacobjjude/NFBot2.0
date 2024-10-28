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
    )
    .addStringOption(option => option
        .setName('size')
        .setDescription('Choose the size of image (will default to 1024x1024)')
        .addChoices(
            {name: '1024x1024', value: '1024x1024'},
            {name: '1792x1024', value: '1792x1024'},
            {name: '1024x1792', value: '1024x1792'}
        ))
    .addStringOption(option => option
        .setName('quality')
        .setDescription('Choose the quality of the image (defaults to standard)')
        .setChoices(
            {name: 'Standard', value: 'standard'},
            {name: 'HD', value: 'hd'}
        )
    )
    .addStringOption(option => option
        .setName('style')
        .setDescription('Choose the style (defaults to vivid)')
        .setChoices(
            {name: 'Vivid', value: 'vivid'},
            {name: 'Natural', value: 'natural'}
        )
    ),
    async execute(interaction) {
        const prompt = interaction.options.getString('prompt');
        const size = interaction.options.getString('size') || '1024x1024';
        const quality = interaction.options.getString('quality') || 'standard';
        const style = interaction.options.getString('style') || 'vivid';
        
        try {
            await interaction.deferReply();
            const imageUrl = await generateImage(prompt, size, quality, style);
            await sendImageEmbed(interaction, imageUrl, prompt);
        } catch (error) {
            console.error(`Error generating image: `, error);
            await interaction.reply({ content: `There was an error generating the image. ${error}`, ephemeral: true });
        }
    }
}