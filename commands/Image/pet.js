const { createCanvas, loadImage } = require('canvas');
const GIFEncoder = require('gifencoder');
const request = require('node-superfetch');
const path = require('path');
const frameCount = 10;
const { streamToArray } = require('../../utils/Util');
const config= require("../../config.json")
const emotes = require('../../configs/emotes.json');
const { centerImagePart } = require('../../utils/Canvas');
module.exports = {
    name: 'pet',
    memberName: 'pet',
    description: 'Pets an image or a user\'s avatar.',
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (msg,message,{ image }) => {


        try{
        

        let pfp = message.mentions.users.first()?.displayAvatarURL({ format: 'png', size: 128 }) || message.author?.displayAvatarURL({ format: 'png', size: 128 }) 

        const { body } = await request.get(pfp);
        const data = await loadImage(body);
        const encoder = new GIFEncoder(112, 112);
        const canvas = createCanvas(112, 112);
        const ctx = canvas.getContext('2d');
        const stream = encoder.createReadStream();

        encoder.start();
        encoder.setRepeat(0);
        encoder.setDelay(20);
        encoder.setQuality(200);
        encoder.setTransparent('#000000');
        let squish = 0;
        for (let i = 0; i < frameCount; i++) {
            const frameID = `frame_${i.toString().padStart(2, '0')}.png`;
            const frame = await loadImage(path.join(__dirname, '..', '..', 'assets', 'images', 'pet', frameID));
            const { x, y, width, height } = centerImagePart(data, 75, 75, 27, 38);
            ctx.drawImage(data, x, y + squish, width, height - squish);
            ctx.drawImage(frame, 0, 0);
            encoder.addFrame(ctx);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (i + 1 > frameCount / 2) squish -= 4;
            else squish += 4;
        }
        encoder.finish();
        const buffer = await streamToArray(stream);
        return message.channel.send({ files: [{ attachment: Buffer.concat(buffer), name: 'pet.gif' }] });
    } catch (err) {
        return message.channel.send(`${emotes.error}Oh No Oh NO oH NO NO NO NO NO.....`).then((msg) => {
            setTimeout(() => {
                msg.edit(`${emotes.error}An Unexpected Error Occured: **${err}** \nRun \`${config.prefix}links\` to join the support server for support`);
            }, 3000)
    })
}
    }}
