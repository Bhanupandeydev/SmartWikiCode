const { Client, Message, MessageEmbed } = require("discord.js")
const config= require("../../config.json")
const emotes = require("../../configs/emotes.json")
module.exports = {
  name: 'resetchperms',
  aliases: [ 'rch' ],
  category: 'Info',
  description: `Removes all permission overwrites and resets @everyone permissions to \`unset\``,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try{
    if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(
      `You don't have the correct permissions for that!`
    );

  if (!message.guild.me.hasPermission("MANAGE_CHANNELS"))
    return message.channel.send(
      "I need manage channels permissions to run this command! \nGive me \`ADMINISTRATOR\` permission to stop these errors from poopin"
    )

    message.channel.overwritePermissions([
        { id: message.guild.roles.everyone.id }
      ]).then(ch => message.channel.send(`${emotes.success}Sucesssfully reset the permissions for this channel.`))
    .catch(() => message.channel.send(`${emotes.error}Unable to reset the permissions for this channel.`))

  } catch (err) {
    return message.channel.send(`${emotes.error}Oh No Oh NO oH NO NO NO NO NO.....`).then((msg) => {
        setTimeout(() => {
            msg.edit(`${emotes.error}An Unexpected Error Occured: **${err}** \nRun \`${config.prefix}links\` to join the support server for support`);
        }, 3000)
})
}

  }}