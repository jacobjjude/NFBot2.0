// src/commands/ping/index.js

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with pong'),
    async execute(interaction) {
        try {
            await interaction.reply('Aha! You thought I was going to say pong. I am not a monkey who dances for your entertainment.');
        } catch (error) {
            console.log(error);
        }
    }
}