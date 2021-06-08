const { Client, Message } = require('discord.js');
module.exports = {
	name: 'snakegame',
	aliases: ['snake'],
	description: 'start a 🐍snake game',
	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (client, message, args) => {
		const { Snake } = require('weky');
		new Snake({
			message: message,
			embed: {
				title: 'Snake', //embed title
				color: '#gt4668', //embed color
				gameOverTitle: 'Game Over' //game over embed title
			},
			emojis: {
				empty: '⬛', //zone emoji
				snakeBody: '🐍', //snake
				food: '🥭', //food emoji
				//control
				up: '⬆️',
				right: '⬅️',
				down: '⬇️',
				left: '➡️'
			}
		}).start();
	}
};
