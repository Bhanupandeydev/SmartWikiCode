
const DIG = require("discord-image-generation");
const emotes = require("../../configs/emotes.json")
const Discord = require("discord.js");
module.exports = {
  name: "ad",
  category: "image",
  description: "Ad a user LMAO!",
  run: async (client, message, args) => {
    try{
    const lol = message.channel.send(
      `${emotes.success}Image Created`
      )
    const m = client.findMember(message, args, true);
    let avatar = m.user.displayAvatarURL({
      dynamic: false,
      format: "png",
    });

    let img = await new DIG.Ad().getImage(avatar);

    let attach = new Discord.MessageAttachment(img, "ad.png");
    message.channel.send(attach)
  } catch (err) {
    return message.channel.send(`${emotes.error}Oh No Oh NO oH NO NO NO NO NO.....`).then((msg) => {
        setTimeout(() => {
            msg.edit(`${emotes.error}An Unexpected Error Occured: **${err}** \nRun \`${config.prefix}links\` to join the support server for support`);
        }, 3000)
})
}
    
},
};