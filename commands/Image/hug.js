const Discord = require("discord.js");
const superagent = require("superagent");

module.exports = {
    name: "hug",
    category: "action",
    description: "hug a user!",
    usage: "hug <user>",
    run: async (client, message, args) => {
    let hugUser = message.mentions.users.first() 
    if(!hugUser) return message.channel.send("You forgot to mention somebody.");
    let hugEmbed2 = new Discord.MessageEmbed()
    .setColor("#36393F")
    .setDescription(`**${message.author.username}** hugged **himself**`)
    .setImage("https://i.kym-cdn.com/photos/images/original/000/859/605/3e7.gif")
     .setFooter(`© SmartWiki`, "https://cdn.discordapp.com/attachments/776925179947384884/808369542648561705/standard.gif")
  if (hugUser.id === message.author.id) return message.channel.send(hugEmbed2);
    const {body} = await superagent
    .get(`https://nekos.life/api/v2/img/hug`);

    let hugEmbed = new Discord.MessageEmbed()
    .setDescription(`**${message.author.username}** hugged **${message.mentions.users.first().username}**`)
    .setImage(body.url)
    .setColor("#36393F")
     .setFooter(`© SmartWiki`, "https://cdn.discordapp.com/attachments/776925179947384884/808369542648561705/standard.gif")
    message.channel.send(hugEmbed)
}
}