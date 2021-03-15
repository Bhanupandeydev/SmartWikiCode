const { Client, Message, MessageEmbed, Channel } = require("discord.js");
const config= require("../../config.json")
const emotes = require('../../configs/emotes.json');
module.exports = {
  name: "setnick",
  category: 'moderation',
  description: 'Sets the nickname for a mentioned user!',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {

    const member = message.mentions.members.first();
    if (!message.member.hasPermission(`MANAGE_NICKNAMES`)) {
      return message.channel.send(`${emotes.error} You don't have the permissions to use this command [MANAGE_NICKNAMES]!`)
  }
  
  if (!message.guild.me.hasPermission("MANAGE_NICKNAMES"))
  return message.channel.send(
    "I need \`MANAGE_NICKNAMES\` permission to run this command!"
  )

    if (!member) return message.reply("Please specify a member!");

    const arguments = args.slice(1).join(" ");

    if (!arguments) return message.reply("Please specify a nickname!");
 
    if(message.mentions.members.first().roles.highest.position > message.guild.members.resolve(client.user).roles.highest.position)
    return message.channel.send("I do not have enough permission to set " + member.toString() + "(s) nickname!");       member.setNickname(arguments)
       message.channel.send(`<@${message.author.id}>, Nickname Changed!`)
       .catch(err => channel.send(`${emotes.error}Oops An Unexpected Error Occured:` + err `\nRun \`${config.prefix}links\` to join the support server for help`));
      },
};

/*
  } catch (e)  {
  return message.channel.send(`${emotes.error}oops An Unexpected Error Occured:` + err `\nRun \`${config.prefix}links\` to join the support server for help`);    
}
*/

/*  
  .catch(err => channel.send(`${emotes.error}Oops An Unexpected Error Occured:` + err `\nRun \`${config.prefix}links\` to join the support server for help`));
*/ 