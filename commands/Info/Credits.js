const Discord = require("discord.js") 
module.exports = {
name: "credits",
description: "A command to show credits of some commands source author",
	run: async (client, message, args) => {

const credits = new Discord.MessageEmbed() 
.setTitle(`Credits For Some Cmd Sources`) 
.setDescription(`[DarkStudio](https://discord.gg/devs)`)
.addField(`DevsHub`, `[Click to join](https://discord.gg/pFR8ZAs42G)`)
.setColor("GREEN")
message.inlineReply(credits) 
}}
