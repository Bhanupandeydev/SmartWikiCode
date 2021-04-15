const Discord = require('discord.js');
const db = require("quick.db") 
module.exports = {
	name: 'embackup-list',
	description: 'list the emoji backup ids',
	permissions: ['MANAGE_EMOJIS'],
	run: async (client, message, args) => {
		let yus = db.get(`backups_${message.author.id}`);
		if (yus === null)
			return message.channel.send(
				':x: | **There are no backups created by you.**'
			);
		if (!yus.toString())
			return message.channel.send(
				':x: | **Sorry but There are no backups created by you.**'
			);
		let arr = new Array();
		yus.forEach(x => {
			arr.push(`\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=\nServer Name: ${x.server} \nBackup Code: ${x.code} \nEmoji Count: ${x.emojis.length}\n=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=`);
		});
		let embed = new Discord.MessageEmbed()
			.setTitle('Emoji Backup list')
			.setDescription(
				`\n${arr.join('\n')}`
			);
		embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
		embed.setFooter(`Emoji Backuper`, message.guild.iconURL());
		embed.setColor('GREEN');
		embed.setTimestamp();
		return message.channel.send({ embed: embed });
		message.channel.send({ embed: embed });
	}
};
