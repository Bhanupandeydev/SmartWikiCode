const config = require('../../config.json');
const emotes = require('../../configs/emotes.json');
const client = require('discord.js');
module.exports = {
	name: 'ping',
	category: 'BotInfo',
	cooldown: 5,
	votersOnly: true,
	description: 'Returns latency of the bot and Discord API Ping',

	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */

	run: async (client, message, args) => {
		try {
			const Discord = require('discord.js');
			const time = require('ms');

			// For the uptime for the discord bot ! ! !

			const uptime = time(client.uptime);

			// cool things yes.

			let inline = true;

			// Sends a Messages

			const pingMessage = await message.channel.send(
				'Here are my Latency and API Latency and my uptime!'
			);

			// Code Below
			// Also Change your setThumbnail and SetFooter

			const Embede = new Discord.MessageEmbed()
				.addField(
					'My Latency is:',
					`${pingMessage.createdTimestamp - message.createdTimestamp}ms`,
					inline
				)
				.setColor('#11bed3')
				.addField(
					'My API Latency is:',
					`${Math.round(client.ws.ping)}ms`,
					inline
				)
				.addField('I have been up for:', uptime);

			Embede.setThumbnail(
				'https://cdn.discordapp.com/attachments/776925179947384884/808369542648561705/standard.gif'
			);
			Embede.setFooter(
				'Ping Command',
				'https://cdn.discordapp.com/attachments/776925179947384884/808369542648561705/standard.gif'
			);
			Embede.setTimestamp();
			message.channel.send(Embede);
		} catch (e) {
			client.channels.cache.get('809839730061082634').send(e);
			message.channel.send(
				`${
					emotes.error
				} || Oops! An unknown error occured. Please try again later or join the support server by running \`${prefix}links\` `
			);
		}
	}
};
