const config= require("../../config.json")

const emotes = require('../../configs/emotes.json');

module.exports = {
    name: 'simp',
    aliases:[ 'simpcard' ],
    guildOnly: true,
    group:'fun',
    description: 'simp',
    clientPermissions: [ 'ATTACH_FILES' ],
    get examples(){ return [ this.name, ...this.aliases ]; },
    run: (client ,message, args) => {
        let pfp = message.mentions.users.first()?.displayAvatarURL({ format: 'png', size: 1024 }) || message.author?.displayAvatarURL({ format: 'png', size: 1024 }) 
     try{
     message.channel.send({
      files: [{
        name: 'Simpcard.png',
        attachment: [
          `https://api.no-api-key.com/api/v2/simpcard?image=${pfp}`].join('')
      }]
    })
  } catch (err) {
    return message.channel.send(`${emotes.error}Oh No Oh NO oH NO NO NO NO NO.....`).then((msg) => {
        setTimeout(() => {
            msg.edit(`${emotes.error}An Unexpected Error Occured: **${err}** \nRun \`${config.prefix}links\` to join the support server for support`);
        }, 3000)
})
}
    
  }}