const Discord = require("discord.js");
const fs = require("fs");

const { Player, QueryType, QueueRepeatMode } = require("discord-player");

module.exports.run = async (client,message,args,prefix,player) => {
    const queue = player.getQueue(message.guildId);
    if (!queue || !queue.playing) return void message.reply("❌ | No music is being played!");
    const currentTrack = queue.current;
    const success = queue.skip();
    if (success) {
        message.reply(`✅ | Skipped **${currentTrack}**!`)
    } else {
        message.reply("❌ | Something went wrong!")
    }
};

module.exports.help = {
    name: "skip",
    aliases: ["s"]
};