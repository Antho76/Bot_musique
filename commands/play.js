module.exports = {
	name: 'play',
	aliases: ['p'],
	inVoiceChannel: true,
	run: async (client, message, args) => {
	  	const string = args.join(' ')
		const channel = message.member.voice.channel
	  	if (!string) return message.channel.send(`${client.emotes.error} | URL invalide`)
	  	if (!channel) {
			message.channel.send("rejoins un channel avant d'utiliser cette commande")

		}
		else {
			client.distube.play(channel, string, {
			member: message.member,
			textChannel: message.channel,
			message
	  		})
		}
	}
  }
  module.exports.help = {
    name: "play"
}