const client = require("../index")
const emotes = require("../configs/emotes.json")
const db = require("quick.db")
const config = require("../config.json")
client.on("message", async message => {
    if (message.author.bot) return;
    // if(!message.member.hasPermission('ADMINISTRATOR')) return;

    let words = db.get(`words_${message.guild.id}`)
    let yus = db.get(`message_${message.guild.id}`)
    if (yus === null) {
      yus = `${emotes.error} | **{user-mention}, The Word You said is blacklisted in ${message.guild.name}!**`
    }

    let pog = yus.split("{user-mention}").join("<@"+message.author.id+">").split("{server-name}").join(message.guild.name).split("{user-tag}").join(message.author.tag).split("{user-username}").join(message.author.username)
    if (words === null) return;
    function check(msg) { //is supposed to check if message includes da swear word
      return words.some(word => message.content.toLowerCase().split(" ").join("").includes(word.word.toLowerCase()))
    }
    if (check(message.content) === true) {
      message.delete().catch((e) => {} )
      message.channel.send(pog).catch((e) => {} )
      .then((msg) => {
        setTimeout(() => {
          msg.delete()
        }, 5000)}).catch((e) => {} )
      
    
  }
}
)