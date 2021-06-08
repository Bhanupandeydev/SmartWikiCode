const db = require('quick.db');
const { dev } = require('../../config.json');

module.exports = {
		name: 'setautomemechannel',

		category: 'config',

		aliases: ['setam'],

		description:
			'Sets A Channel Where The Bot Can Send Memes every 60 seconds!',

		usage: '[channel mention | channel ID | channel name]'
	,

	run: async (client, message, args) => {
		if (
			!message.member.hasPermission('MANAGE_GUILD') &&
			!dev.includes(message.author.id)
		)
			return message.channel.send(
				'You Do Not Have The Required Permissions! - [MANAGE_GUILD]'
			);

		if (!args[0]) {
			let b = await db.fetch(`auto-meme_${message.guild.id}`);

			let channelName = message.guild.channels.cache.get(b);

			if (message.guild.channels.cache.has(b)) {
				return message.channel.send(
					`Auto-meme channel in this server is set to:  \`${
						channelName.name
					}\`!`
				);
			} else
				return message.channel.send(
					'Please enter a channel name or ID to set as the auto-meme channel.'
				);
		}

		let channel =
			message.mentions.channels.first() ||
			client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]);

		if (!channel || channel.type !== 'text')
			return message.channel.send('Please enter a valid text channel');

		try {
			let a = await db.fetch(`auto-meme_${message.guild.id}`);

			if (channel.id === a) {
				return message.channel.send(
					'This channel is already set as the auto-meme channel.'
				);
			} else {
				client.guilds.cache
					.get(message.guild.id)
					.channels.cache.get(channel.id)
					.send('Auto-meme chanel has been set to this channel!');

				db.set(`auto-meme_${message.guild.id}`, channel.id);

				message.channel.send(
					`Auto-meme channel has been successfully set to: \`${channel.name}\`!`
				);
			}
		} catch {
			return message.channel.send(
				'Error - `Missing permissions or channel is not a text channel!`'
			);
		}
	}
};
