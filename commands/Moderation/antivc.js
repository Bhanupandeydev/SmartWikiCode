const { MessageEmbed } = require('discord.js')
const config= require("../../config.json")
const prefix = config.prefix  
const emotes = require('../../configs/emotes.json');
module.exports = {
    name: 'antivc',
    category: 'moderation',
    description: 'Adds a user to anti vc! (basically remove perms from a user to join all vc(s) in this server)',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async (client, message, args) => {
        try{
        if (!message.member.hasPermission(`MANAGE_RETURN`)) {
            return message.channel.send(`${emotes.error} You don't have the permissions to use this command [MANAGE_RETURN]!`)
        }
        
        if (!message.guild.me.hasPermission("MANAGE_RETURN"))
        return message.channel.send(
          "I need \`MANAGE_RETURN\` permission to run this command!\nGive me \`ADMINISTRATOR\` permission to stop these errors from poopin"
        ) 
        

        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!target) return message.reply(`${emotes.error} | Please specify a member to add to the anti vc!`);

        let role = message.guild.roles.cache.find((role) => role.name.toLowerCase() === 'antivc');
        if(!role) {
            try{
               message.channel.send(`${emotes.load}Attemping to create antivc role!`);
               role = await message.guild.roles.create({
                   data: {
                       name: 'antivc',
                       permissions: []
                   }
               })

               message.guild.channels.cache.filter((c) => c.type === 'voice').forEach(async channel => {
                 await channel.createOverwrite(role, {
                     VIEW_CHANNEL: true,
                     CONNECT: false
                 })      
                      
               })

               message.channel.send(`${emotes.success}Role has been created!`)
            } catch (error) {
                message.channel.send(error)
            }
        }
          
        await target.roles.add(role.id);
        message.channel.send(`${emotes.success}${target} has been added to \`antivc\` run \`${prefix}unantivc @${target.user.tag}\` to disable this`)
    } catch (err) {
        return message.channel.send(`${emotes.error}Oh No Oh NO oH NO NO NO NO NO.....`).then((msg) => {
            setTimeout(() => {
                msg.edit(`${emotes.error}An Unexpected Error Occured: **${err}** \nRun \`${config.prefix}links\` to join the support server for support`);
            }, 3000)
    })
}
    },
}