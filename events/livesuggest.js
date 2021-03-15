const { MessageEmbed } = require("discord.js")
const config = require("../config.json")
const client = require("../index")
    client.on('message', async message => {
        if (message.channel.id !== '782344900288708638') return
        if (message.channel.id !== config.suggestionChannel) return
        if (message.author.bot) return
        if (message.member.hasPermission('ADMINISTRATOR')) return
        message.delete()
            const suggestionEmbed = new MessageEmbed()
            .setAuthor(`${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
            .setTitle(`New Suggestion!`)
            .setDescription(message.content + '\n\n' + 
            '<a:region:808917047823433739>Waiting for community feedback, please vote!')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setFooter(`Want to suggest something? Simply type it in this channel!`, message.guild.iconURL({ dynamic: true }))
            .setColor('#ee7373')
            .setTimestamp()


        message.channel.send(suggestionEmbed).then(async sentMessage => {
            await sentMessage.react('804197569097367583')
            await sentMessage.react('804197621845327872')
        })
    })
