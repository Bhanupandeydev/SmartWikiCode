const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const config= require("../../config.json")
const emotes = require('../../configs/emotes.json');
module.exports = {
  name: 'birdfacts',
  aliases: [ 'birdfact', 'tori', 'bird' ],
  group: 'fun',
  description: 'Generate a random useless bird facts',
  clientPermissions: [ 'EMBED_LINKS' ],
  get examples(){ return [this.name, ...this.aliases]},
  run: async (client, message) => {
     try{
    const data = await fetch('https://some-random-api.ml/facts/bird')
    .then(res => res.json())
    .catch(() => null);

    if (!data){
      return message.channel.send(`Server Error 5xx: Birdfact API is currently down!`);
    };

    return message.channel.send(
      new MessageEmbed()
      .setThumbnail('https://i.imgur.com/arkxS3f.gif')
      .setColor('GREY')
      .setDescription(data.fact)
      .setFooter(`\©️${new Date().getFullYear()} SmartWiki`)
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