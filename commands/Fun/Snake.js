const { Client, Message } = require('discord.js');
const SnakeGame = require('snakecord');
module.exports = {
	name: 'snakegame',
	description: 'start a 🐍snake game',
	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
		const snakeGame = new SnakeGame({
			title: 'Snake Game',
			color: 'GREEN',
			timestamp: true,
			gameOverTitle: 'Game Over'
		});
		return snakeGame.newGame(message);
	}
};
