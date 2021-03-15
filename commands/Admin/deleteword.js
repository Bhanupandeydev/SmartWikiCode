const Discord = require("discord.js")
const config = require("../../config.json")
const emotes = require("../../configs/emotes.json")
const db = require("quick.db")
module.exports = {
  name: "delword",
  run: async (client, message, args) => {
    try{
    if(!message.member.hasPermission('ADMINISTRATOR'))return message.channel.send(":x: | **You dont have permissions to use this Command!**");
    let pog = db.get(`words_${message.guild.id}`)
    let word = args[0]
    if (!word) {
      let embed = new Discord.MessageEmbed()
      .setTitle("Error")
      .setDescription(`${emotes.error} | **No word provided**\nFormat: \`${config.prefix}delword fk\``)
      .setFooter(message.author.tag + " | made by ChillRage#9999", message.author.displayAvatarURL())
      .setThumbnail(message.guild.iconURL())
      .setColor("#FF0000")
      return message.channel.send({
        embed: embed
      })
    }
    if (pog) {
            let data = pog.find((x) => x.word.toLowerCase() === word.toLowerCase());
            let No = new Discord.MessageEmbed()
                No.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                No.setDescription(`${emotes.error} | **Word Not Found**`)
                No.setColor("#FF0000")
                No.setFooter(message.guild.name + " | made by ChillRage#9999", message.guild.iconURL());
                No.setThumbnail(message.guild.iconURL())

            if (!data) return message.channel.send({ embed: No });

            let yes = pog.indexOf(data);
            delete pog[yes];

            var filter = pog.filter((x) => {
                return x != null && x != '';
            });
            db.set(`words_${message.guild.id}`, filter);
            let embed = new Discord.MessageEmbed()
                embed.setAuthor(message.author.tag, message.author.displayAvatarURL())
                embed.setDescription(`**The word has been deleted!** `)
                embed.setFooter(message.guild.name + " | made by ChillRage#9999", message.guild.iconURL());
embed.setColor("GREEN")
embed.setTimestamp()
            return message.channel.send({ embed: embed });
        } else {
            let embed = new Discord.MessageEmbed()
                embed.setAuthor(message.author.tag, message.author.displayAvatarURL())
                embed.setDescription(`${emotes.error} | **The word was not found!**`)
                embed.setFooter(message.guild.name + " | made by ChillRage#9999", message.guild.iconURL());
                embed.setColor("#FF0000")
                embed.setTimestamp()

            return message.channel.send({ embed: embed })
        }
      } catch (err) {
        return message.channel.send(`${emotes.error}Oh No Oh NO oH NO NO NO NO NO.....`).then((msg) => {
            setTimeout(() => {
                msg.edit(`${emotes.error}An Unexpected Error Occured: **${err}** \nRun \`${config.prefix}links\` to join the support server for support`);
            }, 3000)
    })
    }
  }
}