const { stripIndents } = require('common-tags');
const request = require('node-superfetch');
const { shuffle, list } = require('../Fun/utility.js');
const types = ['multiple', 'boolean'];
const difficulties = ['easy', 'medium', 'hard'];
const choices = ['A', 'B', 'C', 'D'];

module.exports = {
    name: "quiz",
    aliases: ["guessgame", "guesstrivia"],
    timeout: 30,
    description: "Pick what type of quiz you want (multiple / boolean); then pick what level of difficulty you want (easy, medium, hard).",
    usage: "<multple/boolean> <easy/medium/hard>",
    run: async (client, message, args) => {

        let type = args[0];
    if(!types.includes(type)) return message.channel.send('Please provide the type of the quiz, either **multiple** or **boolean**.')
        let difficulty = args[1];
    if(!difficulties.includes(difficulty)) return message.channel.send('Please provide the difficulty of the quiz, can be **easy**, **medium,** or **hard**.')

        try {
			const { body } = await request
				.get('https://opentdb.com/api.php')
				.query({
					amount: 1,
					type,
					encode: 'url3986',
					difficulty
				});
			if (!body.results) return message.reply('Oh no, a question could not be fetched. Try again later!');
			const answers = body.results[0].incorrect_answers.map(answer => decodeURIComponent(answer.toLowerCase()));
			const correct = decodeURIComponent(body.results[0].correct_answer.toLowerCase());
			answers.push(correct);
			const shuffled = shuffle(answers);
			await message.reply(stripIndents`
				**You have 15 seconds to answer this question.**
				${decodeURIComponent(body.results[0].question)}
				${shuffled.map((answer, i) => `**${choices[i]}**. ${answer}`).join('\n')}
			`);
			const filter = res => res.author.id === message.author.id && choices.includes(res.content.toUpperCase());
			const messages = await message.channel.awaitMessages(filter, {
				max: 1,
				time: 15000
			});
			if (!messages.size) return message.reply(`Sorry, time is up! It was ${correct}.`);
			const win = shuffled[choices.indexOf(messages.first().content.toUpperCase())] === correct;
			if (!win) return message.reply(`Nope, sorry, it's ${correct}.`);
			return message.reply('Nice job! Thats right!');
		} catch (err) {
			return message.reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
		}

    }
}
