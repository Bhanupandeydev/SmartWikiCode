const config = require('../../config.json');
const emote = require('../../configs/emotes.json');
const { Database } = require('mongoose');
const emotes = require('../../configs/emotes.json');

const db = require('quick.db');
module.exports = {
	name: 'disablechatbot',
	category: 'chatbot',
	description: 'Disables a ChatBot Channel',
	aliases: 'disablechatbotchannel',
	usage: '<channel>',
	run: async (client, message, args) => {
		if (!message.member.hasPermission('MANAGE_GUILD'))
			return message.channel.send({
				embed: {
					color: config.embedcolor,
					title: `${
						emote.error
					} You do not have the required Permissions! - [MANAGE_GUILD] `
				}
			});

		//try {
		let a = db.fetch(`chatbot_${message.guild.id}`);

		if (!a) {
			return message.channel.send({
				embed: {
					color: config.embedcolor,
					title: ` ${emote.error} There is no ChatBot channel set to Disable! `
				}
			});
		} else {
			let channel = message.guild.channels.cache.get(a);
			// client.guilds.cache.get(message.guild.id).channels.cache.get(channel.ID).send(`** ${emote.success} ChatBot Channel Disabled!**`)
			db.delete(`chatbot_${message.guild.id}`);

			message.channel.send({
				embed: {
					color: config.embedcolor,
					title: `${
						emote.success
					} ChatBot Channel has been Succesfully Disabled! `
				}
			});
		}
		return;
		//     } catch (err) {
		//         return message.channel.send(`${emotes.error}Oh No Oh NO oH NO NO NO NO NO.....`).then((msg) => {
		//             setTimeout(() => {
		//                 msg.edit(`${emotes.error}An Unexpected Error Occured: **${err}** \nRun \`${config.prefix}links\` to join the support server for support`);
		//             }, 3000)
		//     })
		// }
	}
};
