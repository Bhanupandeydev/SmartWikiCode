const { MessageEmbed } = require('discord.js')
const emotes = require("../../configs/emotes.json")
const prefix = require("../../index")

module.exports = {
    name: 'unantivc',
    category: 'moderation',
    description: 'Removes a user from anti vc',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async (client, message, args) => {
        if (!message.member.hasPermission(`MANAGE_ROLES`)) {
            return message.channel.send(`${emotes.error} You don't have the permissions to use this command [MANAGE_ROLES]!`)
        }
        
        if (!message.guild.me.hasPermission("MANAGE_ROLES"))
        return message.channel.send(
          "I need \`MANAGE_ROLES\` permission to run this command!\nGive me \`ADMINISTRATOR\` permission to stop these errors from poopin"
        ) 
        

        const target = message.mentions.members.first();
        if(!target) return message.reply(`${emotes.error}Please specify a target!`);

        const role = message.guild.roles.cache.find((role) => role.name.toLowerCase() === 'antivc');
        if(!role) return message.reply(`${emotes.error}I cannnot find \`antivc\` role make sure you run \`${prefix}antivc\` before using this command.`)

        if(!target.roles.cache.has(role.id)) return message.reply(`${emotes.error}\`${target.user.tag}\` is not antivced run \`s!antivc @${target.user.tag}\` to add him to antivc!`)

        target.roles.remove(role.id)
        message.channel.send(`${emotes.success}\`${target.user.tag}\` is now unantivced!`)
        .catch(err => channel.send(`${emotes.error}Oops An Unexpected Error Occured:` + err `\nRun \`${config.prefix}links\` to join the support server for help`));
      },
}