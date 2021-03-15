const { MessageEmbed } = require('discord.js');
const config= require("../../config.json")
const emotes = require('../../configs/emotes.json');
module.exports = {
  name: 'emoji',
  aliases: ['enlarge'],
  group: 'utility',
  desciption: 'Display the larger version of the supplied emoji',
  parameters: [ 'emoji' ],
  get examples(){ return [ this.name + ' <emoji>'];},
  run: (cient, message, [emoji = '']) => {
   try{
    if (!emoji.match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/)){
      return message.channel.send(`${emotes.error} | ${message.author}, please enter a valid custom emoji!`);
    };

    return message.channel.send(
      new MessageEmbed()
      .setColor('GREY')
      .setImage('https://cdn.discordapp.com/emojis/' + emoji.match(/\d{17,19}/)[0])
      .setFooter(`Emoji: ${emoji.match(/\w{2,32}/)[0]} | \©️${new Date().getFullYear()} SmartWiki`)
    );
  } catch (err) {
    return message.channel.send(`${emotes.error}Oh No Oh NO oH NO NO NO NO NO.....`).then((msg) => {
        setTimeout(() => {
            msg.edit(`${emotes.error}An Unexpected Error Occured: **${err}** \nRun \`${config.prefix}links\` to join the support server for support`);
        }, 3000)
})
}
  }
};