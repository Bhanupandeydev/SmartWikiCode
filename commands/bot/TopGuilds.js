const { Client, Message, MessageEmbed } = require("discord.js");
const config= require("../../config.json")
const emotes = require('../../configs/emotes.json');
module.exports = {
  name: "topguilds",
  category: 'BotInfo',
  description: "List the bots servers with the most number of members",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try{
      if(!config.dev.includes(message.author.id)) return message.channel.send("no u")

      const guilds = client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount)
       .first(10);

       const description = guilds 
       .map((guild, index) => {
           return `${index + 1} ${guild.name} => ${guild.memberCount} members`;
       })
       .join("\n");
       
       message.channel.send(
           new MessageEmbed().setTitle("Top Guilds").setDescription(description)
      )
    } catch (err) {
      return message.channel.send(`${emotes.error}Oh No Oh NO oH NO NO NO NO NO.....`).then((msg) => {
          setTimeout(() => {
              msg.edit(`${emotes.error}An Unexpected Error Occured: **${err}** \nRun \`${config.prefix}links\` to join the support server for support`);
          }, 3000)
  })
}
  }
}