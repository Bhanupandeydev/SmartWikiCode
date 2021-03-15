
const config= require("../../config.json")
const process = require('child_process');
module.exports = {
    name: "terminal",
    aliases: ['console', 'shell'],
        async run(client, message, args) {
            if(!config.dev.includes(message.author.id)) return message.channel.send("no u")            
const msg = await message.channel.send(`Please wait, this may take a white.`);
msg.delete({timeout: 4000});
process.exec(args.join(" ") , (error, stdout) => { let result = (stdout || error);
message.channel.send(result, { code: "asciidoc", split: "\n"}).catch(err => message.channel.send(err))
}) 

}


}