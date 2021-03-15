const { client, Message, MessageEmbed } = require("discord.js");
const emotes = require('../../configs/emotes.json')
const config= require("../../config.json")
const prefix = config.prefix  
  
   module.exports = {
    name: 'rsroles', 
    aliases: ["removeroles"],
    category: "Admin",
    description: 'Removes **all** custom roles from a user. (@everyone will be excluded)',
    /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, [member = '', ...reason] ) => {
    try{
    if (!message.member.hasPermission(`MANAGE_ROLES`)) {
        return message.channel.send(`${emotes.error} You don't have the permissions to use this command [MANAGE_ROLES]!`)
    }
    
    if (!message.guild.me.hasPermission("ADMINISTRATOR"))
    return message.channel.send(
      "I need \`ADMINISTRATOR\` permission to run this command!\nGive me \`ADMINISTRATOR\` permission to stop these errors from poopin"
    ) 
    
    if (!member.match(/\d{17,19}/)){
        return message.channel.send(`${emotes.error} | ${message.author}, Please provide the ID or mention the user to remove all roles from. [mention first before adding the reason]`);
      };
  
      member = await message.guild.members
      .fetch(member.match(/\d{17,19}/)[0])
      .catch(() => null);
  
      if (!member){
        return message.channel.send(`${emotes.error} Unable to reset roles of the user: User not found.`);
      } else if (member.id === client.user.id){
        return message.channel.send(`${emotes.error} ${message.author}, I do not recommend resetting my roles!`);
      } else if (member.user.bot){
        return message.channel.send(`${emotes.error} ${message.author}, I do not recommend resetting bot roles! (Might affect role integration)`);
      } else if (message.member.id === member.id){
        return message.channel.send(`${emotes.error} ${message.author}, You cannot reset your own roles!`);
     } else if (!Boolean(member.roles.cache.size - 1)){
        return message.channel.send(`${emotes.error} ${message.author}, **${member.user.tag}** has no roles to remove from.`);
      };
  
      await message.channel.send(`This will remove all of **${member.user.tag}**'s roles, including special roles like mute role. Continue? Reply with \`yes\` or \`no\``);
  
      const filter = _message => message.author.id === _message.author.id && ['y','n','yes','no'].includes(_message.content.toLowerCase());
      const options = { max: 1, time: 30000, errors: ['time'] };
      const proceed = await message.channel.awaitMessages(filter, options)
      .then(collected => ['y','yes'].includes(collected.first().content.toLowerCase()) ? true : false)
      .catch(() => false);
  
      if (!proceed){
        return message.channel.send(`${emotes.error} | **${message.author.tag}**, you cancelled the resetrole command!`);
      };
  
      const prevRoleCount = member.roles.cache.size - 1;
      return member.roles.set([])
      .then(member => message.channel.send(`${emotes.success}Successfully removed **${prevRoleCount}** roles from **${member.user.tag}**!`))
      .catch(() => message.channel.send(`${emotes.error} Unable to remove all of **${member.user.tag}**'s roles`))
    } catch (err) {
      return message.channel.send(`${emotes.error}Oh No Oh NO oH NO NO NO NO NO.....`).then((msg) => {
          setTimeout(() => {
              msg.edit(`${emotes.error}An Unexpected Error Occured: **${err}** \nRun \`${config.prefix}links\` to join the support server for support`);
          }, 3000)
  })
  }
    }
  };