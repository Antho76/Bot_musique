module.exports = {
    name: 'shuffle',
    inVoiceChannel: true,
    run: async (client, message) => {
      const queue = client.distube.getQueue(message)
      if (!queue) return message.channel.send(`${client.emotes.error} | il n'y a rien dans la file d'attente`)
      queue.shuffle()
      message.channel.send("file d'attente mélangée")
    }
  }
  module.exports.help = {
    name: "shuffle"
  }