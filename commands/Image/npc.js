
const fetch = require('node-fetch');
const{MessageEmbed} = require('discord.js');
const config= require("../../config.json")
const emotes = require('../../configs/emotes.json');
module.exports = {
    name:"npc",
    group: "fun",
    async run (client, message, args) {
    try{
     let lettext2 = args.join(" ");
     if(!lettext2) return message.channel.send("What's the text?")
        let link = await fetch(`https://vacefron.nl/api/npc?text1= &text2=${lettext2} `)
        let embed = new MessageEmbed()
        .setImage(link.url)
        .setColor("GREY")

        message.channel.send(embed)
        .catch(e => {
            console.log(e)
            return message.channel.send("Something went wrong!")
        })
    } catch (err) {
        return message.channel.send(`${emotes.error}Oh No Oh NO oH NO NO NO NO NO.....`).then((msg) => {
            setTimeout(() => {
                msg.edit(`${emotes.error}An Unexpected Error Occured: **${err}** \nRun \`${config.prefix}links\` to join the support server for support`);
            }, 3000)
    })
}
    }
}