const { Message, client, MessageEmbed } = require("discord.js")
const config= require("../../config.json")
const emotes = require('../../configs/emotes.json');
module.exports = {
    name: "nuke",
    category: 'Admin',
    description: 'Deletes & Clones The Channel',
    /**
     * @param {*} client
     * @param {Message} message
     * @param {*} args
     */
    run: async (client, message, args) => {
      try{
        if (!message.member.hasPermission("ADMINISTRATOR"))
        return message.channel.send(
          `You don't have the correct permissions for that!`
        );
  
      if (!message.guild.me.hasPermission("MANAGE_CHANNELS"))
        return message.channel.send(
          "I need manage channels permissions to run this command!\nGive me \`ADMINISTRATOR\` permission to stop these errors from poopin"
        )
        
        let channel = client.channels.cache.get(message.channel.id);
        const position = channel.position;
        const topic = channel.topic;
    
        const channel2 = await channel.clone()

        channel2.setPosition(position);
        channel2.setTopic(topic);
        channel.delete();
        channel2.send("Channel has been nuked!")
      } catch (err) {
        return message.channel.send(`${emotes.error}Oh No Oh NO oH NO NO NO NO NO.....`).then((msg) => {
            setTimeout(() => {
                msg.edit(`${emotes.error}An Unexpected Error Occured: **${err}** \nRun \`${config.prefix}links\` to join the support server for support`);
            }, 3000)
    })
    }
      }
}