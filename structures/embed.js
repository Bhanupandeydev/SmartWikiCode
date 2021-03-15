const { MessageEmbed } = require("discord.js");
module.exports = class em extends MessageEmbed {
  constructor(...args) {
    super(...args);
    this.setColor("BLUE");
  }
  error(msg) {
    return this.setColor("RED").setDescription(msg);
  }
  success(msg) {
    return this.setColor("GREEN").setDescription(msg);
  }
};
