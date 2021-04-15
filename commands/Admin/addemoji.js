const Discord = require('discord.js')
const config= require("../../config.json")
const emotes = require("../../configs/emotes.json")
const { parse } = require("twemoji-parser");
const prefix = config.prefix
const { MessageEmbed } = require("discord.js");
module.exports = {
    name: 'addemoji',
    category: 'moderation',
    usage: `<emoji>`,
    description: 'Adds a given Emoji to the server',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message, args) => {
        if (!message.member.hasPermission(`MANAGE_EMOJIS`)) {
            return message.channel.send(`${emotes.error} You don't have the permissions to use this command [Manage Emojis]!`)
        }
        
        if (!message.guild.me.hasPermission("MANAGE_EMOJIS"))
        return message.channel.send(
          "I need \`MANAGE_EMOJIS\` permission to run this command!\nGive me \`ADMINISTRATOR\` permission to stop these errors from poopin"
        )
         
        const emoji = args[0];
        if (!emoji) return message.channel.send(`Please Give Me A Emoji! \nUsage: \`${prefix}addemoji <emoji> <optional emoji name>\``);
        try{
        let customemoji = Discord.Util.parseEmoji(emoji);
        if (customemoji.id) {
            const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${customemoji.animated ? "gif" : "png"
                }`;
            const name = args.slice(1).join(" ");
            try {
                const Added = new MessageEmbed()
                .setColor(config.embedcolor)
                .setTitle(`${emotes.verified} Emoji Added`)
                .setDescription(
                `${emotes.verified} Emoji Has Been Added! | Name : ${name ? name : customemoji.name} | Preview : [Click Me](${Link})`
                    );
                await message.guild.emojis.create(
                    `${Link}`,
                    `${name ? name : customemoji.name}`
                )
                return message.channel.send(Added)
            } catch (err) {
                console.log(err)
                return message.channel.send(`${emotes.error} An error has occured!\n\n**Possible Reasons:**\n\`\`\`- This server has reached the emojis limit\n- The bot doesn't have permissions.\n- The emojis size is too big.\n-There is a space in the emoji name, Fix: make sure you dont put a space in the emoji name!\`\`\``)
           
            }
        } else {
            let CheckEmoji = parse(emoji, { assetType: "png" });
            if (!CheckEmoji[0])
                return message.channel.send(`${emotes.error} **Please Give Me A Valid Emoji!**`);
            message.channel.send(
                `${emotes.error} **You Can Use Normal Emoji Without Adding In Server!**`
            );
    }

} catch (err) {
    return message.channel.send(`${emotes.error}Oh No Oh NO oH NO NO NO NO NO.....`).then((msg) => {
        setTimeout(() => {
            msg.edit(`${emotes.error}An Unexpected Error Occured: **${err}** \nRun \`${config.prefix}links\` to join the support server for support`);
        }, 3000)
})
}
}
}