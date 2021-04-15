const client = require(`../index`);
const {
	Client,
	Message,
	MessageAttachment,
	MessageEmbed,
	Collection
} = require('discord.js');
const config = require(`../config.json`);

client.on(`message`, async message => {
	const dms = client.channels.cache.get('818436476193865739');
	if (!message.guild || message.guild === undefined) {
		if (message.author.id === client.user.id) return;
		const atch = message.attachments;
		const emm = new MessageEmbed()
			.setTitle(`Dmed by ${message.author.tag}`)
			.setColor(`RANDOM`)
			.setDescription(`Content: ${message.content || `No content`}\n`)
			.setFooter(`ID: ${message.author.id}`);

		dms.send(emm);
		dms.send(`Attachments:`);
		dms.send(atch).catch(async () => {
			dms.send('No Attachments');
			return;
		});
		return;
	}
});
