const config= require("../../config.json")
const emotes = require('../../configs/emotes.json');

module.exports = {
        name: "reload",
        OwnerOnly: true,
        description: "Reload command- Dev Only",
        aliases: [`rmod`],

    run: async (client, message, args) => {
      if(!config.dev.includes(message.author.id)) return;

      let cmdfolder = args[0];
      if(!cmdfolder) return message.channel.send(`${emotes.error} | Provide a command Folder!`)
      let command = args[1];
      if (!command) return message.channel.send(`${emotes.error} | Provide a command!`)
      try{
             require(`../../commands/${cmdfolder}/${command}`) 
            } catch (err) {
               return message.channel.send(`${emotes.error}Oh No Oh NO oH NO NO NO NO NO.....`).then((msg) => {
                   setTimeout(() => {
                       msg.edit(`${emotes.error}An Unexpected Error Occured: **${err}** \nRun \`${config.prefix}links\` to join the support server for support`);
                   }, 3000)
           })
       }
      delete require.cache[require.resolve(`../../commands/${cmdfolder}/${command}`)];
      let pull = require(`../../commands/${cmdfolder}/${command}`);
      client.commands.set(pull.name, pull);
      console.log(`Reloaded the command!`)
      return message.channel.send(`${emotes.success} Done `)
      },
} 