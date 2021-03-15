const { Client, Message, MessageEmbed } = require("discord.js");
const config= require("../../config.json")
const emotes = require('../../configs/emotes.json');

module.exports = {
  name: "resetnick",
  category: 'moderation',
  description: 'Resets a users nickname',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {

      if (!message.member.hasPermission(`MANAGE_NICKNAMES`)) {
        return message.channel.send(`${emotes.error} You don't have the permissions to use this command [MANAGE_NICKNAMES]!`)
    }
    
    if (!message.guild.me.hasPermission("MANAGE_NICKNAMES"))
    return message.channel.send(
      "I need \`MANAGE_NICKNAMES\` permission to run this command!"
    )

    const member = message.mentions.members.first();

    if (!member) return message.reply("Please specify a member!");

    if(message.mentions.members.first().roles.highest.position > message.guild.members.resolve(client.user).roles.highest.position)
    return message.channel.send("I do not have enough permission to set " + member.toString() + "(s) nickname!");

    await member.setNickname(null)
    return message.channel.send(`${emote.success}Reseted ` + member.toString() + "(s) Nickname!").catch(err => console.log(err))
    .catch(err => channel.send(`${emotes.error}Oops An Unexpected Error Occured:` + err `\nRun \`${config.prefix}links\` to join the support server for help`));
  },
};