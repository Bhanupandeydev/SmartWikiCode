const { MessageEmbed } = require('discord.js'); // npm i discord.js

module.exports = {
    name: 'message',
    aliases: ["showmessage", "worp", "jump"], 
    description: "command to show a message", 
    run: async (client, msg, args) => {
        try {
        if(!args[0]) return msg.reply('Provide a message ID!')
        if(isNaN(args[0])) return msg.reply("That's not a valid message ID!");
        await msg.channel.messages.fetch(args[0]).catch(err => {
            return msg.reply('Message not found in this channel..')
        })
        const message = await msg.channel.messages.cache.get(args[0]);
		const hasImage = message.attachments.size && message.attachments.first().width;
		const embed = new MessageEmbed()
			.setColor(message.member ? message.member.displayHexColor : client.color)
			.setThumbnail(message.author.displayAvatarURL({ format: 'png', dynamic: true }))
			.setImage(hasImage ? message.attachments.first().url : null)
			.setAuthor(message.author.tag, message.author.displayAvatarURL({ format: 'png', dynamic: true }))
			.setDescription(message.content)
			.setTimestamp(message.createdAt)
			.setFooter(`ID: ${message.id}`)
			.addField('Jump', `[Click Here to Jump](${message.url})`);
		return msg.channel.send(embed);
        } catch(err) {
            return;
        }
	}
};



