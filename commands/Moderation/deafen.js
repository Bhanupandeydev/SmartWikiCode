const config= require("../../config.json")
const dev = config.dev      
const prefix = config.prefix  
const emotes = require('../../configs/emotes.json');

module.exports = {
        name: "deafen",
        description: "Deafen a member in a voice channel",
        usage: "deafen <user>",
        aliases: ["deaf"],
    run: async(client, message, args) => {
        try{
         if (!message.member.hasPermission("DEAFEN_MEMBERS") && !ownerID .includes(message.author.id)) return message.channel.send("**You Dont Have The Permissions To Deafen Users! - [DEAFEN_MEMBERS]**");
        
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.get(r => r.user.username.toLowerCase() === args[0].toLowerCase());

        if(!member) return message.channel.send("Unable to find the mentioned user in this guild.")

        let reason = args.slice(1).join(" ");
        if (!reason) reason = "No Reason Provided"



            member.voice.setDeaf(true, reason);
            message.channel.send(`${emotes.success}Success || Member Deafened`)
        } catch (err) {
            return message.channel.send(`${emotes.error}Oh No Oh NO oH NO NO NO NO NO.....`).then((msg) => {
                setTimeout(() => {
                    msg.edit(`${emotes.error}An Unexpected Error Occured: **${err}** \nRun \`${config.prefix}links\` to join the support server for support`);
                }, 3000)
        })
    }

    }
}