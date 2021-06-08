let randomWords = require('random-words');
const word = randomWords()
const { ShuffleGuess } = require('weky')
module.exports = {
	name: 'shuffleguess',
	aliases: ['guess', 'guesstheword', 'wordguess'],
	description: 'Start a guess the word game',
	usage: '',
	run: async (client, message, args) => {
const game = new ShuffleGuess({ 
 message: message, 
 word: word, //or a simple word 
 winMessage: "GG you won!", //message sent when user's message matches with the word 
 colorReshuffleButton: 'green', //color of the reshuffle button (regen) 
 messageReshuffleButton: 'reshuffle', //text of the reshuffle button (regen) 
 colorCancelButton: 'red', //color of the cancel button (exit, quit, stop) 
 messageCancelButton: 'cancel', //text of the cancel button 
 client: client }); 
 game.start();
}}