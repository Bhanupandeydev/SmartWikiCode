
const { MessageEmbed } = require('discord.js');
const _ = require('lodash');
const config= require("../../config.json")
const emotes = require('../../configs/emotes.json');
module.exports = {
  name: 'listrole',
  aliases: [ 'roles' ],
  group: 'utility',
  guildOnly: true,
  description: 'Displays in list all of the roles this server has',
  get examples(){ return [this.name, ...this.aliases ];},
  run: async (client, message) => {
    try{
      message.channel.send(
    new MessageEmbed()
    .setColor('GREY')
    .setAuthor(`💮 ${message.guild.name} Roles List`)
    .setFooter(`Listrole | \©️${new Date().getFullYear()} SmartWiki`)
    .addFields(
      _.chunk(message.guild.roles.cache.array()
        .filter(x => x.id !== message.guild.id)
        .sort((A,B) => B.rawPosition - A.rawPosition), 10)
        .map(x => {
          return {
            name: '\u200b', inline: false,
            value: '\u200b' + x.map(x => `\u2000•\u2000${x}`).join('\n')
          };
        })
    )
  )

} catch (err) {
  return message.channel.send(`${emotes.error}Oh No Oh NO oH NO NO NO NO NO.....`).then((msg) => {
      setTimeout(() => {
          msg.edit(`${emotes.error}An Unexpected Error Occured: **${err}** \nRun \`${config.prefix}links\` to join the support server for support`);
      }, 3000)
})
}
}}