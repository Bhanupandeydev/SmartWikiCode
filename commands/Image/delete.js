const DIG = require("discord-image-generation");
const Discord = require("discord.js");
module.exports = {
  name: "delete",
  category: "image",
  description: "Delete a user LMAO!",
  run: async (client, message, args) => {
    try{
    const m = client.findMember(message, args, true);
    let avatar = m.user.displayAvatarURL({
      dynamic: false,
      format: "png",
    });

    let img = await new DIG.Delete().getImage(avatar);

    let attach = new Discord.MessageAttachment(img, "delete.png");
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