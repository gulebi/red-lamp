const Discord = module.require("discord.js");
const fs = require("fs");

const { AudioFilters } = require("discord-player");

module.exports.run = async (client,message,args,prefix,player) => {
    const queue = player.getQueue(message.guildId);
    if (!queue || !queue.playing) return void message.reply("❌ |  Музыка не воспроизводится!");

    const effectName = 'chipmunk'

    AudioFilters.define("chipmunk", "atempo=3/4,asetrate=44100*4/3");

    const effectModeStrCond = queue.getFiltersEnabled()[0]

    let effectModeBoolean = false
    let effectEnabled = 'false'

    switch (true) {
        case (effectModeStrCond !== effectName) :
            effectModeBoolean = true
            effectEnabled = 'true'
            break;
        case (effectModeStrCond == effectName) :
            effectModeBoolean = false
            effectEnabled = 'false'
            break;
    }

    await queue.setFilters({ 'chipmunk': effectModeBoolean });

    if (queue.getFiltersEnabled()[0] == effectName || queue.getFiltersEnabled()[0] == undefined) {
        message.reply(`Режим эффекта изменён на | ${effectEnabled}`)
    } else {
        message.reply("❌ | Не удалось обновить режим эффекта!")
    }
};

module.exports.help = {
    name: "chipmunk",
    aliases: ["chip"]
};