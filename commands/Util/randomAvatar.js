const { Message, client, MessageEmbed } = require("discord.js")
const config= require("../../config.json")
const emotes = require('../../configs/emotes.json');
module.exports = {
    name: "random-avatar",
    /**
     * @param {Client} client
     * @param {Message} message

     */
    run: async (client, message, args) => {
        try{
      const user = client.users.cache.random();
      
      message.channel.send(
          new MessageEmbed()
              .setColor("RANDOM")
              .setFooter(`${user.tag}'s Avatar!`)
              .setImage(user.displayAvatarURL({ dynamic: true }))
      )
    } catch (err) {
        return message.channel.send(`${emotes.error}Oh No Oh NO oH NO NO NO NO NO.....`).then((msg) => {
            setTimeout(() => {
                msg.edit(`${emotes.error}An Unexpected Error Occured: **${err}** \nRun \`${config.prefix}links\` to join the support server for support`);
            }, 3000)
    })
}
     }
}