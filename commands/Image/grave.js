const Color = "GREY";
const Discord = require("discord.js");
const config= require("../../config.json")
const emotes = require('../../configs/emotes.json');
module.exports = {
  name: "grave",
  group: "fun",
  aliases: ["rip" ,"gv"],
  category: "Image",
  description: "Return A Grave Image!",
  usage: "Grave | <Mention Or ID>",
  run: async (client, message, args) => {
      try{
    const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    const Embed = new Discord.MessageEmbed()
    .setColor(Color)
    .setImage(encodeURI(`https://vacefron.nl/api/grave?user=${Member.user.displayAvatarURL({ format: "png" })}`))
    .setFooter(`Grave | \©️${new Date().getFullYear()} `)
    .setTimestamp();

    return message.channel.send(Embed);
  } catch (err) {
    return message.channel.send(`${emotes.error}Oh No Oh NO oH NO NO NO NO NO.....`).then((msg) => {
        setTimeout(() => {
            msg.edit(`${emotes.error}An Unexpected Error Occured: **${err}** \nRun \`${config.prefix}links\` to join the support server for support`);
        }, 3000)
})
}
  }
};
