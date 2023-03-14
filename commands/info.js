const discord = require("discord.js");

module.exports.run = async (client, message, args ) => {
message.channel.send ("liste des commandes : ");
message.channel.send("join \n leave \n pause\nping\nplay + musique/URL\nplaynext + musique/URL\nfile\nreapeat + off/musique/file\nresume\nshuffle\nskip\nstop\nvolume + valeur entre 0 et 100");
}

module.exports.help = {
    name: "info"
}