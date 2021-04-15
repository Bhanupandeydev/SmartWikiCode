const { Client, Message, MessageEmbed } = require('discord.js');
const emotes = require('../../configs/emotes.json');
const ms = require("ms")
module.exports = {
	name: 'slowmode',
	description: 'Sets SlowMode for a Channel',
	aliases: ['setslowmode'],
	run: async (client, message, args) => {
		const noperm = new MessageEmbed()
			.setTitle(`${emotes.error}Uh Oh, An Error Occured`)
			.setDescription(
				`You do not have enough permissions to execute this command \nMissing Permissions: \`Manage Channels\`
`
			)
			.setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
      .setFooter(`Command Executed By ${message.author.username}`, message.guild.iconURL({ dynamic: true })) 
			 .setColor('RED');

		if (!message.member.permissions.has('MANAGE_CHANNELS'))
			return message.inlineReply(noperm);

		if (!args[0]) {
			message.channel.setRateLimitPerUser(0);
			return message.inlineReply(
				`${emotes.yes} The slowmode has been removed!`
			);
		}
		const raw = args[0];
		const milliseconds = ms(raw);

		if (isNaN(milliseconds))
			return message.inlineReply('That is not a valid time!');

		if (milliseconds < 1000)
			return message.inlineReply(
				`${emotes.error}The minimum slowmode is 1 second!`
			);

		message.channel.setRateLimitPerUser(milliseconds / 1000);
		message.inlineReply(
				`${emotes.yes} The slowmode for this channel has been set to ${ms(
					milliseconds,
					{
						long: true
					}
				)}`
			)

			.catch(e => {
				message.channel.send('Error Occured!');
				e ? console.error(e) : console.log('Unknown Error');
			});
	}
};
