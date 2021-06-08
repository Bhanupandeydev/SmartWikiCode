const Discord = require('discord.js');
const autoCovid = require('../../events/autoCovid');
const covidModel = require('../../models/covid');
const { dev } = require('../../config.json');

module.exports = {
	name: 'setcovid',
	usage: 'setcovid <#channel>',
	description: 'Set the covid auto posting channel',
	run: async (client, message, args) => {
		if (
			!message.member.hasPermission('MANAGE_GUILD') &&
			!dev.includes(message.author.id)
		)
			return message.channel.send(
				'You Do Not Have The Required Permissions! - [MANAGE_GUILD]')	

		const covid = await covidModel.findOne({ guild: message.guild.id });
		if (!args[0]) {
			if (covid) {
				const e = await covidModel.findOneAndUpdate({
					guild: message.guild.id,
					enabled: false,
					channelID: null
				});

				message.channel.send(
					'The covid auto posting channel has been reset since no channel was provided'
				);
			} else {
				const re = new covidModel({
					guild: message.guild.id,
					enabled: false,
					channelID: null
				});

				re.save();
				message.channel.send(
					'The covid auto posting channel has been reset since no channel was provided'
				);
			}
		}
		let channel = client.findChannel(message, args, false);
		if (covid) {
			await covid.updateOne({
				guild: message.guild.id,
				channelID: channel.id,
				enabled: true
			});
			message.channel.send(
				`Covid auto posting Channel is setted as ${channel}`
			);
			setInterval(async () => {
				await autoCovid(client, message.guild.id);
			}, 300000);
		} else {
			const re = new covidModel({
				guild: message.guild.id,
				channelID: channel.id,
				enabled: true
			});

			re.save();
			message.channel.send(
				`Covid auto posting Channel is setted as ${channel}`
			);

			setInterval(async () => {
				await autoCovid(client, message.guild.id);
			}, 300000)
		}
	}
};
