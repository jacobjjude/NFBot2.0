require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const { loadCommands } = require('./commandHandler');

const discordToken = process.env.DISCORD_BOT_TOKEN;
const client = new Client({ intents: [GatewayIntentBits.Guilds]});

client.commands = new Map();

//@TODO: When client is ready, load commands from command handler
client.once('ready', () => {
    console.log(`logged in as ${client.user.tag}`);
    loadCommands(client);
})

client.login(discordToken);