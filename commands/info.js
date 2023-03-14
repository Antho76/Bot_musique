const discord = require("discord.js");

module.exports.run = async (client, message, args ) => {
message.channel.send ("liste des commandes : ");
message.channel.send("join");
message.channel.send("leave");
message.channel.send("pause");
message.channel.send("ping");
message.channel.send("play + musique/URL");
message.channel.send("playnext + musique/URL");
message.channel.send("file");
message.channel.send("reapeat + off/musique/file");
message.channel.send("resume");
message.channel.send("shuffle");
message.channel.send("skip");
message.channel.send("stop");
message.channel.send("volume + valeur entre 0 et 100");
message.channel.send("Bot créé par Anthonin PAIN");
}

module.exports.help = {
    name: "info"
}