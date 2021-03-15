const { client, Message, MessageEmbed } = require("discord.js");
const emotes = require('../../configs/emotes.json')
const config = require("../../config.json")
const db = require("quick.db")
module.exports = {
    name: 'ban', 
    category: "moderation",
    description: 'Ban mentioned user from this server.',
    /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, [member = '', ...reason] ) => {
    let channel = db.fetch(`modlog_${message.guild.id}`)
    if (channel == null) return;

    if (!message.member.hasPermission(`BAN_MEMBERS`)) {
        return message.channel.send(`${emotes.error} You don't have the permissions to use this command [BAN_MEMBERS]!`)
    }
    
    if(!message) return message.channel.send("Please provide a user to ban!")

    if (!message.guild.me.hasPermission("BAN_MEMBERS"))
    return message.channel.send(
      "I need \`BAN_MEMBERS\` permission to run this command!\nGive me \`ADMINISTRATOR\` permission to stop these errors from poopin"
    ) 
    
    if (!member.match(/\d{17,19}/)){
        return message.channel.send(`${emotes.error} | ${message.author}, Please provide the ID or mention the user to ban. [mention first before adding the reason]`);
      };
  
      member = await message.guild.members
      .fetch(member.match(/\d{17,19}/)[0])
      .catch(() => null);
  
      if (!member){
        return message.channel.send(`${emotes.error} | ${message.author}, User could not be found! Please ensure the supplied ID is valid. Mention user for more precision on pinpointing user.`);
      };
  
      if (member.id === message.author.id){
        return message.channel.send(`${emotes.error} | ${message.author}, You cannot ban yourself!`);
      };
  
      if (member.id === client.user.id){
        return message.channel.send(`${emotes.error} | ${message.author}, Please don't ban me!`);
      };
  
      if (member.id === message.guild.ownerID){
        return message.channel.send(`${emotes.error} | ${message.author}, You cannot ban a server owner!`);
      };
  
      if (config.dev.includes(member.id)){
        return message.channel.send(`${emotes.error} | ${message.author}, No, you can't ban my developers through me!`)
      };
  
      if (message.member.roles.highest.position < member.roles.highest.position){
        return message.channel.send(`${emotes.error} | ${message.author}, You can't ban that user! they have higher roles than yours`)
      };
  
      if (!member.bannable){
        return message.channel.send(`${emotes.error} | ${message.author}, I couldn't ban that user!`);
      };
  
      await message.channel.send(`Are you sure you want to ban **${member.user.tag}**? (y/n)`)
  
      const filter = _message => message.author.id === _message.author.id && ['y','n','yes','no'].includes(_message.content.toLowerCase());
      const options = { max: 1, time: 30000, errors: ['time'] };
      const proceed = await message.channel.awaitMessages(filter, options)
      .then(collected => ['y','yes'].includes(collected.first().content.toLowerCase()) ? true : false)
      .catch(() => false);
  
      if (!proceed){
        return message.channel.send(`${emotes.error} | ${message.author}, cancelled the ban command!`);
      };
       
      //---------------------------ModLogs--------------------
      var sChannel = message.guild.channels.cache.get(channel)
      if (!sChannel) return;
      const embed = new MessageEmbed()
      .setAuthor(`${message.guild.name} BanLogs`, message.guild.iconURL())
      .setColor("#2f3136")
      .setThumbnail("https://cdn.discordapp.com/attachments/776925179947384884/808370331856535582/standard_1.gif")
      .setFooter(message.guild.name, message.guild.iconURL())
      .addField("**Action**", "Ban")
      .addField("**User**", member.user.tag)
      .addField("**ID**", member.user.id)
      .addField("**Responsible Staff**", message.author.username)
      .addField("**Reason**", `${reason.join(' ') || 'No Reason Given'}`)
      .addField("**Date**", message.createdAt.toLocaleString())
      .setTimestamp();
      //---------------------------X_X--------------------

      await member.send(`**Hello, You Have Been Banned From ${message.guild.name} for ${reason.join(' ') || 'No Reason Given.'}**`)
      .catch(() => null);
     
      return member.ban({ reason: `SmartWikiBan Command: ${message.author.tag}: ${reason.join(' ') || 'No Reason Given.'}`})
      .then(_member => message.channel.send(`Successfully banned **${_member.user.tag}** \nReason: \`${reason.join(' ') || 'No Reason Given.'}\``))
      .then(_member => sChannel.send(embed))
      .catch(() => message.channel.send(`Failed to ban **${member.user.tag}**!`))

    
    }
  };