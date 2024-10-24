require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const discordToken = process.env.DISCORD_BOT_TOKEN;
const client = new Client({ intents: [GatewayIntentBits.Guilds]});

client.on('ready', () => {
    console.log(`logged in as ${client.user.tag}`);
})

client.login(discordToken);