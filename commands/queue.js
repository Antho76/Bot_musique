module.exports = {
    name: 'queue',
    aliases: ['q'],
    run: async (client, message) => {
      const queue = client.distube.getQueue(message)
      if (!queue) return message.channel.send(`${client.emotes.error} | il n'y a rien a la file d'attente!`)
      const q = queue.songs
        .map((song, i) => `${i === 0 ? 'joue:' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)
        .join('\n')
      message.channel.send(`${client.emotes.queue} | **file d'attente**\n${q}`)
    }
  }
module.exports.help = {
    name: "file"
}