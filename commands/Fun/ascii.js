const figlet = require('figlet');
const config= require("../../config.json")
const emotes = require('../../configs/emotes.json');
module.exports = {
    name: "ascii",
    description: "Converts text to ascii",
    group: "fun",

    async run (client, message, args){
        if(!args[0]) return message.channel.send('Please provide some text');
        
        msg = args.join(" ");
        try{
        figlet.text(msg, function (err, data){
            if(err){
                console.log('Something went wrong');
                console.dir(err);
            }
            if(data.length > 2000) return message.channel.send('Please provide text shorter than 2000 characters')

            message.channel.send('```' + data + '```')
        })
    } catch (err) {
        return message.channel.send(`${emotes.error}Oh No Oh NO oH NO NO NO NO NO.....`).then((msg) => {
            setTimeout(() => {
                msg.edit(`${emotes.error}An Unexpected Error Occured: **${err}** \nRun \`${config.prefix}links\` to join the support server for support`);
            }, 3000)
    })
}
    }
}