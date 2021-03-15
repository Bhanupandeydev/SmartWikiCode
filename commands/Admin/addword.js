const Discord = require("discord.js")
const db = require("quick.db")
const config = require("../../config.json")
const emotes = require("../../configs/emotes.json")
module.exports = {
  name: "addword",
  run: async (client, message, args) => {
    try{
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`${emotes.error} | **You dont have permissions to use this Command!**`);
    let pog = db.get(`words_${message.guild.id}`)
    let word = args[0]
    if (!word) {
      let embed = new Discord.MessageEmbed()
      .setTitle("Error")
      .setDescription(`${emotes.error} | **No word provided**\nFormat: \`${config.prefix}addword fk\``)
      .setFooter(message.author.tag + " | made by ChillRage#9999", message.author.displayAvatarURL())
      .setThumbnail(message.guild.iconURL())
      .setColor("#FF0000")
      return message.channel.send({
        embed: embed
      })
    }
    if (pog && pog.find((find) => find.word == word)) {
            let embed = new Discord.MessageEmbed()
            embed.setAuthor(message.guild.name, message.guild.iconURL())
            embed.setTitle("Error")
            embed.setDescription(`${emotes.error} | **The word is already on the database**`)
            embed.setFooter(message.author.tag + " | made by ChillRage#9999", message.author.displayAvatarURL({ dynamic: true }));
            embed.setTimestamp()
            embed.setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            return message.channel.send({
              embed: embed
            });
        }
        let yes = {
      word: word,
      author: message.author.tag
        }
        db.push(`words_${message.guild.id}`, yes)
        let embed = new Discord.MessageEmbed()
        embed.setAuthor(message.guild.name, message.guild.iconURL())
        embed.setTitle("Success")
        embed.setThumbnail(message.guild.iconURL())
        embed.setDescription(`**The word has been added!**`)
        embed.setFooter(message.author.tag + " | made by ChillRage#9999", message.author.displayAvatarURL({ dynamic: true }))
        embed.setColor("RANDOM")
        embed.setTimestamp()
        message.channel.send({
          embed: embed
        })

      } catch (err) {
        return message.channel.send(`${emotes.error}Oh No Oh NO oH NO NO NO NO NO.....`).then((msg) => {
            setTimeout(() => {
                msg.edit(`${emotes.error}An Unexpected Error Occured: **${err}** \nRun \`${config.prefix}links\` to join the support server for support`);
            }, 3000)
    })
    }
  }
}