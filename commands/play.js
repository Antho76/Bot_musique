const discord = require("discord.js");
const { DisTube } = require("distube");


module.exports.run = async (client, message, args ) => {

    client.DisTube = new DisTube(client, {
        leaveOnStop: false,
        emitNewSongOnly: true,
        emitAddSongWhenCreatingQueue: false,
        emitAddListWhenCreatingQueue: false
    
    });


		const voiceChannel = message.member?.voice?.channel;
		if (voiceChannel) {
			distube.play(voiceChannel, args.join(' '), {
				message,
				textChannel: message.channel,
				member: message.member,
			});
		} else {
			message.channel.send(
				"Tu dois d'abord rejoindre un channel !",
			);
		}

}

module.exports.help = {
    name: "play"
}