const config= require("../../config.json")
const emotes = require('../../configs/emotes.json');
const ms = require(`ms`)
const Discord = require(`discord.js`)
module.exports = {
    name: 'stats',
    category: 'BotInfo',
    description: 'Returns info about SmartWiki',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message, args) => {
        try{
          let bicon = client.user.displayAvatarURL; //bot avatar
          let botembed = new Discord.MessageEmbed()
              .setTitle(`Bot Information`)
              .setColor(`2f3136`)
              .setDescription(`**${emotes.botname} Bot Name** ${client.user.username}
              **${emotes.Crown} BotOwner**: ${config.owner})
              **${emotes.info} Created On**: Mon, Oct 5, 2020 2:39 PM Los Angeles, CA, USA (GMT-8)
              **${emotes.server} Total Guilds**: ${client.guilds.cache.size}
              **${emotes.Channel} Total Channels**: ${client.channels.cache.size}
              **${emotes.users} Total Users**: ${client.users.cache.size}
              **${emotes.uptime} Uptime**: ${ms(client.uptime, { long: true })}
              **${emotes.library} Library**: Discord.js
              **${emotes.vs} Version**: v${Discord.version}`)
              .setFooter(`© ${client.user.username} 2021`)
              .setThumbnail(`https://cdn.discordapp.com/attachments/776925179947384884/808369542648561705/standard.gif`)

          message.channel.send(botembed)
        } catch (err) {
            return message.channel.send(`${emotes.error}Oh No Oh NO oH NO NO NO NO NO.....`).then((msg) => {
                setTimeout(() => {
                    msg.edit(`${emotes.error}An Unexpected Error Occured: **${err}** \nRun \`${config.prefix}links\` to join the support server for support`);
                }, 3000)
        })
    }
    }}