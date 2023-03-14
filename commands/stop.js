module.exports = {
    name: 'stop',
    aliases: ['disconnect', 'leave'],
    inVoiceChannel: true,
    run: async (client, message) => {
      const queue = client.distube.getQueue(message)
      if (!queue) return message.channel.send(`${client.emotes.error} | il n'y a rien à la file d'attente`)
      queue.stop()
      message.channel.send(`${client.emotes.success} | Stoppé !`)
    }
  }

module.exports.help = {
    name: "stop"
}