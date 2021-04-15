const db = require('quick.db');
const config = require('../../config.json');
const emotes = require('../../configs/emotes.json');
module.exports = {
	name: `disablemuterole`,
	aliases: ['clearmuterole', 'dmr', 'disablemr', 'dmrole'],
	description: 'Disables Server Mute Role',
	usage: '[role name | role mention | role ID]',
	run: async (client, message, args) => {
		if (!message.member.hasPermission(`ADMINISTRATOR`))
			return message.channel.send(
				`${
					emotes.error
				} || **You Do Not Have The Required Permissions! - [ADMINISTRATOR]**`
			);

		try {
			let a = db.fetch(`muterole_${message.guild.id}`);

			if (!a) {
				return message.channel.send(
					`${emotes.error} || **There Is No Muterole Set To Disable!**`
				);
			} else {
				let role = message.guild.roles.cache.get(a);
				db.delete(`muterole_${message.guild.id}`);

				message.channel.send(
					`${emotes.success} || **\`${
						role.name
					}\` Has Been Successfully Disabled**`
				);
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
