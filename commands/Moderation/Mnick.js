const limit = require("@codedipper/random-code")
const config= require("../../config.json")
const prefix = config.prefix  
const emotes = require('../../configs/emotes.json');
const Discord = require("discord.js")
        module.exports = {
            name: 'mnick',
            category: "moderation",
            description: "a command to moderate users nickname",
            /**
           * @param {Client} client
           * @param {Message} message
           * @param {String[]} args
           */
          run: async (client, message, [member = '', ...reason] ) => {
        try{
        if (!message.member.hasPermission('MANAGE_NICKNAMES')) return ;
       if (!message.guild.me.hasPermission('MANAGE_NICKNAMES')) return;
              let memberexe = message.mentions.members.first()
              if (!memberexe) return message.channel.send("Please mention a user!")
let random = limit(7);
      memberexe.setNickname(`Moderated Nickname ${random}`)


     const embed = new Discord.MessageEmbed()
        
        .setDescription(`${memberexe.user.tag}'s Nickname has Been Moderated`)
        .setColor("GREEN")
        message.channel.send(embed)

      } catch (err) {
        return message.channel.send(`${emotes.error}Oh No Oh NO oH NO NO NO NO NO.....`).then((msg) => {
            setTimeout(() => {
                msg.edit(`${emotes.error}An Unexpected Error Occured: **${err}** \nRun \`${config.prefix}links\` to join the support server for support`);
            }, 3000)
    })
}
    }
}