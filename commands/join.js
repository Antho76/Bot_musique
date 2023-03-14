const { discord } = require('discord.js')

module.exports = {
  name: 'join',
  aliases: ['move'],
  run: async (client, message, args) => {
    let voiceChannel = message.member.voice.channel
    if (args[0]) {
      voiceChannel = await client.channels.fetch(args[0])
      if (!discord.VoiceBasedChannelTypes.includes(voiceChannel?.type)) {
        return message.channel.send(`${client.emotes.error} | ${args[0]} le type de channel ou vous etes ne peut etre joinable`)
      }
    }
    if (!voiceChannel) {
      return message.channel.send(
        `${client.emotes.error} | vous devez rejoindre un channel en premier !`
      )
    }
    client.distube.voices.join(voiceChannel)
  }
}
module.exports.help = {
  name: "join"
}