const db = require("quick.db")
const config= require("../../config.json")
const emotes = require('../../configs/emotes.json');
module.exports = {
        name: "setmodlogchannel",
        category: "moderation",
        aliases: ['setm', 'sm', 'smc', 'setmodlog'],
        description: "Sets A Channel Where The Bot Can Send Moderation Logs!",
        usage: "[channel mention | channel ID | channel name]",
    run: async (bot, message, args) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${emotes.error} || **You Do Not Have The Required Permissions! - [ADMINISTRATOR]**`)
    if (!args[0]) {
      let b = await db.fetch(`modlog_${message.guild.id}`);
      let channelName = message.guild.channels.cache.get(b);
      if (message.guild.channels.cache.has(b)) {
        return message.channel.send(
          `**Modlog Channel Set In This Server Is \`${channelName.name}\`!**`
        );
      } else
        return message.channel.send(
          "**Please Enter A Channel Name or ID To Set!**"
        );
    }
        let channel = message.mentions.channels.first() || bot.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name.toLowerCase() === args.join(' ').toLocaleLowerCase());

        if (!channel || channel.type !== 'text') return message.channel.send(`${emotes.error} || **Please Enter A Valid Text Channel!**`);

        try {
            let a = await db.fetch(`modlog_${message.guild.id}`)

            if (channel.id === a) {
                return message.channel.send(`${emotes.error} || **This Channel is Already Set As Modlog Channel!**`)
            } else {
                bot.guilds.cache.get(message.guild.id).channels.cache.get(channel.id).send(`${emotes.success} || **Modlog Channel Set!**`)
                db.set(`modlog_${message.guild.id}`, channel.id)

                message.channel.send(`${emotes.success} || **Modlog Channel Has Been Set Successfully in \`${channel.name}\`!**`)
            }
          } catch (err) {
            return message.channel.send(`${emotes.error}Oh No Oh NO oH NO NO NO NO NO.....`).then((msg) => {
                setTimeout(() => {
                    msg.edit(`${emotes.error}An Unexpected Error Occured: **${err}** \nRun \`${config.prefix}links\` to join the support server for support`);
                }, 3000)
        })
    }
    }
};