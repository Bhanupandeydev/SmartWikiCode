const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
	name: 'apply',
	hidden: true,
	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */

	run: async (client, message, args) => {
		/*	if (message.guild.id === '738322779308556308') return message.channel.send(
				'This command can Only be ran in **Broken Controllers Server**'
			);*/
		const questions = [
			"What's is your name",
			'How old are you? ',
			'How long have you been using discord?',
			'What level are you in `Broken Controllers` (Run !rank in commands channel to find yo rank! ) ',
			'How did you find/join our server?',
			'Have you read our rules? (<#769620234486808627>)',
			'Why do you wanna be a staff in our server?',
			'What would you do if someone is swearing in our server? (mute/warn/temp mute/kick/ban)',
			'what would you do if someone is being racist in our server? (mute/warn/temp mute/kick/ban)',
			'what would you do if someone is spamming in our server? (mute/warn/temp mute/kick/ban)'
		];

		let collectCounter = 0;
		let endCounter = 0;

		const filter = m => m.author.id === message.author.id;

		const appStart = await message.author.send(questions[collectCounter++]);
		const channel = appStart.channel;

		const collector = channel.createMessageCollector(filter);

		collector.on('collect', () => {
			if (collectCounter < questions.length) {
				channel.send(questions[collectCounter++]);
			} else {
				channel.send('Your application has been sent!');
				collector.stop('fulfilled');
			}
		});

		const appsChannel = client.channels.cache.get('822133576266809354');
		collector.on('end', (collected, reason) => {
			if (reason === 'fulfilled') {
				let index = 1;
				var poop = collected
					.map(msg => {
						return `${index++}) ${questions[endCounter++]}\n-> ${msg.content}`;
					})
					.join('\n\n');
			}
			appsChannel.send(
				new MessageEmbed()
					.setAuthor(
						message.author.tag,
						message.author.displayAvatarURL({ dynamic: true })
					)
					.setTitle('New Application!')
					.setDescription(`${poop}`)
					.setColor('RANDOM')
					.setTimestamp()
			);
		});
	}
};
