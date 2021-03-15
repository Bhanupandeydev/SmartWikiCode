const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
  name: 'pandafacts',
  aliases: [ 'pandafact', 'pf' ],
  group: 'fun',
  description: 'Generate a random useless pandaa facts',
  clientPermissions: [ 'EMBED_LINKS' ],
  get examples(){ return [this.name, ...this.aliases]},
  run: async (client, message) => {

    try{

    const data = await fetch('https://some-random-api.ml/facts/panda')
    .then(res => res.json())
    .catch(() => null);

    if (!data){
      return message.channel.send(`Server Error 5xx: Pandafact API is currently down!`);
    };

    return message.channel.send(
      new MessageEmbed()
      .setThumbnail('https://i.imgur.com/QUF4VQX.gif')
      .setColor('GREY')
      .setDescription(data.fact)
      .setFooter(`Pandafact | \©️${new Date().getFullYear()} SmartWiki`)
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