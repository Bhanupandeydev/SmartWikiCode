const config= require("../../config.json")
const prefix = config.prefix  
const dev = config.dev      
const emotes = require('../../configs/emotes.json');

module.exports = {
      name: "dm",
      description: "DM a user in the guild",
      aliases: ['pm'],
    run: async (bot, message, args) => {
        
        if(!message.channel.permissionsFor(message.member).has("MANAGE_MESSAGES") && !dev.includes(message.author.id)) return message.channel.send(`${emotes.error} || **You Do Not Have The Required Permissions! - [MANAGE_MESSAGES]**`)


      let user =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);
      if (!user)
        return message.channel.send(
          `You did not mention a user, or you gave an invalid id`
        );
      if (!args.slice(1).join(" "))
        return message.channel.send("You did not specify your message");
      user.user
        .send(args.slice(1).join(" "))
        .then(() => message.channel.send(`Sent a message to ${user.user.tag}`))
        .catch(() => message.channel.send("That user could not be DMed!"))
    },
  };