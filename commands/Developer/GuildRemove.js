const Discord = require('discord.js');
const config = require('../../config.json');
const emotes = require('../../configs/emotes.json');
const client = require('discord.js');
module.exports = {
	name: 'guildremove',
	aliases: ['removeguilds'],
	OwnerOnly: true,
	run: async (client, message, args) => {
		const vembed = new Discord.MessageEmbed()
			.setTitle(`Sorry I Left Your Server`)
			.setDescription(
				'Hey, Sorry SmartWiki can only be added to guilds with 10members or above so I left your server\nFeel free to invite memagain when your servers has enough members using https://dsc.gg/invitesmart'
			)
			.setColor('BLURPLE')
			.setURL('https://dsc.gg/invitesmart');
		let i = 1;
		client.guilds.cache.forEach(guild => {
			setTimeout(function() {
				if (guild.members.cache.size < 10) {
					guild.leave();
				}
			}, 1000 * i);
			i++;
		});
	}
};
