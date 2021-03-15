const Badwords = require('bad-words');
const config= require("../../config.json")
const emotes = require('../../configs/emotes.json');
const badWords = new Badwords();
const eightball = [
  'It is certain.'
  , 'It is decidedly so.'
  , 'Without a doubt.'
  , 'Yes - definitely.'
  , 'You may rely on it.'
  , 'As I see it, yes.'
  , 'Most likely.'
  , 'Outlook good.'
  , 'Yes.'
  , 'Signs point to yes.'
  , 'Reply hazy, try again.'
  , 'Ask again later.'
  , 'Better not tell you now.'
  , 'Cannot predict now.'
  , 'Concentrate and ask again.'
  , 'Don\'t count on it.'
  , 'My reply is no.'
  , 'My sources say no.'
  , 'Outlook not so good.'
  , 'Very doubtful.'
];

module.exports = {
  name: '8ball',
  aliases: [ '🎱', '8b', '8-ball', 'eightball' ],
  args: true,
  usage: '<message>',
  description: 'Ask anything on the magic 8-ball',
  parameters: [ 'Question answerable by Yes/No' ],
  get examples(){
    return [
      'Is SmartWiki a good bot?', 'Is FMA worth of it\'s top spot?',
      'Is discord good?', 'Do you want to play Among Us?',
      'Have you been in a thight spot before?'
    ].map((x,i) => [this.name, ...this.aliases][i] + ' ' + x)
  },
  run: (client, message, args) => {
     try{

    if (badWords.isProfane(message.content)){
      return message.channel.send(`I can't reply to a question with innappropriate content in it..`, { replyTo: message })
    };

    const response = eightball[Math.floor(Math.random() * eightball.length)];

    return message.channel.send(response, { replyTo: message });

  } catch (err) {
    return message.channel.send(`${emotes.error}Oh No Oh NO oH NO NO NO NO NO.....`).then((msg) => {
        setTimeout(() => {
            msg.edit(`${emotes.error}An Unexpected Error Occured: **${err}** \nRun \`${config.prefix}links\` to join the support server for support`);
        }, 3000)
})
}
  }
};