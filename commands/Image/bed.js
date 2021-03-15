const { MessageAttachment } = require("discord.js");
const canvacord = require("canvacord");
module.exports = {
  name: "bed",
  category: "image",
  run: async (client, message, args) => {
    try{
    const user = client.findMember(message, args);
  
    if (!user) {
      const image1 = client.user.displayAvatarURL({ format: "png" });
      const image2 = message.author.displayAvatarURL({ format: "png" });
      const slap = await canvacord.Canvas.bed(image1, image2);
      let attachment = new MessageAttachment(slap, "bed.png");
      return message.channel.send(attachment);
    }
    if (user) {
      const image1 = message.author.displayAvatarURL({ format: "png" });
      const image2 = user.user.displayAvatarURL({ format: "png" });
      const slap = await canvacord.Canvas.bed(image1, image2);
      let attachment = new MessageAttachment(slap, "bed.png");
      return message.channel.send(attachment);
    }
  } catch (err) {
    return message.channel.send(`${emotes.error}Oh No Oh NO oH NO NO NO NO NO.....`).then((msg) => {
        setTimeout(() => {
            msg.edit(`${emotes.error}An Unexpected Error Occured: **${err}** \nRun \`${config.prefix}links\` to join the support server for support`);
        }, 3000)
})
}
  },
};