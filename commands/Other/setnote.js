const notecounts = require(`../../database/schema/notecount`);
const note = require(`../../database/schema/note`);

module.exports = {
	name: 'setnote',
	description: 'a set note command',
	aliases: [''],
	run: async (client, message, args) => {
		if (!args[0])
			return message.reply(
				`You should send an \`ID\` of a user or mention them!!`
			);
		if (!args[1])
			return message.reply(
				`Please mention a note you want to add \n example:\n\n -setnote <@!${
					client.user.id
				}> This is a note!`
			);
		const user =
			message.guild.members.cache.get(args[0]) ||
			message.mentions.members.first();
		const count = await notecounts.findOne({ guildID: message.guild.id });
		const notes = args.slice(1).join(' ');

		if (!count) {
			new notecounts({
				guildID: message.guild.id,
				notecount: 10001
			}).save();
			message.channel.send(`Please run the command again!!!`);
		} else {
			const counted = count.get('notecount');
			console.log(counted);

			new note({
				userID: user.id,
				guildID: message.guild.id,
				note: notes,
				author: message.author.id,
				notecount: parseInt(counted) + 1
			}).save();
			message.channel.send(`I have saved the notes for the user!`);

			await count.updateOne(
				{
					notecount: parseInt(counted) + 1
				},
				{ new: true }
			);
		}
	}
};
