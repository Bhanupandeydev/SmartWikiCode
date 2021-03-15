const Discord = require('discord.js');
const config= require("../../config.json")
const prefix = config.prefix  
const { Database } = require("mongoose")
const db = require("quick.db")

const emote = require('../../configs/emotes.json')
const emotes = require('../../configs/emotes.json')


module.exports = {
  name: 'chatbot',
  category: "chatbot",
  description: 'Shows ChatBot\'s config',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message, args) => {

      const embedd = new Discord.MessageEmbed()
      .setThumbnail(client.user.avatarURL())
      .setDescription(
        `${emote.star}ChatBot Configuration 
        ${emote.success}**Current ChatBot Channel**
        None
        **Usage:**
         Type \`${prefix}setchatbot\` - To Set a Channel 
         Type \`${prefix}disablechatbot\` - To Disable a Channel.

         **Examples**
         \`${prefix}setchatbot\` <#${message.channel.id}>
         \`${prefix}disablechatbot\` <#${message.channel.id}>`
      )
      .addField(
        "Support Link: ",
        `**[Click Here!](https://discord.gg/jp8et9xU56)**`,
        true
      )
      .addField(
        "Vote Link:",
        `**[Click Here!](https://top.gg/bot/762745762777006080/vote)**`,
        true
      )
      .setTimestamp()
      .setFooter(
        "© SmartWiki",
        "https://images-ext-1.discordapp.net/external/iE59-lNCnEW_IqcWUuoSY4lzpo9lv19XqO5URJji4ps/https/media.discordapp.net/attachments/776925179947384884/808369542648561705/standard.gif"
      )
      .setColor(config.embedcolor);
    
      try{
     let channel1 = await db.fetch(`chatbot_${message.guild.id}`);
    if(!channel1) return message.channel.send(embedd)
    var sChannel = message.guild.channels.cache.get(channel1);
    let embedvch = "<#" + sChannel.id + ">"
    const cembed = new Discord.MessageEmbed()
    
    .setThumbnail(client.user.avatarURL())
    .setDescription(
        `${emote.star}**ChatBot Settings**
        ${emote.success}**Current ChatBot Channel**
        ${embedvch}

        ${emote.info}**Usage**
        Type \`${prefix}setchatbot\` - To Set a Channel 
        Type \`${prefix}disablechatbot\` - To Disable a Channel.

        ${emote.info}**Examples**
        \`${prefix}setchatbot\` <#${message.channel.id}>
        \`${prefix}disablechatbot\` <#${message.channel.id}>`
                     )
    .addField(
        "Support Link: ",
        `**[Click Here!](https://discord.gg/jp8et9xU56)**`,
        true
      )
      .addField(
        "Vote Link:",
        `**[Click Here!](https://top.gg/bot/762745762777006080/vote)**`,
        true
      )
      .setTimestamp()
      .setFooter(
        "© SmartWiki",
        "https://images-ext-1.discordapp.net/external/iE59-lNCnEW_IqcWUuoSY4lzpo9lv19XqO5URJji4ps/https/media.discordapp.net/attachments/776925179947384884/808369542648561705/standard.gif"
      )
      .setColor(config.embedcolor);
    message.channel.send(cembed)} catch(err) {
      return message.channel.send(`${emote.error} Error - Cannot find setted chatbot channel run \`s!setchatbotchannel\` to setup chatbot!`) 
  }
// } catch (err) {
//   return message.channel.send(`${emotes.error}Oh No Oh NO oH NO NO NO NO NO.....`).then((msg) => {
//       setTimeout(() => {
//           msg.edit(`${emotes.error}An Unexpected Error Occured: **${err}** \nRun \`${config.prefix}links\` to join the support server for support`);
//       }, 3000)
// })
// }
    }
}
