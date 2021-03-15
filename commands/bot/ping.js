const { MessageEmbed } = require('discord.js')
const config= require("../../config.json")
const emotes = require('../../configs/emotes.json');
module.exports = {
    name: 'ping',
    category: 'BotInfo',
    cooldown: 5,
    votersOnly: true,
    description: 'Returns latency of the bot and Discord API Ping',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message, args) => {
       try{
        const msg = await message.channel.send(`🏓 Pinging...`)
        const embed = new MessageEmbed()
            .setTitle('Pong!')
            .setColor("GREEN")
            .setDescription(`WebSocket ping is ${client.ws.ping}MS\nMessage edit ping is ${Math.floor(msg.createdAt - message.createdAt)}MS!`)
            await message.channel.send(embed)
            msg.delete()
          } catch (e) {
        client.channels.cache.get("809839730061082634").send(e) 
        message.channel.send(`${emotes.error} || Oops! An unknown error occured. Please try again later or join the support server by running \`${prefix}links\` `)
    }
    }
}