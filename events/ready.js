const { MessageEmbed } = require('discord.js');
const client = require('../index.js');
const config = require('../config.json');
const prefix = config.prefix;
const botModel = require('../models/bot');
const autoCovid = require('./autoCovid');
const pingChecker = require('./pingChecker');
const icon = '<a:Restart:809416004677533706>';
const message = `${icon} \`[ v2.1.0 ]\` SmartWiki **Restarted**`;
const db = require('quick.db');
const got = require('got');
client.on('ready', async pp => {
	console.clear();

	const vot = await botModel.findOne({ name: 'SmartWiki' });
	await botModel.findOneAndUpdate({
		name: 'SmartWiki',
		commandssincerestart: 0
	});
	const e = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0);

	const guild = client.guilds.cache.get('809833821796827206');
	const w = await guild.fetchWebhooks();
	const webhook = w.find(w => w.name === 'SmartRestart');
	if (!webhook) return;
	console.log(
		`=-=-=-=-==-==-BOT LOGS-=-==-=-=-=-=-=-=-=\n${
			client.user.username
		}  has started, with ${e} users, in ${
			client.channels.cache.size
		} channels of ${
			client.guilds.cache.size
		} guilds.\n=-=-=-=-==-==-x_x-=-==-=-=-=-=-=-=-=`
	);
	const embed = new MessageEmbed()
		.setTitle(message)
		.setColor('#f1637a')
		.setDescription(
			`\`Information\` \nServers: \`${
				client.guilds.cache.size
			}\` \nMembers: \`${e}\` \nChannels: \`${
				client.channels.cache.size
			}\` \nCommands: \`${client.commands.size}\``
		);

	webhook.send(embed).catch(e => console.log(e));
	require('./pingChecker')(client);

	require('./autoCovid')(client);
	require('../helpers/client/pollChecker')(client);
	//  require("../AntiRaid.js")(client);
	/*
    require("../helpers/client/unmuteUsers")(client);
    */
	require('../commands/Config/setcovidchannel');
	setInterval(async () => {
		await autoCovid(client, guild.id);
		await pingChecker(client);
	}, 130000);

	setInterval(() => {
		const statuses = [
			`${prefix}help || ${client.guilds.cache.size} servers.`,
			`${prefix}help || ${client.channels.cache.size} channels`,
			`${prefix}help || ${e} users`,
			`${prefix}help || ${client.commands.size} commands`
		];
		const status = statuses[Math.floor(Math.random() * statuses.length)];
		client.user.setActivity(status, { type: 'WATCHING' });
	}, 60000);

	setInterval(() => {
		client.channels.cache
			.get('844608871112638464')
			.setName(`🧭︱Ping: ${client.ws.ping}ms`);
	}, 99199);

	setInterval(async function() {
		let msg = await client.channels.cache
			.get('811508371521404988')
			.messages.fetch('844958483454492792');
		let stafflist = new MessageEmbed()
			.setColor('RED')
			.setTitle('Live Statistics')
			.setDescription([
				`Guilds: \`${client.guilds.cache.size}\``,
				`Users: \`${e}\``,
				`Channels: \`${client.channels.cache.size}\``
			]);
		msg.edit(stafflist);
	}, 100000);
})
	client.guilds.cache.forEach(g => {
		setInterval(() => {
			let dbauto = db.fetch(`auto-meme_${g.id}`);
			if (!dbauto) return;

			got('https://www.reddit.com/r/memes/random/.json').then(res => {
				let content = JSON.parse(res.body);

				const embed = new MessageEmbed()

					.setTitle(`${content[0].data.children[0].data.title}`)
					.setURL(
						`https://reddit.com${content[0].data.children[0].data.permalink}`
					)
					.setImage(content[0].data.children[0].data.url)

					.setColor('RANDOM')
					.setFooter(
						`👍 ${content[0].data.children[0].data.ups}  👎 ${
							content[0].data.children[0].data.downs
						}  💬${content[0].data.children[0].data.num_comments}`
					);

				const sChannel = client.channels.cache.get(dbauto);

				if (!sChannel) return;

				sChannel.send(embed);
			});
		}, 100000);
	})
