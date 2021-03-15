const config= require("../../config.json")
const emotes = require('../../configs/emotes.json');
module.exports = {
    name: 'invert',
    aliases: [],
    group: 'fun',
    description: 'Invert the colors on user avatar',
    clientPermissions: [ 'ATTACH_FILES' ],
    parameters: [ 'User ID', 'User Mention' ],
    get examples(){ return [ this.name, ...this.aliases]
      .map(x => x + ' ' + '<User>'); },
    run: async (client, message ) => {
     try{
      const match = message.content.match(/\d{17,19}/);
      let user;
  
      if (message.guild){
        const member = await message.guild.members
        .fetch((match || [message.author.id])[0])
        .catch(() => message.member);
  
        user = member.user;
      } else {
        user = message.author;
      };
  
      return message.channel.send({
        files: [{
          name: 'inverted.png',
          attachment: [
            'https://some-random-api.ml/canvas/invert?avatar=',
            user.displayAvatarURL({ format: 'png', size: 1024 })
          ].join('')
        }]
      });
    } catch (err) {
      return message.channel.send(`${emotes.error}Oh No Oh NO oH NO NO NO NO NO.....`).then((msg) => {
          setTimeout(() => {
              msg.edit(`${emotes.error}An Unexpected Error Occured: **${err}** \nRun \`${config.prefix}links\` to join the support server for support`);
          }, 3000)
  })
}
    }
  };
