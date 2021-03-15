const request = require('node-superfetch');
const { version } = require('../../package')
const config= require("../../config.json")
const emotes = require('../../configs/emotes.json');
const { GOOGLE_KEY } = config.GOOGLE_KEY
module.exports = {
    name: 'safe-url',
    aliases: ['check-url', 'safe-browsing', 'virus', 'safe-link', 'check-link', 'spoopy-link'],
    group: 'analyze',
    description: 'Determines if a URL is safe or not.',
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (msg,message,{ url },args) => {
        try{
        const { body } = await request
        .post('https://safebrowsing.googleapis.com/v4/threatMatches:find')
        .query({ key: GOOGLE_KEY })
        .send({
            client: {
                clientId: '809861190435471458',
                clientVersion: version
            },
            threatInfo: {
                threatTypes: ['MALWARE', 'SOCIAL_ENGINEERING'],
                platformTypes: ['ANY_PLATFORM'],
                threatEntryTypes: ['URL'],
                threatEntries: [{ url }]
            }
        });
    if (!body.matches) return message.reply(`👍 Good to go! This link is safe!`);
    return message.reply('⚠️ This link is unsafe! **Do not click it!** ⚠️');
} catch (err) {
    return message.channel.send(`${emotes.error}Oh No Oh NO oH NO NO NO NO NO.....`).then((msg) => {
        setTimeout(() => {
            msg.edit(`${emotes.error}An Unexpected Error Occured: **${err}** \nRun \`${config.prefix}links\` to join the support server for support`);
        }, 3000)
})
}
}
}