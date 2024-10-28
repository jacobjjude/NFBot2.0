// src/commandHandler.js
const fs = require('fs');
const path = require('path');

//Dynamically load commands
function loadCommands(client) {
    // Set command folder path
    const commandsDir = path.resolve(__dirname, 'commands');
    let commands = fs.readdirSync(commandsDir);

    // Grabs all command subfolders, and looks for index.js in subfolder
    for (let folder of commands) {
        let commandPath = path.join(__dirname, '../src/commands', folder, 'index.js');

        //Check to see if index.js exists within commands folder
        if (fs.existsSync(commandPath)) {
            let command = require(commandPath);
            console.log(`Loaded command: ${command.data.name}`);
            client.commands.set(command.data.name, command);
        } else {
            console.log(`existsSync could not find ${commandPath}`);
        }
    }
}

//Export for use
module.exports = { loadCommands };