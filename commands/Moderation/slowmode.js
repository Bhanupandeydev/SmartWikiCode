const config= require("../../config.json")
const emotes = require('../../configs/emotes.json');
module.exports = {
          name: "slowmode",
          aliases: [ 'sm' ],
          description: "Set the slowmode for the channel!",
          aliases: ['sm'],
  run: async (client, message, args) => {
    if (!message.member.hasPermission(`MANAGE_CHANNELS`)) {
        return message.channel.send(`${emotes.error} You don't have the permissions to use this command [MANAGE_CHANNELS]!`)
    }
    
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS"))
    return message.channel.send(
      "I need \`MANAGE_CHANNELS\` permission to run this command!"
    )

    if (!args[0])
      return message.channel.send(
        `You did not specify the time in seconds you wish to set this channel's slow mode too!`
      );
      
    if (isNaN(args[0])) return message.channel.send(`That is not a number!`);
    
    message.channel.setRateLimitPerUser(args[0]);
    message.channel.send(
      `Set the slowmode of this channel too **${args[0]}**`
    );
  },
};