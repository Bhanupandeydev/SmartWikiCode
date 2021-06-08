const db = require('quick.db');
const Discord = require('discord.js');

module.exports = {
	name: 'setboostlogs',
	description: 'set boost notifier channel',
	aliases: ['boostnotifier', 'boostlogs'],
	timeout: '5000',
	run: async (client, message, args) => {
		if (message.author.bot) return;
		if (!message.member.hasPermission('ADMINISTRATOR'))
			return message.channel.send(
				'**You Do Not Have The Required Permissions! - [ADMINISTRATOR]**'
			);

		if (!args[0]) {
			const embed = new Discord.MessageEmbed();
			embed
				.setAuthor(message.guild.name, message.guild.iconURL())
				.setColor('2f3136')
				.setFooter(client.user.username, client.user.avatarURL())
				.setDescription(
					`<:Warn:813261185860239430>**Enter a valid Text Channel!**`
				)
				.addField('Example usage: ', 's!boostlogs #logs')
				.setTimestamp();
			return message.channel.send(embed);
		}
		let channel =
			message.mentions.channels.first() ||
			client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) ||
			message.guild.channels.cache.find(
				c => c.name.toLowerCase() === args.join(' ').toLocaleLowerCase()
			);
		const embed2 = new Discord.MessageEmbed()
			.setAuthor(message.guild.name, message.guild.iconURL())
			.setColor('2f3136')
			.setFooter(client.user.username, client.user.avatarURL())
			.setDescription(
				`
			<a:Disagree:796768229481119744>**Please enter a valid Text Channel!**`
			)
			.addField('Example usage: ', 's!boostlogs #logs')
			.setTimestamp();
		if (!channel || channel.type !== 'text')
			return message.channel.send(embed2);

		try {
			let a = await db.fetch(`boostlogs_${message.guild.id}`);

			if (channel.id === a) {
				const embed3 = new Discord.MessageEmbed()
					.setAuthor(message.guild.name, message.guild.iconURL())
					.setColor('2f3136')
					.setFooter(client.user.username, client.user.avatarURL())
					.setDescription(
						`<a:Disagree:796768229481119744>**This Channel has Already been configured As Boost Notifier Channel!**`
					)
					.setTimestamp();
				return message.channel.send(embed3);
			} else {
				client.guilds.cache
					.get(message.guild.id)
					.channels.cache.get(channel.id);
				db.set(`boostlogs_${message.guild.id}`, channel.id);
				const embed4 = new Discord.MessageEmbed()
					.setAuthor(message.guild.name, message.guild.iconURL())
					.setColor('2f3136')
					.setFooter(client.user.username, client.user.avatarURL())
					.setDescription(
						`<a:yes:755335555402956800>**Boost Notifier Logs Set To \`${
							channel.name
						}\`!**`
					)
					.setTimestamp();
				message.channel.send(embed4);
			}
		} catch (err) {
			const embed5 = new Discord.MessageEmbed()
				.setAuthor(message.guild.name, message.guild.iconURL())
				.setColor('2f3136')
				.setFooter(client.user.username, client.user.avatarURL())
				.setDescription(
					`<a:Disagree:796768229481119744>**Error - \`Missing Permissions Or Channel Is Not A Text Channel!\`**`
				)
				.setTimestamp();
			message.channel.send(embed5);
			return console.log(err);
		}
	}
};
