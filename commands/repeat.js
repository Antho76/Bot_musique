module.exports = {
    name: 'repeat',
    aliases: ['loop', 'rp'],
    inVoiceChannel: true,
    run: async (client, message, args) => {
      const queue = client.distube.getQueue(message)
      if (!queue) return message.channel.send(`${client.emotes.error} | il n'y a rien dans la playlist`)
      let mode = null
      console.log(args[0])
      if (args[0] === 'off' || args[0] === 'musique' || args[0] === 'file') {
      switch (args[0]) {
        case 'off':
          mode = 0
          break
        case 'musique':
          mode = 1
          break
        case 'file':
          mode = 2
          break
      }
    
    
      mode = queue.setRepeatMode(mode)
      mode = mode ? (mode === 2 ? "Répéter la file d'attente" : 'Répétition musique') : 'Off'
      message.channel.send(`${client.emotes.repeat} | repeat mode : \`${mode}\``)
    }
      else {
        message.channel.send("Le paramétre de commande est invalide ! (off, musique, file) ")
      }
    }

  }
  module.exports.help = {
    name: "repeat"
}