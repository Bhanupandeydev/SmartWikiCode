const Discord = require("discord.js");
const config= require("../../config.json")
const emotes = require('../../configs/emotes.json');
module.exports = {
  name: "members",
  aliases: ["mbs"],
  category: "Information",
  group: "utility",
  description: "Show Discord Server Members!",
  usage: "Members",
  run: async (client, message, args) => {
    try{
    const Online = message.guild.members.cache.filter(Mem => Mem.presence.status === "online"), Offline = await message.guild.members.cache.filter(Mem => Mem.presence.status === "offline"), Idle = await message.guild.members.cache.filter(Mem => Mem.presence.status === "idle"), Dnd = await message.guild.members.cache.filter(Mem => Mem.presence.status === "dnd");
    const Bots = await message.guild.members.cache.filter(Mem => Mem.user.bot), Humans = await message.guild.members.cache.filter(Mem => !Mem.user.bot), Players = await message.guild.members.cache.filter(Mem => Mem.presence.activities && Mem.presence.activities[0] && Mem.presence.activities[0].type === "PLAYING"), Websites = await message.guild.members.cache.filter(Mem => Mem.presence.clientStatus && Object.keys(Mem.presence.clientStatus).includes("web")), Desktop = await message.guild.members.cache.filter(Mem => Mem.presence.clientStatus && Object.keys(Mem.presence.clientStatus).includes("desktop")), Mobile = await message.guild.members.cache.filter(Mem => Mem.presence.clientStatus && Object.keys(Mem.presence.clientStatus).includes("mobile"));
    let SameTag = await message.guild.members.cache.map(Mem => Mem.user.discriminator), Fake = [], Original = [];

    for (let i = 0; i < SameTag.length; i++) {
      if (Fake.includes(SameTag[i])) await Original.push(SameTag[i]);
      await Fake.push(SameTag[i]);
    };

    SameTag = Original.length;

    const Embed = new Discord.MessageEmbed()
    .setColor("GREY")
    .setTitle("Members Count!")
    .setDescription(`Total - **${message.guild.memberCount}**`)
    .setFooter(`Members | \©️${new Date().getFullYear()} SmartWiki`)
    .setTimestamp();

    return message.channel.send(Embed)
  } catch (err) {
    return message.channel.send(`${emotes.error}Oh No Oh NO oH NO NO NO NO NO.....`).then((msg) => {
        setTimeout(() => {
            msg.edit(`${emotes.error}An Unexpected Error Occured: **${err}** \nRun \`${config.prefix}links\` to join the support server for support`);
        }, 3000)
})
}
  }
};