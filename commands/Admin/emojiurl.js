const emotes = require('../../configs/emotes.json');
const config= require("../../config.json")
const prefix = config.prefix  
  
   module.exports = {
    name: 'emojiurl',
    guildOnly: true,
    permissions: [ 'MANAGE_EMOJIS' ],
    clientPermissions: [ 'MANAGE_EMOJIS' ],
    group: 'moderation',
    description: 'Add an emoji to the server using the supplied image URL',
    usage: "<emoji link>",
    parameters: [ 'Image URL', 'Emoji Name' ],
    get examples(){ return `${this.name} https://some-url/path-to-image.format name_of_emoji`},
    run: (client, message, [url, name] ) => {

        if (!message.member.hasPermission(`MANAGE_EMOJIS`)) {
            return message.channel.send(`${emotes.error} You don't have the permissions to use this command [Manage Emojis]!`)
        }
        
        if (!message.guild.me.hasPermission("MANAGE_EMOJIS"))
        return message.channel.send(
          "I need \`MANAGE_EMOJIS\` permission to run this command!\nGive me \`ADMINISTRATOR\` permission to stop these errors from poopin"
        )
        try{
      if (!url || !/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/.test(url)){
        return message.channel.send(`${emotes.error} | ${message.author}, please provide a valid image link! \nUsage: \`${prefix}emojiurl <emoji url> <optional emoji name>\``);
      };
      
      return message.guild.emojis.create(url, name || 'emoji')
      .then(emoji => message.channel.send(`Successfully created emoji **${emoji.name}** | ${emoji}`))
      .catch(err => message.channel.send(`${emotes.error} ${message.author}, ${err.message.replace(`Invalid Form Body\nimage:`,'')}.`))
    } catch (err) {
      return message.channel.send(`${emotes.error}Oh No Oh NO oH NO NO NO NO NO.....`).then((msg) => {
          setTimeout(() => {
              msg.edit(`${emotes.error}An Unexpected Error Occured: **${err}** \nRun \`${config.prefix}links\` to join the support server for support`);
          }, 3000)
  })
  }
    }
  };