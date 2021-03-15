const { MessageEmbed } = require('discord.js');
const client = require("../index.js")
const config= require("../config.json")
const prefix = config.prefix
const botModel = require("../models/bot");
const autoCovid = require("./autoCovid");
const pingChecker = require("./pingChecker")
const icon = '<a:Restart:809416004677533706>'
const message = `${icon} \`[ v2.1.0 ]\` SmartWiki **Restarted**`;
client.on('ready', async pp => {

const vot = await botModel.findOne({ name: "SmartWiki" });
await botModel.findOneAndUpdate({ name: "SmartWiki", commandssincerestart: 0 });
 const e =  (client.guilds.cache.reduce((a, g) => a + g.memberCount, 0))



  const guild = client.guilds.cache.get("809833821796827206")
    const w = await guild.fetchWebhooks();
    const webhook = w.find((w) => w.name === "SmartRestart");
    if (!webhook) return;
    console.log(`=-=-=-=-==-==-BOT LOGS-=-==-=-=-=-=-=-=-=\n${client.user.username}  has started, with ${e} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.\n=-=-=-=-==-==-x_x-=-==-=-=-=-=-=-=-=`);
    
    const embed = new MessageEmbed()
   .setTitle(message)
   .setColor("#f1637a")
   .setDescription(`\`Information\` \nServers: \`${client.guilds.cache.size}\` \nMembers: \`${e}\` \nChannels: \`${client.channels.cache.size}\` \nCommands: \`${client.commands.size}\``)

    webhook.send(embed).catch((e) => console.log(e));
    require("./pingChecker")(client);
    require("./autoCovid")(client);
    require("../commands/Config/setcovidchannel")
      setInterval(async () => {
        await autoCovid(client, guild.id)
        await pingChecker(client)
      }, 300000);

    setInterval(() => {
      const statuses = [
        `${prefix}help || ${client.guilds.cache.size} servers.`,
        `${prefix}help || ${client.channels.cache.size} channels`,
        `${prefix}help || ${e} users`,
        `${prefix}help || ${client.commands.size} commands`,
      ];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      client.user.setActivity(status, { type: "WATCHING" });
    }, 60000);
  })