const Discord = require("discord.js");
const fs = require("fs");

const base = require('./nsfw-base')

const akaneko = require('akaneko');

module.exports.run = async (client,message,args,prefix,player) => {
    if(!message.channel.nsfw) {
        return message.reply("Этот канал не поддерживает nsfw контент")
    } else {
        const name = "Gif"
        const image = await akaneko.nsfw.gifs();
        base.nsfw_base(name,image,message)
    }
};

module.exports.help = {
    name: "hentaigif",
    // aliases: [""]
};