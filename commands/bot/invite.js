const Discord = require('discord.js');
const config= require("../../config.json")
const emotes = require('../../configs/emotes.json');
module.exports = {
    name: 'invite',
    description: 'Link to invite me',
    aliases: ["inv"],
    run: async (client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setDescription(
      "**👋 Hey!\n Do you want Invite me? [Click Here](https://dsc.gg/invitesmart) to Invite me!\nThanks for supporting me.** ❤️"
    )
    .addField(
      "Support Link: ",
      `**[Click Here!](https://dsc.gg/smartwiki)**`,
      true
    )
    .addField(
      "Vote Link:",
      `**[Click Here!](https://top.gg/bot/762745762777006080/vote)**`,
      true
    )
    .setTimestamp()
    .setFooter(`\©️${new Date().getFullYear()} SmartWiki`)
    .setColor("GREY");
    message.channel.send(embed)
    }
}