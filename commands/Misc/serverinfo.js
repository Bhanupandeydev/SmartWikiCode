const { CustomEmbed } = (`\©️${new Date().getFullYear()} SmartWiki`);
const moment = require("moment");
const config= require("../../config.json")
const emotes = require('../../configs/emotes.json');
const region = {
    "brazil": "Brazil :flag_br:",
    "europe": "Europe :flag_eu:",
    "india": "India :flag_in:",
    "japan": "Japan :flag_jp:",
    "singapore": "Singapore :flag_sg:",
    "us-central": "US-Central :flag_us:",
    "us-east": "US-East :flag_us:",
    "us-south": "US-South :flag_us:",
    "us-west": "US-West :flag_us:",
    "sydney": "Sydney :flag_au:",
    "hongkong": "Hong Kong :flag_hk:",
    "russia": "Russia :flag_ru:",
    "southafrica": "South Africa :flag_za:"
};

const Discord = require('discord.js')
module.exports = {
    name: "serverinfo",
    aliases: ["sinfo", "si"],
    category: 'Info',
    description: "Shows status of users",

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async (client, message, args) => {
      try{
        const titleCase = str => {
            return str.toLowerCase().replace(/_/g, " ").split(" ")
                      .map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
                      .join(" ")
        }

        let members = message.guild.members.cache.filter(member => !member.user.bot).size
        let onlineMembers = message.guild.members.cache.filter(member => !member.user.bot).filter(member => member.presence.status !== "offline").size
        let bots = message.guild.members.cache.filter(member => member.user.bot).size
        let onlineBots = message.guild.members.cache.filter(member => member.user.bot).filter(member => member.presence.status !== "offline").size
        let textChannels = message.guild.channels.cache.filter((c) => c.type === "text").size;
        let voiceChannels = message.guild.channels.cache.filter((c) => c.type === "voice").size;
        let categories = message.guild.channels.cache.filter((c) => c.type == "category").size;
        let roleCount = message.guild.roles.cache.size - 1;

        let icon = message.guild.iconURL({ dynamic: true, size: 512 })
        if(!icon) { icon = "https://i.imgur.com/AWGDmiu.png"}

        const embed = new Discord.MessageEmbed()
            .setAuthor(`${message.guild.name}`, icon)
            .setDescription(`${message.guild.name} was created on ${moment(message.guild.createdAt).format(`MMM DD YYYY`)}`)
            .setThumbnail(icon)
            .addFields(
                { name: `${emotes.star}Region`, value: `${region[message.guild.region]}`, inline:true },
                { name: `${emotes.info}Total Users/Bots`, value: `${message.guild.members.cache.size} Users/Bots`, inline: true },
                { name: `${emotes.users}Users`, value: `${members} Users (${onlineMembers} Online)`, inline: true },
                { name: `${emotes.Dev}Bots`, value: `${bots} Bots (${onlineBots} Online)`, inline: true },
                { name: `${emotes.boost}Boosts`, value: `${message.guild.premiumSubscriptionCount} Boosts (Tier ${message.guild.premiumTier})`, inline: true },
                { name: `${emotes.Channel}Text Channels`, value: `${textChannels}`, inline: true },
                { name: `${emotes.voice}Voice Channels`, value: `${voiceChannels}`, inline: true },
                { name: `${emotes.Channel}Categories`, value: `${categories}`, inline: true },
                { name: `${emotes.level}Verification Level`, value: `${titleCase(message.guild.verificationLevel)}`, inline: true },
                { name: `${emotes.uptime}AFK Timeout`, value: (message.guild.afkChannel) ? `${moment.duration(message.guild.afkTimeout * 1000).asMinutes()} minute(s)` : `None`, inline: true },
                { name: `${emotes.Channel}AFK Channel`, value: (message.guild.afkChannel) ? `${message.guild.afkChannel.name}` : "None", inline: true },
                { name: `${emotes.dnd}Explicit Content Filter`, value: `${titleCase(message.guild.explicitContentFilter)}`, inline: true },
                { name: `${emotes.info}Roles`, value: `${roleCount}`, inline: true },
                { name: `${emotes.Crown}Server Owner`, value: `[${message.guild.owner.user.tag}](https://discord.com/users/${message.guild.owner.user.id} "https://discord.com/users/${message.guild.owner.user.id}")`, inline: true },
                { name: `${emotes.info}Server ID`, value: `${message.guild.id}`, inline: true }
            )
            .setFooter(`\©️${new Date().getFullYear()} SmartWiki`)
            .setColor("GREEN")
        message.channel.send(embed)
    } catch (err) {
        return message.channel.send(`${emotes.error}Oh No Oh NO oH NO NO NO NO NO.....`).then((msg) => {
            setTimeout(() => {
                msg.edit(`${emotes.error}An Unexpected Error Occured: **${err}** \nRun \`${config.prefix}links\` to join the support server for support`);
            }, 3000)
    })
}
    }
}