const emotes = require('../../configs/emotes.json')
const moment = require("moment")
const Discord = require("discord.js")
const config= require("../../config.json")
const prefix = config.prefix  
const db = require("quick.db")
module.exports = {
    name : 'clear',
    aliases: [ 'delete', 'slowprune', 'sd', 'slowdelete', 'purge'],
    category: 'moderation',
    description: 'Delete messages from this channel. Will not delete messages older than two (2) weeks.',
    run: async (client, message, [quantity]) => {

        if (!message.member.hasPermission(`MANAGE_MESSAGES`)) {
          return message.channel.send(`${emotes.error} You don't have the permissions to use this command [MANAGE_MESSAGES]!`)
      }
      
      if (!message.guild.me.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(
        "I need \`MANAGE_MESSAGES\` permission to run this command!"
      )

        quantity = Math.round(quantity);
    
        if (!quantity || quantity < 2 || quantity > 100){
          return message.channel.send(`${emotes.error} | ${message.author}, Please provide the quantity of messages to be deleted which must be greater than two (2) and less than one hundred (100)`);
        };
    
        return message.channel.bulkDelete(quantity, true)
        .then(async messages => {
           
          const count = messages.size;
          const _id = Math.random().toString(36).slice(-7);
          const uploadch = db.fetch(`modlog_${message.guild.id}`)
         if(!uploadch) return;

          messages = messages.filter(Boolean).map(message => {
            return [
              `[${moment(message.createdAt).format('dddd, do MMMM YYYY hh:mm:ss')}]`,
              `${message.author.tag} : ${message.content}\r\n\r\n`
            ].join(' ');
          });
    
          messages.push(`Messages Cleared on ![](${message.guild.iconURL({size: 32})}) **${message.guild.name}** - **#${message.channel.name}** --\r\n\r\n`);
          messages = messages.reverse().join('');
          var sChannel = message.guild.channels.cache.get(uploadch)
          if (!sChannel) return;
          const res = sChannel ? await sChannel.send(
            `BULKDELETE FILE - ${message.guild.id} ${message.channel.id}`,
            { files: [{ attachment: Buffer.from(messages), name: `bulkdlt-${_id}.txt`}]}
          ).then(message => [message.attachments.first().url, message.attachments.first().id])
          .catch(() => ['', null]) : ['', null];
          
          const url = (res[0].match(/\d{17,19}/)||[])[0];
          const id = res[1];

          message.channel.send(
            `Successfully deleted **${count}** messages from this channel!`,
            new Discord.MessageEmbed()
            .setColor('GREY')
            .setDescription([
              `[\`📄 View\`](${url ? `https://txt.discord.website/?txt=${url}/${id}/bulkdlt-${_id}`:''})`,
              `[\`📩 Download\`](${res[0]})`
            ].join('\u2000\u2000•\u2000\u2000'))
        )
        })
},
};

//      message.channel.send(`${emotes.error}oops An Unexpected Error Occured:` + err `\nRun \`${config.prefix}links\` to join the support server for help`);    }

//.catch(err => channel.send(`${emotes.error}Ooops An Unexpected Error Occured:` + err `\nRun \`${config.prefix}links\` to join the support server for help`));