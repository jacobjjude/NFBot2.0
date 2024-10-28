//Scan commands folder
const fs = require('fs');

// fs.readdirSync('/src/commands')
//Dynamically load commands
function loadCommands(client) {
    let commands = fs.readdirSync('./src/commands');

    for (let command of commands) {
        let commandRequire = require(`../commands/${command}`);
        client.commands.set(commandRequire.name, commandRequire);
    }
}
//Export for use
module.exports = { loadCommands };