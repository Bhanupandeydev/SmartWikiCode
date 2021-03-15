const blacklist = require('../../models/blacklist')
const { Message } = require('discord.js')
const config= require("../../config.json")
const emotes = require('../../configs/emotes.json');
module.exports = {
    name : 'whitelist',
    run : async(client, message, args) => {
        if(!config.dev.includes(message.author.id)) return message.channel.send("no u")
        const User = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
        if(!User) return message.channel.send('User is not valid.')

        blacklist.findOne({ id : User.user.id }, async(err, data) => {
            if(err) throw err;
            if(data) {
               await blacklist.findOneAndDelete({ id : User.user.id })
                .catch(err => console.log(err))
                message.channel.send(`**${User.displayName}** has been removed from blacklist.`)
            } else {
               message.channel.send(`**${User.displayName}** is not blacklisted.`)
            }
           
        })
    }
}