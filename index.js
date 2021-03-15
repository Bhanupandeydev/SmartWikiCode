const {Client, Discord, Collection} = require('discord.js')
const fs = require('fs')
const colors = require("colors");

 const client = new Client({
    fetchAllMembers: false,
    restTimeOffset: 0,
    restWsBridgetimeout: 100,
    disableEveryone: true, 
    ws: { intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "DIRECT_MESSAGE_TYPING", "DIRECT_MESSAGE_REACTIONS", "DIRECT_MESSAGES", "GUILD_MESSAGE_TYPING", "GUILD_MESSAGE_REACTIONS", "GUILD_VOICE_STATES", "GUILD_INVITES", "GUILD_WEBHOOKS", "GUILD_INTEGRATIONS", "GUILD_EMOJIS", "GUILD_BANS"] },
    partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"]
  })
//GUILD_PRESENCES

const mongoose = require("mongoose")

const dbs = require("quick.db")
const config= require("./config.json")
const smartestchatbot = require('smartestchatbot')
const scb = new smartestchatbot.Client()
const TopGG = require('@top-gg/sdk') 
const AutoPoster = require('topgg-autoposter')
const logs = require('discord-logs');
const { sendErrorLog } = require("./utils/functions");
mongoose.connect(require('./config.json').database, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
})
mongoose.connection.on("connected", () => {
  console.log("Mongoose has successfully connected!");
});
// send msg if successfull connection to mongodb
mongoose.connection.on("err", err => {
  console.error(`Mongoose connection error: \n${err.stack}`);
});
// send msg if error on connection
mongoose.connection.on("disconnected", () => {
  console.warn("Mongoose connection lost");
});
//send msg if connection lost to mongodb
logs(client);
require("./utils/client")(client);
require("./ExtendedMessage");
require("./utils/config.js")(client);
require("./dashboard/server")(client);
// require("./events/ready.js")(client)

const fetch = require("node-fetch");
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
module.exports = client;
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client)

});

client.on("message", async (message) => {
  try {
  let channel = await dbs.get(`chatbot_${message.guild.id}`);
if(!channel) return;
  var sChannel = message.guild.channels.cache.get(channel);
if (message.author.bot || sChannel.id !== message.channel.id) return;
message.content = message.content.replace(/@(everyone)/gi, "everyone").replace(/@(here)/gi, "here");
  sChannel.startTyping();

  if (!message.content) return message.channel.send("Please say something.");

  scb.chat({message: message.content, name: client.user.username, owner:"ChillRage", birthplace: "dsc.gg/chills", user: message.author.id, language:"en"}).then(async reply => {
    reply = reply.replace(/affiliateplus.xyz/g, `https://discord.gg/jp8et9xU56`)
  message.inlineReply(`${reply}`)
  
 })
  sChannel.stopTyping()
  } catch (e) {
    return;
 }
});

process.on("uncaughtExceptionMonitor", (error) =>
  sendErrorLog(client, error, "error")
);
process.on("warning", (warning) => sendErrorLog(client, warning, "warning"));


client.login(config.smartwiksi).then(() => {
  const TopAPI = new TopGG.Api(config.dblkey)

  client.topGG = TopAPI

  if (config.clientID === client.user.id) {
      const ap = AutoPoster(config.dblkey, client)

      ap.on('posted', () => {
          console.log('posted stats to top.gg')
      })
    }
  })