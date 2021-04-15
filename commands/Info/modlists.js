const { MessageEmbed } = require('discord.js');
const db = require("quick.db")
module.exports = {
      name: 'mods',
      usage: 'mods',
      guared: true,
      description: 'Displays a list of all current mods.',
      clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'ADD_REACTIONS'],
    run : async(client, message, args) => {
    
    // Get mod role
    const modRoleId = await db.fetch(`modrole_${message.guild.id}`);
    const modRole = message.guild.roles.cache.get(modRoleId) || '`None`';

    const mods = message.guild.members.cache.filter(m => {
      if (m.roles.cache.find(r => r === modRole)) return true;
    }).sort((a, b) => (a.joinedAt > b.joinedAt) ? 1 : -1).array();

    const embed = new MessageEmbed()
      // .addField(`Mod List`, mods.length)
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .addField(`Moderators`, mods.join('\n'))
      .addField('Mod Role', modRole)
      .addField('Mod Count', `**${mods.length}** out of **${message.guild.members.cache.size}** members`)
      .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
      .setColor(message.guild.me.displayHexColor);

     const interval = 25;
    if (mods.length === 0) message.channel.send(embed.setDescription('No mods found.'))
    else if (mods.length <= interval) {
      const range = (mods.length == 1) ? '[1]' : `[1 - ${mods.length}]`;
      message.channel.send(embed
        // .setTitle(`Mod List ${range}`)
        //  .addField(`Moderators`, mods.join('\n'))
        .setFooter(`ModList of ${message.guild.name}
`)
      )

    //Reaction Menu
    } else {

      embed
        .setTitle('Mod List')
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setFooter(
          'Expires after two minutes.\n' + message.member.displayName,  
          message.author.displayAvatarURL({ dynamic: true })
        )

    }
  }
};