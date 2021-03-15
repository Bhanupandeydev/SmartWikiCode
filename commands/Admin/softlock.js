const { client, Message, MessageEmbed } = require("discord.js");
const config= require("../../config.json")
const emotes = require('../../configs/emotes.json');
module.exports = {
    name: 'softlock', 
    category: "Admin",
    description: `[Prevent/Allow] users without special permissions from sending messages in the current channel. Permission Overwrites will be kept.`,
    /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, [member = '']) => {
    if (!message.member.hasPermission(`ADMINISTRATOR`)) {
        return message.channel.send(`${emotes.error} You don't have the permissions to use this command [ADMINISTRATOR]!`)
    }
    
    if (!message.guild.me.hasPermission("ADMINISTRATOR"))
    return message.channel.send(
      "I need \`ADMINISTRATOR\` permission to run this command!"
    ) 
    try{
    message.channel.updateOverwrite(
        message.guild.roles.everyone,
        {
          SEND_MESSAGES: !message.channel.permissionsFor(message.guild.roles.everyone).has('SEND_MESSAGES')
        },
        `Channel Locked by: ${message.author.tag}`)
      .then((ch) => message.channel.updateOverwrite(client.user, { SEND_MESSAGES: true }))
      .then((ch) => message.channel.send(
        ch.permissionsFor(message.guild.roles.everyone).has('SEND_MESSAGES')
        ? `${emotes.success}Lockdown Ended! Everyone can now send messages on this channel`
        : `${emotes.success}Lockdown has initiated! Users without roles or special permissions will not be able to send messages here!`
      )).catch(() => message.channel.send(
        message.channel.permissionsFor(message.guild.roles.everyone).has('SEND_MESSAGES')
        ? `${emotes.error}Unable to Soft-lockdown this channel!`
        :  `${emotes.error}Unable to restore this channel!`
      ))
    } catch (err) {
      return message.channel.send(`${emotes.error}Oh No Oh NO oH NO NO NO NO NO.....`).then((msg) => {
          setTimeout(() => {
              msg.edit(`${emotes.error}An Unexpected Error Occured: **${err}** \nRun \`${config.prefix}links\` to join the support server for support`);
          }, 3000)
  })
  }
  }}