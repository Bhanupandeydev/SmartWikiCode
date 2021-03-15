const db = require("quick.db")
const { MessageEmbed } = require("discord.js");
const { measureMemory } = require("vm");
const config= require("../../config.json")
const emotes = require('../../configs/emotes.json');
module.exports = {
        name: "hackban",
        aliases: ['forceban'],
        usage: "[hackban || forceban] <user ID>",

    run: async(client, message, args) => {
        if (!message.member.hasPermission(`BAN_MEMBERS`)) {
            return message.channel.send(`${emotes.error} You don't have the permissions to use this command [BAN_MEMBERS]!`)
        }
        
        if (!message.guild.me.hasPermission("BAN_MEMBERS"))
        return message.channel.send(
          "I need \`BAN_MEMBERS\` permission to run this command!\nGive me \`ADMINISTRATOR\` permission to stop these errors from poopin"
        ) 
        const target = args[0];
        if (isNaN(target)) return message.reply(`Please specify an ID`);

        const reason   = args.splice(1, args.length).join(' ');

            try {
                message.guild.members.ban(target, {reason: reason.length < 1 ? 'No reason supplied.': reason});
                const embed2 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription("**They were successfully banned. User was not notified!**");
                await message.channel.send(embed2);                
                const channel  = db.fetch(`modlog_${message.guild.id}`);
                if (!channel) return;
            const embed = new MessageEmbed()
                .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
                .setColor("#ff0000")
                .setFooter(message.guild.name, message.guild.iconURL())
                .addField("**Moderation**", "ban")
                .addField("**ID**", `${target}`)
                .addField("**Banned By**", message.author.username)
                .addField("**Reason**", `${reason || "**No Reason**"}`)
                .addField("**Date**", message.createdAt.toLocaleString())
                .setTimestamp();
  
            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send(embed)
            
        } catch (err) {
            return message.channel.send(`${emotes.error}Oh No Oh NO oH NO NO NO NO NO.....`).then((msg) => {
                setTimeout(() => {
                    msg.edit(`${emotes.error}An Unexpected Error Occured: **${err}** \nRun \`${config.prefix}links\` to join the support server for support`);
                }, 3000)
        })
    }    }
}