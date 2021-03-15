const Discord = require('discord.js');
const emotes = require('../../configs/emotes.json');
const config= require("../../config.json")
module.exports = {
        name: `lock`,
        description: `lock channel`,
        aliases: [],
    run: async (client, message, args) => {
        try{
        let lockPermErr = new Discord.MessageEmbed()
        .setTitle(`**User Permission Error!**`)
        .setDescription(`${emotes.error} ||**Sorry, you don't have permissions to use this!**`)
        

        if(!message.channel.permissionsFor(message.member).has(`ADMINISTRATOR`) ) return message.channel.send(lockPermErr);
    
        let channel = message.channel;

            message.guild.roles.cache.forEach(role => {
                channel.createOverwrite(role, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            })


        message.channel.send(`${emotes.success}Done | Channel Locked!`)

    } catch (err) {
        return message.channel.send(`${emotes.error}Oh No Oh NO oH NO NO NO NO NO.....`).then((msg) => {
            setTimeout(() => {
                msg.edit(`${emotes.error}An Unexpected Error Occured: **${err}** \nRun \`${config.prefix}links\` to join the support server for support`);
            }, 3000)
    })
    }
    }
}