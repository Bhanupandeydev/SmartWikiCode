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
const blacklist = require('../models/blacklist');
const { owners, dblkey } = require('../config.json');
const db = require('../models/command');
const qdb = require('quick.db');
const cooldowns = new Discord.Collection();
const cc = require('../models/custom-commands');
const rules = require('quick.db');

const { logs } = require('nekoyasui');


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
	if (!message.content.startsWith(prefix)) return;

	/*=-=-=-=-=-=-=-=-=TOS FEATURE=-=-=-=-=-=-=-=-=-=-=-*/
	let checkingToS = rules.fetch(`agree_${message.author.id}`);
	if (checkingToS === null) {
		let notAgreed = new Discord.MessageEmbed()
			.setTitle(`${message.client.user.username}'s ToS`)
			.setColor(`#ee7373`)
			.setDescription(
				`By using SmartWiki bots features and adding this bot, you are agreeing to be bound by this bot's terms and conditions of use and agree that you are responsible for the agreement with any rules. If you disagree with any of these terms, you are prohibited from accessing this bot.`
			)
			// .addField('Links', `${message.client.user.username} has not reviewed all of the displayed content. The prescence of any link does not imply endorsement by SmartWiki. The use of any linked website is at the user's own risk.`)
			.addField(
				'Discord ToS',
				`By using ${
					message.client.user.username
				}, you agree that you will not use our bot to distribute products / services that are against [Discord ToS](https://www.discord.com/terms)`
			)
			.setFooter(
				'You have 10 seconds to react, if not this proccess will be cancelled'
			);
		return message.channel.send(notAgreed).then(async m => {
			await m.react('819602663967948860');

			const filter = (reaction, user) => {
				return (
					['SmartLike'].includes(reaction.emoji.name) &&
					user.id === message.author.id
				);
			};
			m.awaitReactions(filter, {
				max: 1,
				time: 60000,
				errors: ['time']
			}).then(async collected => {
				const reaction = collected.first();
				if (reaction.emoji.name === 'SmartLike') {
					rules.set(`agree_${message.author.id}`, true);
					m.delete();
					message.channel.send({
						embed: {
							title: 'Success!',
							description: 'You have complied with SmartWiki(s) rules!',
							color: `GREEN`,
							footer: {
								text: message.client.user.username,
								icon_url: message.client.user.displayAvatarURL()
							}
						}
					});
				}
			});
		});
	}

	/*=-=-=-=-=-=-=-=-=-=-=TOS ENDS HERE-==-=-=-=-=-=-=-=-=-=-=-*/

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
						}Error: You Don't Have Enough Permissions To Use This Command \n Missing Permissions: \`${
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
				`Sorry, This Command Is Currently In Development So It Wont Work.`
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
		});
	}
});
