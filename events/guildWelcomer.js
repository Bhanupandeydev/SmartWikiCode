const { Client, Collection } = require("discord.js");
const prefix = require("../config.json")
const client = require("../index")
const moment = require("moment")
const db = require("quick.db")
client.on("guildMemberAdd", async member => {
    if (member.user.bot) return;
    let user = member.user
    let channelID = db.get(`joinChannel_${member.guild.id}`)
   if (channelID === null) return;
   let channel = member.guild.channels.cache.get(channelID)
   if (!channel) return;
    let joinMsg = db.get(`joinmsg_${member.guild.id}`)
    if (!joinMsg) return;
    let send = joinMsg
   .split("{member-mention}").join("<@" + user.id + ">")
   .split("{member-tag}").join(user.tag)
   .split("{member-username}").join(user.username)
   .split("{member-id}").join(user.id)
   .split("{member-created:duration}").join(moment(user.createdTimestamp).fromNow())
   .split("{member-created:date}").join(moment(user.createdTimestamp).format("YYYY/MM/DD"))
   .split("{server-name}").join(member.guild.name)
   .split("{server-memberCount}").join(member.guild.members.cache.size)
   channel.send(send).catch((e) => {} )
  })
  client.on("guildMemberRemove", async member => {
   if (member.user.bot) return;
   let user = member.user
   let channelID = db.get(`leaveChannel_${member.guild.id}`)
   if (channelID === null) return;
   let channel = member.guild.channels.cache.get(channelID)
   if (!channel) return;
   let leaveMsg = db.get(`leavemsg_${member.guild.id}`)
   if (leaveMsg === null) return;
   let send = leaveMsg
   .split("{member-tag}").join(user.tag)
   .split("{member-username}").join(user.username)
   .split("{member-id}").join(user.id)
   .split("{member-created:duration}").join(moment(user.createdTimestamp).fromNow())
   .split("{member-created:date}").join(moment(user.createdTimestamp).format("YYYY/MM/DD"))
   .split("{server-name}").join(member.guild.name)
   .split("{server-memberCount}").join(member.guild.members.cache.size)
   channel.send(send).catch((e) => {} )
  })