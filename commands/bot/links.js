const { Client, Message, MessageEmbed } = require("discord.js");
const config= require("../../config.json")
const emotes = require('../../configs/emotes.json');
module.exports = {
  name: "links",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    const sayEmbed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dyanmic: true }))
        .addFields(
        {name: "Add SmartWiki", value: `[here](https://dsc.gg/invitesmart)`, inline: true},
        {name: "SmartWiki(s) top.gg Page", value: `[here](https://top.gg/bot/762745762777006080)`, inline: true},
        {name: "Vote", value: `[here]((https://top.gg/bot/762745762777006080/vote)`, inline: true},
        {name: "SmartWiki Support", value: `[here](https://discord.gg/h4VPcmkAw3)`, inline: true},
        {name: "SmartWiki Community", value: `[here](https://discord.gg/jp8et9xU56)`, inline: true},
        {name: "SmartWiki Server Template", value: `[here](https://discord.new/cvp5DwebMRfK)`, inline: true})        
        .setTimestamp()
        .setColor("RANDOM")

    message.channel.send(sayEmbed)
  },
};