const emotes = require("../../configs/emotes.json")
const config= require("../../config.json")
module.exports = {
    name: 'rate',
    aliases: [],
    group: 'fun',
    description: 'Rates the provided argument',
    parameters: [ 'something to rate with' ],
    get examples(){ [ 'Potato', 'Cheese', 'Bringles' ]
    .map(x => this.name + ' ' + x);},
    run: (client, message, args) => {
      try{
      if (!args.length){
        return message.channel.send(`${emotes.error} | ${message.author}! Give me something to rate!!`);
      };
  
      const raw = args.join(' ').replace(/[^\w\s]/gi,1202)
      let rate = parseInt(raw, 36) % 101;
      const emoji = (rate) => [
          '\\🖤\\🖤\\🖤\\🖤\\🖤\\🖤\\🖤\\🖤\\🖤\\🖤'
        , '\\❤️\\🖤\\🖤\\🖤\\🖤\\🖤\\🖤\\🖤\\🖤\\🖤'
        , '\\❤️\\❤️\\🖤\\🖤\\🖤\\🖤\\🖤\\🖤\\🖤\\🖤'
        , '\\❤️\\❤️\\❤️\\🖤\\🖤\\🖤\\🖤\\🖤\\🖤\\🖤'
        , '\\❤️\\❤️\\❤️\\❤️\\🖤\\🖤\\🖤\\🖤\\🖤\\🖤'
        , '\\❤️\\❤️\\❤️\\❤️\\❤️\\🖤\\🖤\\🖤\\🖤\\🖤'
        , '\\❤️\\❤️\\❤️\\❤️\\❤️\\❤️\\🖤\\🖤\\🖤\\🖤'
        , '\\❤️\\❤️\\❤️\\❤️\\❤️\\❤️\\❤️\\🖤\\🖤\\🖤'
        , '\\❤️\\❤️\\❤️\\❤️\\❤️\\❤️\\❤️\\❤️\\🖤\\🖤'
        , '\\❤️\\❤️\\❤️\\❤️\\❤️\\❤️\\❤️\\❤️\\❤️\\🖤'
        , '\\❤️\\❤️\\❤️\\❤️\\❤️\\❤️\\❤️\\❤️\\❤️\\❤️'
      ][Math.floor(rate / 10)];
  
      if ([
        'SmartWiki', 'Smart', 'ChillCord', 'ChillRage'
      ].includes(raw.toLowerCase())){
        rate = 100;
      };
  
      return message.channel.send(`${emoji(rate)} (**${rate}**) %`)
    } catch (err) {
      return message.channel.send(`${emotes.error}Oh No Oh NO oH NO NO NO NO NO.....`).then((msg) => {
          setTimeout(() => {
              msg.edit(`${emotes.error}An Unexpected Error Occured: **${err}** \nRun \`${config.prefix}links\` to join the support server for support`);
          }, 3000)
  })
}
    }
  };