module.exports = {
   name: "censor",
   aliases: ["wordcensor", "word-censor", "censor-word"],
   description: "censor words",
   run: async(client, message, args) => {
   if (!args[0]) return message.channel.send("Please Provide Message To Censor!");

const {
    data
} = await (require("axios").default).get(`https://www.purgomalum.com/service/json?text=${encodeURI(args.join("+"))}`, {
    responseType: "json"
});

if (!data || !data.result) return message.channel.send("Unable To Censor!");

return message.channel.send(data.result, {
    code: "diff"
});
}}