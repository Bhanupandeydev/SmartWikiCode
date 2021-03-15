const { client, Message, MessageEmbed } = require("discord.js");
const emotes = require('../../configs/emotes.json')
const db = require("quick.db")
const config= require("../../config.json")
const prefix = config.prefix  
  
   module.exports = {
    name: 'kick', 
    category: "moderation",
    description: 'Kick mentioned user from this server.',
    /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, [member = '', ...reason] ) => {
    try{
    if (!message.member.hasPermission(`KICK_MEMBERS`)) {
        return message.channel.send(`${emotes.error} You don't have the permissions to use this command [KICK_MEMBERS]!`)
    }
    
    if (!message.guild.me.hasPermission("KICK_MEMBERS"))
    return message.channel.send(
      "I need \`KICK_MEMBERS\` permission to run this command!\nGive me \`ADMINISTRATOR\` permission to stop these errors from poopin"
    ) 
    if (!member.match(/\d{17,19}/)){
      return message.channel.send(`${emotes.error} | ${message.author}, Please provide the ID or mention the user to kick. [mention first before adding the reason]`);
    };

    member = await message.guild.members
    .fetch(member.match(/\d{17,19}/)[0])
    .catch(() => null);

    if (!member){
      return message.channel.send(`${emotes.error} | ${message.author}, User could not be found! Please ensure the supplied ID is valid. Mention user for more precision on pinpointing user.`);
    };

    if (member.id === message.author.id){
      return message.channel.send(`${emotes.error} | ${message.author}, You cannot kick yourself!`);
    };

    if (member.id === client.user.id){
      return message.channel.send(`${emotes.error} | ${message.author}, Please don't kick me!`);
    };

    if (member.id === message.guild.ownerID){
      return message.channel.send(`${emotes.error} | ${message.author}, You cannot kick a server owner!`);
    };

    if (config.dev.includes(member.id)){
      return message.channel.send(`${emotes.error} | ${message.author}, No, you can't kick my developers through me!`)
    };

    if (message.member.roles.highest.position < member.roles.highest.position){
      return message.channel.send(`${emotes.error} | ${message.author}, You can't kick that user! He/She has a higher role than yours`)
    };

    if (!member.kickable){
      return message.channel.send(`${emotes.error} | ${message.author}, I cant kick that user they have higer role/permissions than me!`);
    };

    await message.channel.send(`Are you sure you want to kick **${member.user.tag}**? (y/n)`)

    const filter = _message => message.author.id === _message.author.id && ['y','n','yes','no'].includes(_message.content.toLowerCase());
    const options = { max: 1, time: 30000, errors: ['time'] };
    const proceed = await message.channel.awaitMessages(filter, options)
    .then(collected => ['y','yes'].includes(collected.first().content.toLowerCase()) ? true : false)
    .catch(() => false);

    if (!proceed){
      return message.channel.send(`${emotes.error} | ${message.author}, cancelled the kick command!`);
    };
    
    //===========================KICK LOGS===========================
    let channel = db.fetch(`modlog_${message.guild.id}`)
    if (!channel) return;

    const embed = new MessageEmbed()
        .setAuthor(`${message.guild.name} Kicklogs`, message.guild.iconURL())
        .setColor("#ff0000")
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setFooter(message.guild.name, message.guild.iconURL())
        .addField("**Action**", "kick")
        .addField("**Kicked User**", `${member.user.username} (\`ID:${member.user.id}\`)`)
        .addField("**Responsible Staff**", message.author.username)
        .addField("**Reason**", `${reason.join(' ') || 'No Reason Given'}`)
        .addField("**Date**", message.createdAt.toLocaleString())
        .setTimestamp();

    var sChannel = message.guild.channels.cache.get(channel)
    if (!sChannel) return;
    //===========================X_X=================================
    await member.send(`**${message.author.tag}** kicked you from ${message.guild.name}!\n**Reason**: ${reason.join(' ') || 'Unspecified.'}`)
    .catch(() => null);

    return member.kick({ reason: `SmartWiki Kick Command: ${message.author.tag}: ${reason.join(' ') || 'No Reason Given'}`})
    .then(_member => message.channel.send(`${emotes.success} Successfully kicked **${_member.user.tag} \n\`Reason:\`${reason.join(' ') || 'No Reason Given'}**`))
    .then(_member =>  sChannel.send(embed))  
    .catch(() => message.channel.send(`${emotes.error} Failed to kicked **${member.user.tag}**!`))
  } catch (err) {
    return message.channel.send(`${emotes.error}Oh No Oh NO oH NO NO NO NO NO.....`).then((msg) => {
        setTimeout(() => {
            msg.edit(`${emotes.error}An Unexpected Error Occured: **${err}** \nRun \`${config.prefix}links\` to join the support server for support`);
        }, 3000)
})
}
  


}}