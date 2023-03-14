module.exports = {
    name: 'pause',
    aliases: ['pause', 'hold'],
    inVoiceChannel: true,
    run: async (client, message) => {
      const queue = client.distube.getQueue(message)
      if (!queue) return message.channel.send(`${client.emotes.error} | Il n'y a rien dans la file d attente`)
      if (queue.paused) {
        queue.resume()
        return message.channel.send('Reprise de la musique :')
      }
      queue.pause()
      message.channel.send('Pause !')
    }
  }
  module.exports.help = {
    name: "pause"
}