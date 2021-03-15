
const emotes = require('../../configs/emotes.json')
const config= require("../../config.json")
const prefix = config.prefix  
  
   module.exports = {
    name: 'unban',
    guildOnly: true,
    permissions: [ 'BAN_MEMBERS' ],
    clientPermissions: [ 'BAN_MEMBERS' ],
    group: 'moderation',
    description: 'Unbans a user from this server',
    parameters: [ 'user Mention/ID', 'Unban Reason' ],
    get examples (){ return [ `${this.name} 0123456789012345678 <reason>` ];},
    run: async (client, message, [ user = '', ...args ]) => {
        try{
        if (!message.member.hasPermission(`BAN_MEMBERS`)) {
            return message.channel.send(`${emotes.error} You don't have the permissions to use this command [BAN_MEMBERS]!`)
        }
        
        if (!message.guild.me.hasPermission("BAN_MEMBERS"))
        return message.channel.send(
          "I need \`BAN_MEMBERS\` permission to run this command!\nGive me \`ADMINISTRATOR\` permission to stop these errors from poopin"
        ) 
      if (!user.match(/\d{17,19}/)){
        return message.channel.send(`${emotes.error} | ${message.author}, Please provide the ID of the user to unban`);
      };
  
      user = user.match(/\d{17,19}/)[0];
  
      return message.guild.members.unban(user, { reason: `SmartWiki Unbans: ${message.author.tag}: ${args.join(' ') || 'None'}`})
      .then(user => message.channel.send(`${emotes.success}Successfully unbanned **${user.tag}**!`))
      .catch(() => message.channel.send(`${emotes.error}Unable to unban user with ID ${user}. The provided argument maybe not a valid user id, or the user is not banned.`))
    } catch (err) {
      return message.channel.send(`${emotes.error}Oh No Oh NO oH NO NO NO NO NO.....`).then((msg) => {
          setTimeout(() => {
              msg.edit(`${emotes.error}An Unexpected Error Occured: **${err}** \nRun \`${config.prefix}links\` to join the support server for support`);
          }, 3000)
  })
}
    }
  };