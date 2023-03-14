module.exports = {
    name: 'resume',
    aliases: ['resume', 'unpause'],
    inVoiceChannel: true,
    run: async (client, message) => {
      const queue = client.distube.getQueue(message)
      if (!queue) return message.channel.send(`${client.emotes.error} | il n'y a rien dans la file d'attente`)
      if (queue.paused) {
        queue.resume()
        message.channel.send('reprise de la musique !')
      } else {
        message.channel.send(" n'est pas en pause !")
      }
    }
  }
  module.exports.help = {
    name: "resume"
}