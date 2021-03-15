const { MessageEmbed } = require('discord.js');
const config= require("../../config.json")
const emotes = require('../../configs/emotes.json');
const moment = require("moment")
const a = moment().format('MMMM do, YYYY, hh:mm:ss A')

module.exports = {
        name: "channelinfo",
        aliases: ['ci', 'channeli', 'cinfo'],
        category: "info",
        group: "utility",
        description: "Shows Channel Info Usage: [ channel mention | channel name | ID] (optional)",
        usage: "[ channel mention | channel name | ID] (optional)",
        accessableby: "everyone",
    run: async (client, message, args) => {
        try{
        let channel = message.mentions.channels.first() || client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.channel;
        if (!channel) return message.channel.send(`${emotes.error} || **Channel Not Found!**`);

        let channelembed = new MessageEmbed()
            .setTitle(`Channel Information for ${channel.name}`)
            .setThumbnail(message.guild.iconURL())
            .addField("**NSFW**", channel.nsfw, true)
            .addField("**Channel ID**", channel.id, true)
            .addField("**Channel Type**", channel.type)
            .addField("**Channel Description**", `${channel.topic || "No Description"}`)
            .addField("**Channel Created At**", `Date: ${channel.createdAt.toLocaleDateString("en-US")} \nTime: ${a}`)
            .setColor("GREY")
            .setFooter(`\©️${new Date().getFullYear()} SmartWiki`)
        message.channel.send(channelembed)

    } catch (err) {
        return message.channel.send(`${emotes.error}Oh No Oh NO oH NO NO NO NO NO.....`).then((msg) => {
            setTimeout(() => {
                msg.edit(`${emotes.error}An Unexpected Error Occured: **${err}** \nRun \`${config.prefix}links\` to join the support server for support`);
            }, 3000)
    })
}

    }
}