  
const { MessageEmbed } = require('discord.js');
const { stripIndent } = require('common-tags');
const config= require("../../config.json")
const emotes = require('../../configs/emotes.json');
module.exports = {
    name: 'servercount',
    aliases: [ 'scount' ],
    clientPermissions: [ 'EMBED_LINKS' ],
    group: 'utility',
    description: 'Shows server count of smartwikis.',
    parameters: [ 'User Mention / ID' ],
    get examples(){ [ this.name, ...this.aliases].map(x => x + ' @user')},
    run: async (client, message, args,) => {

    const counts = stripIndent`
      Servers:: ${message.client.guilds.cache.size}
      Users:: ${message.client.users.cache.size}
    `;
    const embed = new MessageEmbed()
      .setTitle('SmartWiki(s) server count')
      .setDescription(stripIndent`\`\`\`\n${counts}\`\`\``)
      .setFooter(`ServerCount | \©️${new Date().getFullYear()} SmartWiki`)
      .setTimestamp()
      .setColor('GREY');
    message.channel.send(embed);
  }
};