const Discord = require("discord.js");
const client = require("../index")
const guildMemberBoost = require("../index");
const emotes = require("../configs/emotes.json")
client.on('guildMemberBoost', (member) => {
     try{
     const boostmessage = new Discord.MessageEmbed()
     .setTitle(`<a:boost:804198262332456971>New Boost!`)
     .setDescription(`**${member.user.tag}** just boosted ${member.guild.name}, Thanks for Boosting The Server ${member.user}!`)
     .setColor("#ff1493")
     .setTimestamp()
     member.guild.systemChannel.send(boostmessage).catch(() => {} )
} catch (e) {
    return 
  }
});