const Discord = require("discord.js")
const db = require("quick.db")
const config = require("../../config.json")
const emotes = require("../../configs/emotes.json")
module.exports = {
  name: "set-warn-msg",
  run: async (client, message, args) => {
    try{
    if (!message.channel.permissionsFor(message.author).has("MANAGE_GUILD")) return message.channel.send(":x: | **You dont have permissions to use this Command!**");
    let msg = args.join(" ")
    if (!msg) {
      return message.channel.send("Provide a message.")
    }
    db.set(`message_${message.guild.id}`, msg)
    let embed = new Discord.MessageEmbed()
    embed.setTitle("Message Set!")
    embed.setFooter(message.author.tag + " | made by ChillRage#9999", message.author.displayAvatarURL({ dynamic: true }))
    embed.setTimestamp()
    embed.setAuthor(message.guild.name, message.guild.iconURL())
    embed.addField("message", msg)
    embed.addField("preview", msg.split("{user-mention}").join("<@"+message.author.id+">").split("{server-name}").join(message.guild.name).split("{user-tag}").join(message.author.tag).split("{user-username}").join(message.author.username))
    embed.setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
    embed.setColor("GREEN")
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