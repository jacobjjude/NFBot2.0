## Structure:
- logs - error logs
- node_modules
- src -- handles commands and events
	- commands -- features/bot commands
	- events -- handling events like ready or when a slash command is used
	- bot.js -- main entrypoint for bot
	- commandHandler.js -- responsible for loading all commands.
- tests -- check if bot works before pushing
- utils  -- QoL and utility functions