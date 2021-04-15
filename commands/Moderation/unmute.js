const muteDoc = require('../../models/mute');
const db = require('quick.db');
const Discord = require("discord.js")
module.exports = {
	name: 'unmute',
	category: 'moderation',
	run: async (client, message, args) => {
		const lang = require('../../locales/english');
		if (!message.member.hasPermission('MANAGE_ROLES')) {
			return message.channel.send(
				lang.NO_PERMS.replace('{perm}', 'MANAGE_ROLES')
			);
		}

		if (!message.guild.me.hasPermission('MANAGE_ROLES')) {
			return message.channel.send(
				lang.I_PERMS.repalce('{perm}', 'MANAGE_ROLES')
			);
		}

		var user = 	message.mentions.members.first()


		if (!user) {
			return message.channel.send(lang.NO_USER);
		}

		const reason = args.slice(2).join(' ');
		const m = await muteDoc.findOne({
			guildID: message.guild.id,
			memberID: user.id
		});

		if (!m) return message.channel.send(lang.MODERATION.USER_NOT_MUTED);
		if (m) {
			for (const role of m.memberRoles) {
				user.roles.add(role);
			}
			const c = await db.fetch(`muterole_${message.guild.id}`);
			await m.deleteOne();
			user.roles.remove(c);
			await message.channel.send(
				lang.MODERATION.MUTE_SUCCES.replace('{user}', user.user.username)
			);
		}
		 
		/*
    await client.emit(
      "modlog",
      message.guild,
      user.user.username,
      "unmute",
      "None",
      message.member.user
    );
    */
		let channel = db.fetch(`modlog_${message.guild.id}`);

		if (!channel) return;

		let embed = new Discord. MessageEmbed()
			.setColor('RED')
			.setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
			.setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
			.addField('**Action**', 'unmute') 
			.addField('**UnMuted**', user.user.username)
			.addField('**Moderator**', message.author.username)
			.addField('**Reason**', `${reason || '**No Reason**'}`)
			.addField('**Date**', message.createdAt.toLocaleString())
			.setFooter(message.member.displayName, message.author.displayAvatarURL())
			.setTimestamp();

		var sChannel = message.guild.channels.cache.get(channel);
		if (!sChannel) return;
		sChannel.send(embed);
	}
};
 