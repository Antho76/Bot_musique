const discord = require("discord.js");

module.exports.run = async (client, message, args ) => {
message.channel.send ("liste des commandes : ");
message.channel.send(
   "join \n"+
   "leave\n"+
   "pause\n"+
   "ping\n"+
   "play + musique/URL\n"+
   "playnext + musique/URL\n"+
   "file\n"+
   "reapeat + off/musique/file\n"+
   "resume\n"+
   "shuffle\n"+
   "skip\n"+
   "stop\n"+
   "volume + valeur entre 0 et 100"
   );
}

module.exports.help = {
    name: "info"
}
