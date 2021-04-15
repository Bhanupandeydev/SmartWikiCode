const Discord = require('discord.js');
const moment = require('moment');
require('moment-duration-format');

module.exports = {
	name: 'uptime',
	description: 'Shows bot uptime',
	aliases: ['up', 'alivefor', 'alive'],
	usage: '',
	accessableby: '',
	run: async (client, message, args) => {
		const prefix = `s`
		if (!message.content.startsWith(prefix)) return;

		let uptime = moment
			.duration(client.uptime)
			.format('D [ days] h[ hours] m[ minutes] s[ seconds]');

		const duration = moment.duration(client.uptime);
		let bicon = client.user.displayAvatarURL();
		var botembed = new Discord.MessageEmbed();
		
			botembed.setTitle("SmartWiki's Uptime")
			.setColor('#ee7373')
			.setDescription(
				`<a:region:808917047823433739> **SmartWiki has been active for** \`${uptime}\`. \n <a:region:808917047823433739> **The ping is currently** \`${
					client.ws.ping
				} ms\`. \n\n  ❗  **__Attention!__** **SmartWiki is restarting himself after \`10 to 15 hours\` for a good quality and lagless sound!**`
			)
			.setTimestamp()
			.setFooter(
				'© SmartWiki ',
				`https://media.discordapp.net/attachments/776925179947384884/808369542648561705/standard.gif`
			)
			.setThumbnail(`https://cdn.discordapp.com/attachments/776925179947384884/808369542648561705/standard.gif`);
		message.react('821776609278296135');
		message.channel.send(botembed);
	}
};
