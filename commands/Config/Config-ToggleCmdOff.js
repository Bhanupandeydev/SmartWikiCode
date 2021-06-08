const schema = require('../../models/command');
const config = require('../../config.json');
const emotes = require('../../configs/emotes.json');
const discord = require('discord.js');
module.exports = {
	name: 'cmd-disable',
	aliases: ['disable', 'toggleoff'],
	description: 'Disable a command',
	usage: '<command name>',
	run: async (client, message, args) => {
			if (!message.member.permissions.has('ADMINISTRATOR'))
				return message.channel.send(
					'You need administrator permissions to use this command'
				);
			const cmd = args[0]
			if (!cmd) return message.channel.send('Please specify a command');
			if (!!client.commands.get(cmd) === false)
				return message.channel.send('This command does not exist');
			schema.findOne({ Guild: message.guild.id }, async (err, data) => {
				if (err) throw err;
				if (data) {
					if (data.Cmds.includes(cmd))
						return message.channel.send(
							'This command has already been disabled.'
						);
					data.Cmds.push(cmd);
				} else {
					data = new schema({
						Guild: message.guild.id,
						Cmds: cmd
					});
				}
				await data.save();
				message.channel.send(`Command ${cmd} has been disabled`);
			});
	}
};
