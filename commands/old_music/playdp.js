const Discord = require("discord.js");
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "DIRECT_MESSAGES", "GUILD_VOICE_STATES"] })
const fs = require("fs");

const { Player } = require("discord-player");
const player = new Player(client);

module.exports.run = async (client,message,args,prefix) => {
    if (!args[0]) return message.channel.send(`Please enter a valid search ${message.author}... try again ? ❌`);

    const res = await player.search(args.join(' '), {
        requestedBy: message.member,
        // searchEngine: QueryType.AUTO
    });

    if (!res || !res.tracks.length) return message.channel.send(`No results found ${message.author}... try again ? ❌`);

    const queue = await player.createQueue(message.guild, {
        metadata: message.channel
    });

    try {
        if (!queue.connection) await queue.connect(message.member.voice.channel);
    } catch {
        await player.deleteQueue(message.guild);
        return message.channel.send(`I can't join the voice channel ${message.author}... try again ? ❌`);
    }

    await message.channel.send(`Loading your ${res.playlist ? 'playlist' : 'track'}... 🎧`);

    res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

    if (!queue.playing) await queue.play();
};

module.exports.help = {
    name: "playdp",
    // aliases: [""]
};