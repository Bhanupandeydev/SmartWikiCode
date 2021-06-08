const Discord = require("discord.js");
const client = require("../index")
const guildMemberBoost = require("../index");
const emotes = require("../configs/emotes.json")
const db = require("quick.db")
client.on('guildMemberBoost', (member) => {
  let b = db.fetch(`boostlogs_${member.guild.id}`) 
  if (!b) return;

     const embed = new Discord.MessageEmbed()
     .setTitle(`<a:boost:804198262332456971>New Boost!`)
 .setAuthor(`${member.guild.name}`, member.guild.iconURL({dynamic:true}))
 .setFooter(`By ${client.user.username}`, client.user.avatarURL())
 .setThumbnail(member.user.avatarURL({dynamic:true}))
 .setTimestamp()
 .setColor('ee53de')
     .setDescription(`<@!${member.user.id}>, thank you for boosting ${member.guild.name}`)
     var sChannel = member.guild.channels.cache.get(b) 
     if (!sChannel) return;
     sChannel.send(embed).catch(() => {} )
     

})
