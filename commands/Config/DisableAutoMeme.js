const db = require('quick.db');
const { dev } = require('../../config.json');

module.exports = {
	name: 'disableautomeme',
	aliases: ['disableam', 'automemeoff', 'offautomeme'],
	category: 'config',
	description: 'Disables auto-meme channel of the server.',
	usage: 'disableautomemechannel [channel name | channel mention | channel ID]',
	run: async (client, message, args) => {
		if (
			!message.member.hasPermission('MANAGE_GUILD') &&
			!dev.includes(message.author.id)
		)
			return message.channel.send(
				':x: | You do not have the required permissions - [MANAGE_GUILD]'
			);

		try {
			let a = db.fetch(`auto-meme_${message.guild.id}`);

			if (!a) {
				return message.channel.send(
					':x: | There is no auto-meme channel set in this server.'
				);
			} else {
				let channel = message.guild.channels.cache.get(a);

				client.guilds.cache
					.get(message.guild.id)
					.channels.cache.get(channel.id)
					.send(
						':white_check_mark: | Auto-meme channel has been successfully disabled.'
					);

				db.delete(`auto-meme_${message.guild.id}`);

				message.channel.send(
					`:white_check_mark: | Auto-meme channel has been successfully removed from:  \`${
						channel.name
					}\`**`
				);
			}

			return;
		} catch {
			return message.channel.send(
				":x: Error - `Missing Permissions or Channel Doesn't Exist`"
			);
		}
	}
};
