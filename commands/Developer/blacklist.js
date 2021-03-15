const { Message } = require('discord.js')
const config = require("../../config.json")
const blacklist = require('../../models/blacklist')
module.exports = {
 name : 'blacklist',
 
/**
* @param {Message} message
*/
run : async(client, message, args) => {
                if(!config.dev.includes(message.author.id)) return message.channel.send("no u")
                const User = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
                if(!User) return message.channel.send('User is not valid.')
        
                blacklist.findOne({ id : User.user.id }, async(err, data) => {
                    if(err) throw err;
                    if(data) {
                        message.channel.send(`**${User.displayName}** has already been blacklisted!`)
                    } else {
                        data = new blacklist({ id : User.user.id })
                        data.save()
                        .catch(err => console.log(err))
                    message.channel.send(`${User.user.tag} has been added to blacklist.`)
                    }
                   
                })
            }
        }