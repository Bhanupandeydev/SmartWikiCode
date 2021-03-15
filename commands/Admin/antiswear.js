const Discord = require('discord.js')
const config = require("../../config.json")
const emotes = require("../../configs/emotes.json")
const db = require("quick.db")
module.exports = {
  name: "antiswearlist",
  aliases: [ 'wordlist' ],
  run: async (client, message, args) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(":x: | **You dont have permissions to use this Command!**");
    try{
    let embed = new Discord.MessageEmbed()
    embed.setTitle(`${message.guild.name} | Anti Swear words list`)
    embed.setThumbnail(message.guild.iconURL())
    embed.setFooter(message.author.tag, message.author.displayAvatarURL());
    embed.setColor("GREEN")
        let words = db.get(`words_${message.guild.id}`);
        if (words && words.length) {
            let array = [];
            words.forEach((x) => {
                array.push(`${emotes.success}**Word:** ${x.word} | **added By:** ${x.author}`);
            });

            embed.setDescription(`${array.join('\n')}`);
            embed.setFooter(message.author.tag + " | made by ChillRage#9999", message.author.displayAvatarURL({ dynamic: true }))
        } else {
          return message.channel.send(`${emotes.error} | **There are No words.**`)
        }
        
        return message.channel.send({ embed: embed })

      } catch (err) {
        return message.channel.send(`${emotes.error}Oh No Oh NO oH NO NO NO NO NO.....`).then((msg) => {
            setTimeout(() => {
                msg.edit(`${emotes.error}An Unexpected Error Occured: **${err}** \nRun \`${config.prefix}links\` to join the support server for support`);
            }, 3000)
    })
    }
  }
}