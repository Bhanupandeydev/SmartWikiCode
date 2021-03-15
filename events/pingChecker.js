const emotes = require("../configs/emotes.json")
const Discord = require("discord.js")
module.exports = (client) => {
    const webhook = new Discord.WebhookClient("818436621367771146","uLOFzUKgl7sXeAn2pdW0mKRMntSMn60KHV2rM5TaZ1hx7_fnZDeKdtOOOPs5HRQ3oJ5p");
    setInterval(async () => {
      if (client.ws.ping > 5000) {
        const channel = await client.channels.cache.get("818436476193865739");
          
        const msg = new Discord.MessageEmbed()
        .setTitle('High Latency Warn')
        .setDescription(`${emotes.warn} The bots ping is currently very high expect lower response time (${client.ws.ping}ms)`)
        .setColor('RED')
        .setFooter('Latency Logger')
        .setThumbnail("https://media.discordapp.net/attachments/807564563658571798/813822883238379570/BotLogo.png")
        webhook.send(msg).catch((e) => {} )
      }
    }, 30000);
  };