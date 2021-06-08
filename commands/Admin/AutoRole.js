const db = require('quick.db');
const { dev } = require('../../config.json');

module.exports = {
	name: 'joinrole',
	description: 'Set Join Role!',
	aliases: ['autorole', 'memberaddrole'],
	category: 'config',
	run: async (client, message, args) => {
		if (
			!message.member.hasPermission('MANAGE_GUILD') &&
			!dev.includes(message.author.id)
		)
			return message.channel.send(
				'**You Do Not Have The Required Permissions! - [MANAGE_GUILD]**'
			);

		const options = ['set', 'delete'];

		let option = args[0];

		if (!args[0]) {
			let b = await db.fetch(`joinRole_${message.guild.id}`);
			let roleName = message.guild.roles.cache.get(b);
			if (message.guild.roles.cache.has(b)) {
				return message.channel.send(
					`**Configured Join Roles: \`${roleName.name}\`!**`
				);
			} else
				return message.channel.send(
					'**No Role has been set as auto Role in this guild! Use s!autorole set <role mention/id> to set!**'
				);
		}

		if (!options.includes(option))
			return message.channel.send('Invalid Command Usage!');

		switch (option) {
			case 'set':
				let role =
					message.mentions.roles.first() ||
					client.guilds.cache.get(message.guild.id).roles.cache.get(args[1]);

				if (!role)
					return message.channel.send(
						'**Please Enter A Valid Role ID or Mention the role!**'
					);

				try {
					let a = await db.fetch(`joinRole_${message.guild.id}`);

					if (role.id === a) {
						return message.channel.send(
							'This Role is Already Set As Auto Role!'
						);
					} else {
						db.set(`joinRole_${message.guild.id}`, role.id);

						message.channel.send(
							`**\`${role.name}\` Has Been Added to Auto Role!**`
						);
					}
				} catch (e) {
					return message.channel.send(
						"**Error - `Missing Permissions or Role Doesn't Exist!`**",
						`\n${e.message}`
					);
				}
				break;

			case 'delete':
				let roleCase2 =
					message.mentions.roles.first() ||
					client.guilds.cache.get(message.guild.id).roles.cache.get(args[1]);

				if (!roleCase2)
					return message.channel.send(
						'**Please Enter A Valid Role ID or Mention the role!**'
					);

				try {
					let a = await db.fetch(`joinRole_${message.guild.id}`);

					if (roleCase2.id !== a) {
						return message.channel.send(
							'No Auto Roles has been set in this guild!'
						);
					} else {
						db.delete(`joinRole_${message.guild.id}`);

						message.channel.send(
							`**\`${
								role.name
							}\` Will no longer be added to member upon joining!**`
						);
					}
				} catch (e) {
					return message.channel.send(
						"**Error - `Missing Permissions or Role Doesn't Exist!`**",
						`\n${e.message}`
					);
				}
				break;
		}
	}
};
