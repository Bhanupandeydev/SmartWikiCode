const config = require("../config.json")
const TopGG = require('@top-gg/sdk') 
const AutoPoster = require('topgg-autoposter')
let channelForWebhooks = "804240284895936512"
const DBL = require('top.gg');
const Discord = require("discord.js")
const dbl = new DBL(config.dblkey, { webhookPort: 1398, webhookAuth: 'itsbrain' });
dbl.webhook.on('ready', hook => {
   console.log(`Webhook up and running at http://${hook.hostname}:${hook.port}${hook.path}`);
});
dbl.on('error', e => {
   console.log(`Oops! ${e}`);
})
dbl.webhook.on('vote', async vote => {
const client = require("../index")

let name = client.user.tag 
const userID = vote.user
const user = client.users.cache.get(userID)
  console.log('User Voted For The Bot send logs in log server!')
    const VoterMessage = new Discord.MessageEmbed()
        .setTitle(`Vote Logs`)
        .setDescription(`${user.tag} \`(ID:${userID})\` Just Voted`)
        .addField(`*Want to vote for SmartWiki?*`, `[Click Here](https://top.gg/bot/762745762777006080/vote)`)
        .setColor("GREEN")
        .setFooter(`© SmartWiki`)
        .setThumbnail("https://cdn.discordapp.com/attachments/776925179947384884/808369542648561705/standard.gif")
        .setTimestamp(Date.now())
        
    const webhook = new Discord.WebhookClient("810902405109645352","8LTHGxqPK4IdbYp8-DkZhkRCFTus33k4nLWp2W82GuWkf0JTAc4rOLIJ6PsZype2MHRC");
webhook.send(VoterMessage).catch((e) => {} )

const u = client.users.cache.get(vote.user); 
  
const voteembed = new Discord.MessageEmbed()
.setTitle("Thanks for Voting!!")
.setColor("RED")
.setDescription(`Can you please vote for me again in 12 hours?`)
.setThumbnail("https://cdn.discordapp.com/attachments/776925179947384884/808369542648561705/standard.gif")
.addField(`Vote Link`, `To vote for me again, Please follow this link \n **[Click here to vote for me](https://top.gg/bot/762745762777006080)**`)
if (u) u.send(voteembed).catch((e) => {} )

})
