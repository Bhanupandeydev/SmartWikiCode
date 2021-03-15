const Color = "GREY", Fetch = require("node-fetch");
const Discord = require("discord.js");
const config= require("../../config.json")
const emotes = require('../../configs/emotes.json');
module.exports = {
  name: "meme",
  aliases: ["mm"],
  category: "Fun",
  group: "fun",
  description: "Return A Random Meme!",
  usage: "Meme",
  run: async (client, message, args) => {
   try{
    const Response = await Fetch("https://api.darkboy.me/getmeme");
    const Json = await Response.json();

    if (!Json.title) return message.channel.send("Your Life Lmafao");

    const Embed = new Discord.MessageEmbed()
    .setColor(Color)
    .setTitle(Json.title)
    .setImage(Json.image)
    .setFooter(`${Json.up} 👍 | ${Json.comments} 💬`)
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