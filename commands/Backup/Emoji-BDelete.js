const Discord = require('discord.js');
const db = require('quick.db');
module.exports = {
	name: 'embackup-delete',
	permissions: ['MANAGE_EMOJIS'],
	description: 'delete emoji backup',
	run: async (client, message, args) => {
		code = args[0];
		if (!code) return message.channel.send(':x: | **Provide The backup ID**');
		let pog = db.get(`backups_${message.author.id}`);
		if (pog) {
			let data = pog.find(x => x.code === code);
			let No = new Discord.MessageEmbed();
			No.setAuthor(
				message.author.tag,
				message.author.displayAvatarURL({ dynamic: true })
			);
			No.setDescription(`:x: | **backup Not Found**`);
			No.setColor('#FF0000');
			No.setFooter(`${message.guild.name}`, message.guild.iconURL())
			No.setThumbnail(message.guild.iconURL());

			if (!data) return message.channel.send({ embed: No });
			let yes = pog.indexOf(data);
			delete pog[yes];

			var filter = pog.filter(x => {
				return x != null && x != '';
			});
			db.set(`backups_${message.author.id}`, filter);
			let embed = new Discord.MessageEmbed();
			embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
			embed.setDescription(`**The backup has been deleted!** `);
			embed.setFooter(`${message.guild.name}`, message.guild.iconURL())
			embed.setColor('GREEN');
			embed.setTimestamp();
			return message.channel.send({ embed: embed });
		} else {
			let embed = new Discord.MessageEmbed();
			embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
			embed.setDescription(`:x: | **The backup was not found!**`);
			embed.setFooter(`${message.guild.name}`, message.guild.iconURL())
			embed.setColor('#FF0000');
			embed.setTimestamp();

			return message.channel.send({ embed: embed });
		}
	}
};
