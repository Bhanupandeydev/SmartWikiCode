const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');
const emotes = require('../../configs/emotes.json');
const Discord = require('discord.js');

module.exports = {
	name: 'permissionsfor',
	aliases: ['permsfor', 'perms', 'permissions'],
	group: 'utility',
	guildOnly: true,
	description: 'List the server permissions of mentioned user or provided ID',
	parameters: ['User ID/Mention'],
	get examples() {
		return [this.name, ...this.aliases].map(x => x + ' <user>');
	},
	run: async (client, message, [member = '']) => {

     try{
    if (!member.match(/\d{17,19}/)){
      member = message.author.id;
    };

    member = await message.guild.members
    .fetch(member.match(/\d{17,19}/)[0])
    .catch(() => null);

    if (!member){
      return message.channel.send(`\\❌ User not found.`);
    };

    const sp = member.permissions.serialize();
    const cp = message.channel.permissionsFor(member).serialize();

    return message.channel.send(
      new MessageEmbed()
      .setColor(member.displayColor || 'GREY')
      .setTitle(`${member.displayName}'s Permissions`)
      .setFooter(`Permissions | \©️${new Date().getFullYear()} SmartWiki`)
      .setDescription([
        '\\♨️ - This Server',
        '\\#️⃣ - The Current Channel',
        '```properties',
        '♨️ | #️⃣ | Permission',
        '========================================',
        `${Object.keys(sp).map(perm => [
          sp[perm] ? '✔️ |' : '❌ |',
          cp[perm] ? '✔️ |' : '❌ |',
          perm.split('_').map(x => x[0] + x.slice(1).toLowerCase()).join(' ')
        ].join(' ')).join('\n')}`,
        '```'
      ].join('\n'))
    );

  } catch (err) {
    return message.channel.send(`${emotes.error}Oh No Oh NO oH NO NO NO NO NO.....`).then((msg) => {
        setTimeout(() => {
            msg.edit(`${emotes.error}An Unexpected Error Occured: **${err}** \nRun \`${config.prefix}links\` to join the support server for support`);
        }, 3000)
})
}
  }
};
	

