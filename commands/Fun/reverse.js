const config= require("../../config.json")
const emotes = require('../../configs/emotes.json');
module.exports = {
    name: 'reverse',
    aliases: [],
    group: 'fun',
    description: 'Reverses the supplied text',
    get examples(){ return [this.name, ...this.aliases];},
    run: (client, message, args) =>
    message.channel.send(args.join(' ').split('').reverse().join(' ') || 'No text to reverse.')
  };