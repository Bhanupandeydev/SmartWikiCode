const { Client, Discord, Collection } = require('discord.js');
const { Intents } = require('discord.js'),
	client = new Client({
		fetchAllMembers: false,
		restTimeOffset: 0,
		restWsBridgetimeout: 100,
		disableEveryone: true,
		ws: {
			intents: [
				'GUILDS',
				'GUILD_MESSAGES',
				'GUILD_MEMBERS',
				'DIRECT_MESSAGE_TYPING',
				'DIRECT_MESSAGE_REACTIONS',
				'DIRECT_MESSAGES',
				'GUILD_MESSAGE_TYPING',
				'GUILD_MESSAGE_REACTIONS',
				'GUILD_VOICE_STATES',
				'GUILD_INVITES',
				'GUILD_WEBHOOKS',
				'GUILD_INTEGRATIONS',
				'GUILD_EMOJIS',
				'GUILD_BANS'
			]
		},
		partials: ['CHANNEL', 'GUILD_MEMBER', 'MESSAGE', 'REACTION', 'USER']
	});

require('discord-buttons')(client);
const fs = require('fs');
const colors = require('colors');
const mongoose = require('mongoose');
const dbs = require('quick.db');
const config = require('./config.json');
const smartestchatbot = require('smartestchatbot');
const scb = new smartestchatbot.Client();
const TopGG = require('@top-gg/sdk');
const AutoPoster = require('topgg-autoposter');
const logs = require('discord-logs');
const fetch = require('node-fetch');
const { sendErrorLog } = require('./utils/functions');
logs(client);
require('./utils/client')(client);
require('./ExtendedMessage');
require('./utils/config.js')(client);
require('./dashboard/server')(client);
this.configg = require('./data/config');
/*=-=-=-=-=-=Mongoose=-=-=-=-=-*/
mongoose.connect(
	require('./config.json').database,
	{
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useFindAndModify: false
	}
);
mongoose.connection.on('connected', () => {
	console.log('Mongoose has successfully connected!');
});
mongoose.connection.on('err', err => {
	console.error(`Mongoose connection error: \n${err.stack}`);
});
mongoose.connection.on('disconnected', () => {
	console.warn('Mongoose connection lost');
});

/*=-=-=-=-=-Handling=-=-=-=-=-*/
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync('./commands/');
client.logger = require('./utils/logger.js')
module.exports = client;
['command'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});

/*=-=-=-=-=-ChatBot_Db=-=-=-=-=-*/

client.on('message', async message => {
	try {
		let channel = await dbs.get(`chatbot_${message.guild.id}`);
		if (!channel) return;
		var sChannel = message.guild.channels.cache.get(channel);
		if (message.author.bot || sChannel.id !== message.channel.id) return;
		message.content = message.content
			.replace(/@(everyone)/gi, 'everyone')
			.replace(/@(here)/gi, 'here');
		sChannel.startTyping();

		if (!message.content) return message.channel.send('Please say something.');

		scb
			.chat({
				message: message.content,
				name: client.user.username,
				owner: 'ChillRage',
				birthplace: 'dsc.gg/chills',
				user: message.author.id,
				language: 'en'
			})
			.then(async reply => {
				reply = reply.replace(
					/affiliateplus.xyz/g,
					`https://discord.gg/jp8et9xU56`
				);
				message.inlineReply(`${reply}`);
			});
		sChannel.stopTyping();
	} catch (e) {
		return;
	}
});

const { CronJob } = require('cron');
const Enmap = require('enmap');

client.joins = new Enmap({ name: 'joins', autoFetch: true, fetchAll: true });

new CronJob(
	'0 12 * * Sun',
	() => {
		client.joins.clear();
	},
	null,
	true,
	'America/Los_Angeles'
);

client
	.on('disconnect', () => client.logger.warn('Bot is disconnecting...'))
	.on('reconnecting', () => client.logger.log('Bot reconnecting...'))
	.on('error', e => client.logger.error(e))
	.on('warn', info => client.logger.warn(info));

process.on('uncaughtExceptionMonitor', error =>
	sendErrorLog(client, error, 'error')
);
process.on('warning', warning => sendErrorLog(client, warning, 'warning'));

client.login(config.smartwiksi).then(() => {
	const TopAPI = new TopGG.Api(config.dblkey);

	client.topGG = TopAPI;

	if (config.clientID === client.user.id) {
		const ap = AutoPoster(config.dblkey, client);

		ap.on('posted', () => {
			console.log(
				'\n=-=-=-=-=-=-=-=-=-=-=-=-=\nposted stats on top.gg\n=-=-=-=-=-=-=-=-=-=-=-=-='
			);
		});
	}
})