
const { MessageEmbed } = require('discord.js');
const config= require("../../config.json")
const emotes = require('../../configs/emotes.json');
module.exports = {
  name: 'respect',
  aliases: [ 'f', 'rp', '+rp' ],
  group: 'fun',
  description: 'Show thy respect.',
  clientPermissions: [ 'EMBED_LINKS' ],
  get examples(){ return [ this.name, ...this.aliases ];},
  run: async (client, message, args) => {
   try{
    const rep = await message.channel.send(
      new MessageEmbed()
      .setColor('GREY')
      .setFooter(`Press F to pay respect | \©️${new Date().getFullYear()} SmartWiki`)
      .setDescription(`${message.member} has paid their respect${args.length ? ` to ${args.join(' ')}.` : ''}`)
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