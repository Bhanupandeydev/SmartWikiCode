const Discord = require('discord.js');
const config= require("../../config.json")
const emote = require('../../configs/emotes.json')
const emotes = require('../../configs/emotes.json')

const { Database } = require("mongoose")
const db = require("quick.db")
module.exports = {
        name: 'setchatbot',
        category: "chatbot",
        description: 'Sets a ChatBot Channel',
        usage: '<channel>',
    run: async (client, message, args) => {
    
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send({embed: {
            color: config.embedcolor,
            title: `${emote.error} You do not have the required Permissions! - [MANAGE_GUILD] `
        }})
if (!args[0]) {
  let b = await db.fetch(`chatbot_${message.guild.id}`);
  let channelName = message.guild.channels.cache.get(b);
  if (message.guild.channels.cache.has(b)) {
    return message.channel.send(
      `**${emote.success}ChatBot Channel Set In This Server Is \`${channelName.name}\`!**`
    );
  } else
    return message.channel.send({embed: {
            color: config.embedcolor,
            title: `${emote.error} Please Enter a Channel ID or ID to set`
        }})
}
    let channel = message.mentions.channels.first() || client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name.toLowerCase() === args.join(' ').toLocaleLowerCase());

    if (!channel || channel.type !== 'text') return message.channel.send({embed: {
            color: config.embedcolor,
            title: `${emote.error} Please Enter a Valid Text Channel`
        }})

    // try {
        let a = await db.fetch(`chatbot_${message.guild.id}`)

        if (channel.id === a) {
            return message.channel.send({embed: {
            color: config.embedcolor,
            title: `${emote.info} This Channel is already set as ChatBot Channel!`
        }})
        } else {
            client.guilds.cache.get(message.guild.id).channels.cache.get(channel.id).send(`**${emote.success}ChatBot Channel Set!**`)
            db.set(`chatbot_${message.guild.id}`, channel.id)

           message.channel.send({embed: {
            color: config.embedcolor,
            title: `${emote.success}ChatBot Channel has been Set Successfully \`${channel.id}\``
        }})
        }
//     } catch (err) {
//         return message.channel.send(`${emotes.error}Oh No Oh NO oH NO NO NO NO NO.....`).then((msg) => {
//             setTimeout(() => {
//                 msg.edit(`${emotes.error}An Unexpected Error Occured: **${err}** \nRun \`${config.prefix}links\` to join the support server for support`);
//             }, 3000)
//     })
// }
    }
}