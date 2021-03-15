const { Client, Message, MessageEmbed } = require("discord.js")
const config= require("../../config.json")
const emotes = require('../../configs/emotes.json');
module.exports = {
  name: "report",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
       const owner = client.users.cache.get('718164201033564200');
       let timeInfo; {
       time = 0
       timeInfo = 'is permanent!'
       }
       
       const query = args.join(" ");
       if(!query) return message.reply('Please specify a query');
       
       message.channel.createInvite({
        unique: true,
        maxAge: time
    }).then(invite => {
      
       const reportEmbed = new MessageEmbed()
       .setTitle("New Report")
       .addField('Author', message.author.toString(), true)
       .addField('Guild', message.guild.name, true)
       .addField('Report', query)
       .setDescription('Invite link: https://discord.gg/' + invite.code)
       .setFooter(`This link ${timeInfo}`)
       .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
       .setTimestamp();
       owner.send(reportEmbed)

       message.channel.send(`${emotes.success}Bug Reported!`)
    })
  }
}