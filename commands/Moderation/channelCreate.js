const { MessageEmbed } = require('discord.js')
const config= require("../../config.json")
const prefix = config.prefix  
const emotes = require('../../configs/emotes.json')

module.exports = {
    name: 'createchannel',
    category: 'utils',
    description: 'Creates a channel in this server!',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message, args) => {
        if (!message.member.hasPermission(`MANAGE_CHANNELS`)) {
            return message.channel.send(`${emotes.error} You don't have the permissions to use this command [MANAGE_MESSAGES]!`)
        }
        
        if (!message.guild.me.hasPermission("MANAGE_CHANNELS"))
        return message.channel.send(
          "I need \`MANAGE_CHANNELS\` permission to run this command!\nGive me \`ADMINISTRATOR\` permission to stop these errors from poopin"
        ) 
        
        try{
        const channelNameQuery = args.join(" ")
        if(!channelNameQuery) return message.reply(`${emotes.error} | Please specify a channel name!`)

        message.guild.channels.create(channelNameQuery)
        .then(ch => {
          message.channel.send(`${emotes.success} | Click ${ch} to access the newly created channel!`)
        })
      } catch (err) {
        return message.channel.send(`${emotes.error}Oh No Oh NO oH NO NO NO NO NO.....`).then((msg) => {
            setTimeout(() => {
                msg.edit(`${emotes.error}An Unexpected Error Occured: **${err}** \nRun \`${config.prefix}links\` to join the support server for support`);
            }, 3000)
    })
}
      },}


      //.catch(err => channel.send(`${emotes.error}Ooops An Unexpected Error Occured:` + err `\nRun \`${config.prefix}links\` to join the support server for help`));