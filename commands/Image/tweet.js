
const fetch = require('node-fetch');
const Discord = require("discord.js")
const config= require("../../config.json")
const emotes = require('../../configs/emotes.json');
module.exports = {
    name:"tweet",
    group: "fun",
    async run (client, message, args) {
        try{
        let text = args.slice(0).join(" ");
        if(!text) return message.channel.send("you need some text there")
        fetch(`https://nekobot.xyz/api/imagegen?type=trumptweet&text=${text}`)
        .then((res) => res.json())
        .then((body) => {
            let embed = new Discord.MessageEmbed()
            .setTitle("Trump tweeted!")
            .setURL(body.message)
            .setImage(body.message)
            .setColor("GREY")
            message.channel.send(embed)
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