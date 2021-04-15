const config = require('../../config.json');
const emotes = require('../../configs/emotes.json');
const db = require('quick.db');

module.exports = {
	name: 'disablemodlogchannel',
	aliases: ['dmc', 'disablem', 'disablemodlog'],
	category: 'moderation',
	description: 'Disables Server Modlog Channel',
	usage: '[channel name | channel mention | channel ID]',
	accessableby: 'Administrators',
	run: async (client, message, args) => {
		if (!message.member.hasPermission('ADMINISTRATOR'))
			return message.channel.send(
				`${
					emotes.error
				} || **You Do Not Have The Required Permissions! - [ADMINISTRATOR]**`
			);

		try {
			let a = db.fetch(`modlog_${message.guild.id}`);

			if (!a) {
				return message.channel.send(
					`${emotes.error} || **There Is No Modlog Channel Set To Disable!**`
				);
			} else {
				let channel = message.guild.channels.cache.get(a);
				client.guilds.cache
					.get(message.guild.id)
					.channels.cache.get(channel.id)
					.send('**ModLogs Channel Disabled!**');
				db.delete(`modlog_${message.guild.id}`);

				message.channel
					.send(
						`**Modlog Channel Has Been Successfully Disabled in \`${
							channel.name
						}\`**`
					)
					.catch(e => console.log(e));
			}
			return;
		} catch (err) {
			return message.channel
				.send(`${emotes.error}Oh No Oh NO oH NO NO NO NO NO.....`)
				.then(msg => {
					setTimeout(() => {
						msg.edit(
							`${emotes.error}An Unexpected Error Occured: **${err}** \nRun \`${
								config.prefix
							}links\` to join the support server for support`
						);
					}, 3000);
				});
		}
	}
};
