// src/bot.js

require('dotenv').config();
const { Client, GatewayIntentBits, REST, Routes, Collection, Events } = require('discord.js');
const { loadCommands } = require('./commandHandler');
const { registerCommands } = require('../utils/registerCommands');

const discordToken = process.env.DISCORD_BOT_TOKEN;
const guildId = process.env.GUILD_ID;
const appId = process.env.DISCORD_APP_ID;
const client = new Client({ intents: [GatewayIntentBits.Guilds]});

client.commands = new Collection();

// When client is ready, load commands from command handler
client.once('ready', async () => {
    loadCommands(client);
    await registerCommands(client, discordToken, appId, guildId);
});

client.login(discordToken);

// Handles the actual event when / command is called
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;
    console.log(interaction);

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		const userErrorMessage = `An unexpected error occurred:\n\`\`\`\n${error.message || 'Unknown error'}\n\`\`\``;

		if (interaction.deferred) {
			await interaction.editReply({ content: userErrorMessage });
		} else if (!interaction.replied) {
			await interaction.reply({ content: userErrorMessage, ephemeral: true });
		}
	}
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection:', reason);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
});
