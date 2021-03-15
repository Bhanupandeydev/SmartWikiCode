const client = require("../index")
const Discord = require("discord.js")
client.on('guildCreate', server => {
    if(server.id === '810990219281039391') return;

  let emm = new Discord.MessageEmbed() // Makes a pretty embed
    .setTitle(`Thanks for adding me to ${server.name}!`)
    .setDescription(`Hi Im SmartWiki Im an all in one Discord Bot With Features Ranging from Moderation and More, Im Known After My exclusive Smart ChatBot Feature! \nI Hope I Can Make ${server.name} a betTER place for everyone \n**thanks again for adding me to ${server.name}**!`)
    .addField(`Commands`, `Lost? Want Help? Run \`s!help\` command in your server!`)
    .addField('Vote For Me!',`[Vote](https://top.gg/bot/762745762777006080)**`)
    .addField('My Server',`[Support Server](https://discord.gg/jp8et9xU56)**`)
    .setColor("GREEN")
    .setThumbnail("https://cdn.discordapp.com/attachments/776925179947384884/808369542648561705/standard.gif")
    .setFooter("©SmartWiki | 2021 | Support Us By Voting On Top.gg");
  server.owner.send(emm).catch(() => {})
});

client.on('guildCreate', guild =>{
    if(guild.id === '810990219281039391') return;

    const Logs = '809839910675546122'
    client.channels.cache.get(Logs).send(
    new Discord.MessageEmbed() 
    .setTitle('NEW SERVER!') 
    .addField('Guild Name' , `${guild.name}`)
    .addField('Guild Members' , `${guild.members.cache.size}`)
    .addField('Guild Id' , `${guild.id}`)
    .addField('Guild Owner' , `${guild.owner} | Id: (${guild.owner.id})`)
    .setFooter(`Smart Wiki is Currently in ${client.guilds.cache.size}Guilds!`) 
    .setThumbnail("https://media.discordapp.net/attachments/776925179947384884/818438299684175902/MOSHED-2021-3-8-14-59-25.gif")   
    .setColor('GREEN')
  ).catch(() => {} )  
})

client.on('guildDelete', guild =>{
    if(guild.id === '810990219281039391') return;

    const Logs = '809839910675546122'
    client.channels.cache.get(Logs).send(
    new Discord.MessageEmbed() 
    .setTitle("I Was Removed From a Guild :c")
    .addField("Guild Name" , `${guild.name}`)
    .addField("Guild Members" , `${guild.members.cache.size}`)
    .addField("Guild Id" , `${guild.id}`)
    .addField('Guild Owner' , `${guild.owner} | Id: (${guild.owner.id})`)
    .setFooter(`SmartWiki is Currently in ${client.guilds.cache.size}guilds!`)
    .setThumbnail("https://media.discordapp.net/attachments/776925179947384884/818438301114826802/MOSHED-2021-3-8-15-0-7.gif")
    .setColor('RED')
).catch(() => {} )
})