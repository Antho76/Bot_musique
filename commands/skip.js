module.exports = {
    name: 'skip',
    inVoiceChannel: true,
    run: async (client, message) => {
      const queue = client.distube.getQueue(message)
      if (!queue) return message.channel.send(`${client.emotes.error} | il n'y a rien dans la file d'attente `)
      try {
        const song = await queue.skip()
        message.channel.send(`${client.emotes.success} | Skip !  joue actuellement :\n${song.name}`)
      } catch (e) {
        message.channel.send(`${client.emotes.error} | ${e}`)
      }
    }
  }

  module.exports.help = {
    name: "skip"
}