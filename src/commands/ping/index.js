// src/commands/ping/index.js

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with pong'),
    async execute(interaction) {
        try {
            await interaction.reply('Pong!');
        } catch (error) {
            console.log(error);
        }
    }
}