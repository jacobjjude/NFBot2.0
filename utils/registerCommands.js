// utils/registerCommands.js

const { REST, Routes } = require('discord.js');
const { description } = require('../src/commands/ping');

async function registerCommands(client, discordToken, appId, guildId) {
    const commands = Array.from(client.commands.values()).map(command => command.data.toJSON());

    const rest = new REST({ version: '10' }).setToken(discordToken);

    try {
        await rest.put(
            Routes.applicationGuildCommands(appId, guildId),
            { body: commands }
        );
    } catch (error) {
        console.error(error);
    }
}

module.exports = { registerCommands }