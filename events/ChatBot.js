const client = require('../index')
const config= require("../config.json")
const prefix = config.prefix
require("../ExtendedMessage");
const smartestchatbot = require('smartestchatbot')
const scb = new smartestchatbot.Client()
client.on("message", async message => {
    if (message.channel.name == "chatbot") {
      try{
      if (message.author.bot) return
      message.content = message.content.replace(/@(everyone)/gi, "everyone").replace(/@(here)/gi, "here");

      message.channel.startTyping()

      if (!message.content) return message.channel.send("Please say something.")

 scb.chat({message: message.content, name: client.user.username, owner:"ChillRage", birthplace: "dsc.gg/chills", user: message.author.id, language: "en"
 }).then(async reply => {
    reply = reply.replace(/affiliateplus.xyz/g, `https://discord.gg/jp8et9xU56`)
  message.inlineReply(`${reply}`).catch(() => {})

 })
  } catch (e) {
   return;
 }

       message.channel.stopTyping()
       
       }

  })