module.exports = {
    name: 'volume',
    aliases: ['v', 'set', 'set-volume'],
    inVoiceChannel: true,
    run: async (client, message, args) => {
      const queue = client.distube.getQueue(message)
      if (!queue) return message.channel.send(`${client.emotes.error} | il n'y a rien à la file d'attente !`)
      const volume = parseInt(args[0])
      if (isNaN(volume)) return message.channel.send(`${client.emotes.error} | entrez un nombre valide !`)
      queue.setVolume(volume)
      message.channel.send(`${client.emotes.success} | niveau de volume à \`${volume}\``)
    }
  }

module.exports.help = {
    name : 'volume'
}