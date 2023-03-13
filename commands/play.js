// require/ nécesssitée
/*const discord = require('discord.js');
const fs = require('fs');
const https = require('https-proxy-agent');
const { SpotifyPlugin } = require('@distube/spotify');
const { YtDlpPlugin } = require('@distube/yt-dlp');
const { token } = require('./../botconfig/config.json');
const { DisTube } = require('distube');
const filters = require(`./../botconfig/filters.json`);
const proxy = 'http://123.123.123.123:8080';
const agent = https(proxy);



module.exports.run = async (client, message, args ) => {


	   let option = {
		member: message.member
	   }
		const voiceChannel =  message.member.voice.channel;
		if (voiceChannel) {
			await client.distube.play(voiceChannel, args.join(' '), option)
				
		} else {
			message.channel.send(
				"Tu dois d'abord rejoindre un channel !",
			);
		}

}

module.exports.help = {
    name: "play"
}*/

module.exports = {
	name: 'play',
	aliases: ['p'],
	inVoiceChannel: true,
	run: async (client, message, args) => {
	  const string = args.join(' ')
	  if (!string) return message.channel.send(`${client.emotes.error} | Please enter a song url or query to search.`)
	  client.distube.play(message.member.voice.channel, string, {
		member: message.member,
		textChannel: message.channel,
		message
	  })
	}
  }
  module.exports.help = {
    name: "play"
}