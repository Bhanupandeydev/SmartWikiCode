//========================REQUIRING FILES================================
const client = require('../index');
const config = require('../config.json');
const leven = require('leven');
const Discord = require('discord.js');
const prefix = config.prefix;
const emotes = require('../configs/emotes.json');
const { Collection } = require('discord.js');
const Timeout = new Collection();
const ms = require('ms');
const { MessageEmbed } = require('discord.js');
const logger = require('../utils/logger');
const blacklist = require('../models/blacklist');
const { owners, dblkey } = require('../config.json');
const db = require('../models/command');
const qdb = require('quick.db');
const cooldowns = new Discord.Collection();
const cc = require('../models/custom-commands');

const { logs } = require('nekoyasui');
const developers = '718164201033564200';
client.on('message', async message => {
	if (message.author.bot) return;

	if (
		message.content.startsWith('@someone') &&
		message.guild &&
		message.member.hasPermission('MANAGE_CHANNELS')
	) {
		const members = message.guild.members.cache.random();

		message.channel.send(members.user.toString()).then(msg => {
			msg.delete({ timeout: 1000 });
		});
	}
	if (
		message.content === `<@${client.user.id}>` ||
		message.content === `<@!${client.user.id}>`
	) {
		const mentionres = new Discord.MessageEmbed()
			.setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
			.setTitle(`Mention Response`)
			.setURL('https://dsc.gg/smartwiki')
			.setDescription(
				`Hey, Im \`SmartWiki\`, my prefix in this guild is \`s!\` \nRun the command \`s!help\` to see a list of available commands!`
			)
			.setFooter(
				`Total Commands: ${client.commands.size}`,
				message.guild.iconURL({ dynamic: true })
			)

			.setColor('2f3136');
		message.channel.send(mentionres);
	}
	if (!message.content.startsWith(prefix)) return;

	if (!message.guild) return;
	if (!message.member)
		message.member = await message.guild.fetchMember(message);
	const args = message.content
		.slice(prefix.length)
		.trim()
		.split(/ +/g);
	const cmd = args.shift().toLowerCase();

	if (cmd.length == 0) return;

	/*=-=-=-=-=-=-=-=-=-=-=-=CUSTOM CC [DISABLED]=-=-=-=-=-=-=-=-=-=-*/

	// const data = await cc.findOne({ Guild: message.guild.id, Command: cmd});
	// if(data) message.channel.send(data.Response);

	/*=-=-=-=-=-=-=-=-=-=-=-=CUSTOM CC [ENDS HERE]=-=-=-=-=-=-=-=-=-=-*/

	let command = client.commands.get(cmd);
	if (!command) command = client.commands.get(client.aliases.get(cmd));

	/*=-=-=-=-=-DID YOU MEAN SYSTEM=-==-=-=-
	if (!command) {
		const best = [
			...client.commands.map(cmd => cmd.name),
			...client.aliases.keys()
		].filter(c => leven(cmd.toLowerCase(), c.toLowerCase()) < c.length * 0.3);

		const dym =
			best.length == 0
				? ''
				: best.length == 1
					? `Did You Mean: \`${best[0]}\``
					: `Did you mean: ${best.slice(0, 3).map(value => `\`${value}\``)}`;
		return message.channel.send(
			new MessageEmbed({
				color: `#ee7373`,
				description: `Unknown command. Use s!help to view the command list.\n${dym}`
			})
		);
	}
	*/
	if (command) {
		/**==============[DISABLED COMMANDS]==============*/
		const check = await db.findOne({ Guild: message.guild.id });
		if (check) {
			if (check.Cmds.includes(command.name))
				return message.channel.send(
					'This command has been disabled by an Admin'
				);
		}
		/*===============[ARGS]============*/

		if (command.args && !args.length) {
			let reply = `You didn't provide any arguments, ${message.author}!`;

			if (command.usage) {
				reply += `\nThe proper usage would be: \`${prefix}${command.name} ${
					command.usage
				}\``;
			}

			return message.channel.send(reply);
		}
		/*===============[COOLDOWN]============*/
		if (!cooldowns.has(command.name)) {
			cooldowns.set(command.name, new Discord.Collection());
		}

		const now = Date.now();
		const timestamps = cooldowns.get(command.name);
		const cooldownAmount = (command.cooldown || 3) * 1000;

		if (timestamps.has(message.author.id)) {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

			if (now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;
				const cool = new Discord.MessageEmbed()
					.setTitle(`Cooldown: ${timeLeft.toFixed(1)}s!`)
					.setColor('RED')
					.setDescription(
						`You may not use the \`${
							command.name
						}\` command again for another ${timeLeft.toFixed(
							1
						)} seconds. \nSince you are waiting you can add **${
							client.user.username
						}** to your server by [clicking here!](https://dsc.gg/aiclever)`
					);
				return message.reply(cool).catch(e => {});
			}
		}
		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
		/**==============[PERMISSIONS]==============*/
		if (command.guildOnly && message.channel.type === 'dm') {
			return message.reply("I can't execute that command inside DMs!");
		}

		if (command.permissions) {
			const authorPerms = message.channel.permissionsFor(message.author);
			if (!authorPerms || !authorPerms.has(command.permissions)) {
				return message
					.reply(
						`${
							emotes.error
						}Error: You Don't Have Enough Permissions To Use This Command \nRequired Permissions: \`${
							command.permissions
						}\``
					)
					.catch(e => {});
			}
		}
		if (command.OwnerOnly) {
			const OwnerOnly = command.OwnerOnly;

			if (!config.owners.includes(message.author.id))
				return message.reply(`${emotes.error}Dev only command!`).catch(e => {});
		}
		const guard = new Discord.MessageEmbed();
		guard
			.setTitle(`${emotes.error}Error: Beta Command!`)
			.setDescription(
				`Sorry, This Command Is Currently In Development Please try again later!`
			);
		if (command.guarded) {
			return message.reply(guard);
		}
		if (command.botPermission) {
			let neededPerms = [];

			command.botPermission.forEach(p => {
				if (!message.guild.me.hasPermission(p)) neededPerms.push('`' + p + '`');
			});

			if (neededPerms.length)
				return message.channel
					.send(
						`I need ${neededPerms.join(
							', '
						)} permission(s) to execute the command!`
					)
					.catch(e => {});
		} else if (command.memberPermission) {
			let neededPerms = [];

			command.memberPermission.forEach(p => {
				if (!message.member.hasPermission(p)) neededPerms.push('`' + p + '`');
			});

			if (neededPerms.length)
				return message.channel
					.send(
						`You need ${neededPerms.join(
							', '
						)} permission(s) to execute the command!`
					)
					.catch(e => {});
		}
		/**==============[BLACKLISTED USER]==============*/
		blacklist.findOne({ id: message.author.id }, async (err, data) => {
			if (err) throw err;
			if (data)
				return message.channel.send(
					`You are blacklisted from Using \`${client.user.username}\`!`
				);

			command.run(client, message, args);

			logger.info(
				`${message.content}" (${command.name}) ran by "${
					message.author.tag
				}" (${message.author.id}) on guild "${message.guild.name}" (${
					message.guild.id
				}) channel "#${message.channel.name}" (${message.channel.id})`,
				{ label: 'Command' }
			);
		});
	}
});
