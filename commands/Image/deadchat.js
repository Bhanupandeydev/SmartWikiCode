const { MessageEmbed } = require('discord.js');
const config= require("../../config.json")
const emotes = require('../../configs/emotes.json');
module.exports = {
  name: 'deadchat',
  aliases: [ 'ddc' ],
  group: 'fun',
  description: 'dead chat huh.',
  clientPermissions: [ 'EMBED_LINKS' ],
  get examples(){ return [ this.name, ...this.aliases ];},
  run: async (client, message, args) => {
     try{
    const rep = await message.channel.send(
      new MessageEmbed()
      .setTitle("Dead Chat")
      .setColor('GREY')
      .setImage("https://mma.prnewswire.com/media/951563/Automotive_Website_Chat_is_DEAD.jpg?p=publish")
    );

    await message.delete().catch(() => null);

    return rep.react("🇫")
  
  } catch (err) {
    return message.channel.send(`${emotes.error}Oh No Oh NO oH NO NO NO NO NO.....`).then((msg) => {
        setTimeout(() => {
            msg.edit(`${emotes.error}An Unexpected Error Occured: **${err}** \nRun \`${config.prefix}links\` to join the support server for support`);
        }, 3000)
})
}
}
};