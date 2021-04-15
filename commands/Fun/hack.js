///command file make it to your command handler and require it correctly 
const Discord = require('discord.js');
const { prefix } = require(`../../config.json`);
const { sleep } = require('../../sleep')

module.exports = {
    name: 'hack',
    aliases: [' '],
    description: 'hack command',
    args: true,
    usage: '<@user>',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        const hacked = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        const genemail = [
            'noobs@'
        ]
        const genending = [
            'gmail.com'
        ]
        const genpass = [
            '82jfsk9aw1l'
        ]///just change all of them to what you need 
        await message.channel.send(`Hacking ${hacked.user.username} now...`)
        .then(async msg => {
            await sleep(1500);///you can add more of them
            await msg.edit(`[▖] Finding discord login... (2fa bypassed)`)
            await sleep(2000);
            await msg.edit(`[▘] Found:\n**Email:** \`${genemail}${genending}\`\n**Password:** ${genpass}`)
            await sleep(2500);
            await msg.edit(`[▝] Fetching DM's with closest friends (They have no friends)`)
            await sleep(2000);
            await msg.edit(`Succesfully hacked ${hacked.user.username}`)
            await sleep(2000);
        } )
    }
}




