const notecounts = require(`../../database/schema/notecount`);
const note = require(`../../database/schema/note`);

module.exports = {
	name: 'delnote',
	description: 'delete a saved note',
	aliases: ['deletenote'],
	run: async (client, message, args) => {
		const user =
			message.guild.members.cache.get(args[0]) ||
			message.mentions.members.first();
		const guild = message.guild;
		const token = note.findOne({
			userID: user.id,
			notecount: args[1],
			guildID: guild.id
		});

		if (!token) {
			message.reply(`No match found. Please try again.`);
		} else if (token) {
			note.findOne(
				{ userID: user.id, notecount: args[1], guildID: guild.id },
				async (err, data) => {
					if (err) throw err;
					data
						.deleteOne()
						.then(() =>
							message.channel.send(
								`Deleted the note ${args[1]} for the user ${user}`
							)
						);
				}
			);
		}
	}
};
