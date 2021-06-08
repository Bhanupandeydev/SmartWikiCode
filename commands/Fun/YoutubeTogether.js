const fetch = require("node-fetch")
const Discord = require("discord.js")
module.exports = {
   name: "youtubetogether",
   aliases: ["yttogether", "shareyoutube", "discordyoutube"],
   description: "youtube in discord",
 run: async(client, message, args, user, guild, ) => {
      const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        if (!channel || channel.type !== "voice") return message.channel.send("❌ | Invalid channel specified!");
        if (!channel.permissionsFor(message.guild.me).has("CREATE_INSTANT_INVITE")) return message.channel.send("❌ | I need `CREATE_INSTANT_INVITE` permission");

        fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: "755600276941176913", // youtube together
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${client.token}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(invite => {
                if (!invite.code) return message.channel.send("❌ | Could not start **YouTube Together**!");
                message.channel.send(`✅ | Click here to start **YouTube Together** in ${channel.name} <https://discord.gg/${invite.code}>`);
            })
            .catch(e => {
                message.channel.send("❌ | Could not start **YouTube Together**!");
            })
    }

}