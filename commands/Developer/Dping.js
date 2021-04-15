const Discord = require('discord.js');
const config = require('../../config.json');
const emotes = require('../../configs/emotes.json');
module.exports = {
	name: 'dping',
	OwnerOnly: true,
	description: 'Returns latency of the bot and Discord API Ping',

	/**
	 * @param {Client} client
	 * @param {Message} message
	 * @param {String[]} args
	 */

	run: async (client, message, args) => {
	   
  let circles = {
      green: "🟢",
      yellow: "🟡",
      red: "🔴"
  }

  const msg = await message.channel.send(new Discord.MessageEmbed()
  .setColor("RED") //you can change this
  .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
  .addField("Websocket", 
      `${client.ws.ping <= 200 ? circles.green : client.ws.ping <= 400 ? circles.yellow : circles.red} ${client.ws.ping}ms`
  ))

  let ping = msg.createdTimestamp - message.createdTimestamp;

  msg.edit(
      new Discord.MessageEmbed()
      .setColor()
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .addField("Websocket", 
      `${client.ws.ping <= 200 ? circles.green : client.ws.ping <= 400 ? circles.yellow : circles.red} ${client.ws.ping}ms`
  )
      .addField("RoundTrip",
      `${ping <= 200 ? circles.green : ping <= 400 ? circles.yellow : circles.red} ${ping} ms `
      )
 )
	}}
	  