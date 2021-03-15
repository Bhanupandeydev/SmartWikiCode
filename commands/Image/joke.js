const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const config= require("../../config.json")
const emotes = require('../../configs/emotes.json');
module.exports = {
  name: 'joke',
  aliases: [ 'haha' ],
  group: 'fun',
  description: 'Generate a random joke from a joke API',
  clientPermissions: [ 'EMBED_LINKS' ],
  get examples(){ return [ this.name, ...this.aliases ]},
  run: async (client, message) => {
    try{
    const data = await fetch('https://sv443.net/jokeapi/v2/joke/Programming,Miscellaneous?blacklistFlags=nsfw,religious,political,racist,sexist')
    .then(res => res.json())
    .catch(() => null);

    if (!data){
      return message.channel.send(`Server Error 5xx: Joke API is currently down!`);
    };

    return message.channel.send(
      new MessageEmbed()
      .setColor('GREY')
      .setAuthor(`${data.category} Joke`)
      .setThumbnail('https://i.imgur.com/KOZUjcc.gif')
      .setFooter(`Joke | \©️${new Date().getFullYear()} SmartWiki`)
      .setDescription(data.type === 'twopart' ? `${data.setup}\n\n||${data.delivery}||` : data.joke)
    )
  } catch (err) {
    return message.channel.send(`${emotes.error}Oh No Oh NO oH NO NO NO NO NO.....`).then((msg) => {
        setTimeout(() => {
            msg.edit(`${emotes.error}An Unexpected Error Occured: **${err}** \nRun \`${config.prefix}links\` to join the support server for support`);
        }, 3000)
})
}
  }
};