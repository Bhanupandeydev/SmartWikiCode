const db = require('quick.db');
const { MessageEmbed, MessageAttachment, bot } = require('discord.js');
//test

module.exports = async member => {
	//Join Role
	try {
		const role = db.fetch(`joinRole_${member.guild.id}`);
		if (role) {
			const jRole = member.guild.roles.cache.get(role);
			member.roles.add(jRole).catch(err => {
				console.log(err);
			});
		}
	} catch (e) {
		console.log(e);
	}
};
