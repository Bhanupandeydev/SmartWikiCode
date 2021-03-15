const Color = "GREY", Random = require("srod-v2");
const Discord = require("discord.js");
const config= require("../../config.json")
const emotes = require('../../configs/emotes.json');
module.exports = {
  name: "ph",
  aliases: ["phubcomment", "pc"],
  category: "Image",
  group: "fun",
  description: "Return A phub Comment Image!",
  usage: "ph <Username> <Comment>.",
  run: async (client, message, args) => {
     try{
    const Username = args[0];
    if (!Username || Username.length > 15) return message.channel.send("Please Give Username (15 Characters Limit)!");

    const Comment = args.slice(1).join(" ");
    if (!Comment || Comment.length > 150) return message.channel.send("Please Give Comment (150 Characters Limit)!");

    const Data = await Random.PornhubComment({ Name: Username, Image: message.author.avatarURL({ format: "png" }), Comment: Comment, Color: Color });

    return message.channel.send(Data);
  } catch (err) {
    return message.channel.send(`${emotes.error}Oh No Oh NO oH NO NO NO NO NO.....`).then((msg) => {
        setTimeout(() => {
            msg.edit(`${emotes.error}An Unexpected Error Occured: **${err}** \nRun \`${config.prefix}links\` to join the support server for support`);
        }, 3000)
})
}
  }
};