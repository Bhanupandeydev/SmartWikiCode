const Discord = require("discord.js"); 

module.exports = {
    name: "tictactoe",
    timeout: 10,
    description: "Play tictactoe to someone!",
    usage: "tictactoe <@user>",
    run: async (client, message, args) => {
    const opponent = message.mentions.users.first();

if (!opponent) return message.channel.send(`Please mention who you want to challenge at tictactoe.`);

const { TicTacToe } = require('weky')
const game = new TicTacToe({
    message: message,
    opponent: opponent, //opponent
    xColor: 'red', //x's color
    oColor: 'blurple', //zero's color
    xEmoji: '❌',  //the x emoji
    oEmoji: '0️⃣' ,//the zero emoji
})
game.start()
}}