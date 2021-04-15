const { MessageEmbed } = require('discord.js');
const { readdirSync } = require('fs');
const config = require('../../config.json');
const prefix = config.prefix;
const emotes = require('../../configs/emotes.json');
module.exports = {
	name: 'help',
	aliases: ['h'],
	usage: '<optional command name>',
	description: 'Shows all available bot commands.',
	run: async (client, message, args) => {
		const roleColor =
			message.guild.me.displayHexColor === '#ee7373'
				? 'RANDOM'
				: message.guild.me.displayHexColor;

		if (!args[0]) {
			let categories = [];

			const dirEmojis = {
				Moderation: '<:SmartModeration:821776846273249331>',
				Admin: '<:SmartAdmin:821776735766839296>',
				Chatbot: '<a:starspin:804198078789582878>',
				Config: '<:SmartConfig:821776417414447154>',
				Fun: '<:SmartConfig:821776417414447154>',
				Image: '<:Image:800983586756886548>',
				Info: '<:SmartInfo:821776609278296135>',
				Other: '<:SmartUtil:821782674095079455>',
				Bot: '<:Developer:780277148123398215>',
				Misc: '<:SmartMisc:821783914091380737>',
				Backup: '<a:Premium:813261739096408094>',
				AntiRaid: '<:emoji:810522155028578305>', 
				Music: "<:049music:826069948102344745>"
			};
			readdirSync('./commands/').forEach(dir => {
				const editedName = `${dirEmojis[dir]} ${dir.toUpperCase()}`;
				const hiddenC = ['Developer'];
				if (hiddenC.includes(dir)) return;
				const commands = readdirSync(`./commands/${dir}/`).filter(file =>
					file.endsWith('.js')
				);

				const cmds = commands
					.filter(command => {
						let file = require(`../../commands/${dir}/${command}`);

						return !file.hidden;
					})
					.map(command => {
						let file = require(`../../commands/${dir}/${command}`);

						if (!file.name) return 'No command name.';

						let name = file.name.replace('.js', '');

						return `\`${name}\``;
					});

				let data = new Object();

				data = {
					name: editedName,
					value: cmds.length === 0 ? 'In progress.' : cmds.join(' ')
				};

				categories.push(data);
			});

			const embed = new MessageEmbed()
				.setTitle('📬 Need help? Here are all of my commands:')
				.addField('Info', `Prefix: \`${prefix}\``)
				.addField(
					'Links',
					`${emotes.invite} | **[Invite](https://dsc.gg/invitesmart)** \n ${
						emotes.server
					} | **[Support Server](https://dsc.gg/smartwiki)** \n ${
						emotes.UpVote
					} | **[Vote Here](https://top.gg/bot/762745762777006080/vote)**`
				)
				.addFields(categories)
				.setDescription(
					`Use \`${prefix}help\` followed by a command name to get more additional information on a command. For example: \`${prefix}help ping\`.`
				)

				.setFooter(
					`Requested by ${message.author.tag}`,
					message.author.displayAvatarURL({ dynamic: true })
				)
				.setTimestamp()
				.setColor(roleColor);
			return message.channel.send(embed);
		} else {
			const command =
				client.commands.get(args[0].toLowerCase()) ||
				client.commands.find(
					c => c.aliases && c.aliases.includes(args[0].toLowerCase())
				);

			if (!command) {
				const embed = new MessageEmbed()
					.setTitle(
						`Invalid command! Use \`${prefix}help\` for all of my commands!`
					)
					.setColor('FF0000');
				return message.channel.send(embed);
			}

			const embed = new MessageEmbed()
				.setTitle('Command Details:')
				.addField('PREFIX:', `\`${prefix}\``)
				.addField(
					'COMMAND:',
					command.name ? `\`${command.name}\`` : 'No name for this command.'
				)
				.addField(
					'ALIASES:',
					command.aliases
						? `\`${command.aliases.join('` `')}\``
						: 'No aliases for this command.'
				)
				.addField(
					'USAGE:',
					command.usage
						? `\`${prefix}${command.name} ${command.usage}\``
						: `\`${prefix}${command.name}\``
				)
				.addField(
					'DESCRIPTION:',
					command.description
						? command.description
						: 'No description for this command.'
				)
				.setFooter(
					`Requested by ${message.author.tag}`,
					message.author.displayAvatarURL({ dynamic: true })
				)
				.setTimestamp()
				.setColor(roleColor);
			return message.channel.send(embed);
		}
	}
};
