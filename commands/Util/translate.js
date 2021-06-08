const { MessageEmbed } = require('discord.js')
const translate = require('@k3rn31p4nic/google-translate-api');

module.exports = {
    name: 'translate',
    description: 'Translates Text To Other Languages.',
    usage: 'translate <launguage> <text>',
    example: 'translate french How Are You?',
    run: async(client, message, args) => {

        const lang = args[0]
        const trtext = args.slice(1).join(" ")
        if(!lang) return message.reply(`Please Give The Language In Which You Want To Translate Text!`)
        if(!trtext) return message.reply(`Please Give The Text Which You Want To Translate!`)

        translate(trtext, {to: lang}).then(res => {
        const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`Translated Text`)
        .setDescription(res.text)
        message.channel.send(embed)
    }).catch(err => {
        return message.channel.send(`Unxpected Error Occurred\`${err.message}\` Try Again Later!`)
    })

    }
}