// require/ nécesssitée
const discord = require('discord.js');
const fs = require('fs');
const { SpotifyPlugin } = require('@distube/spotify');
const { DisTube } = require('distube');
const { EmbedBuilder } = require('discord.js');

//const filters = require(`./botconfig/filters.json`);
const config = require('./botconfig/config.json')

// paramétrage constantes
const client =new discord.Client({
    intents: [
        "Guilds",
        "GuildMessages",
        "GuildVoiceStates",
        "MessageContent"
    ]
});

client.emotes = config.emoji

client.commands = new discord.Collection();

//paramétrage secondaire
let spotifyoptions = {
    parallel: true,
    emitEventsAfterFetching: true,
  }
fs.readdir('./commands/', (err, files) => {
    if (err) console.log(err)

    let jsFile = files.filter(f => f.split('.').pop() === 'js');
    if (jsFile.length <= 0) {
        console.log("fichier introuvable");
        return;
    }


    jsFile.forEach((f,i) => {
        let props = require(`./commands/${f}`);
        client.commands.set(props.help.name, props);
    });
});

// definition des paramétre de musiques

client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    leaveOnFinish: false,
    emitAddSongWhenCreatingQueue: false, 
    plugins: [new SpotifyPlugin()]
})


// début du  code BOT 
client.on("ready", client => {
    console.log("Bot en ligne");
});

client.on("messageCreate", message => {
    if (message.author.bot || !message.guild) return;
    const prefix = "?";
    const args = message.content.slice(prefix.length).trim().split(/ +/g);

    if (!message.content.toLowerCase().startsWith(prefix)) return;
    
    const commande = args.shift().toLowerCase();
    console.log(commande)

    let commandFile = client.commands.get(commande);
    if (commandFile) commandFile.run(client, message, args);
});


//definition de constantes si inchangée
const status = queue =>
  `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.names.join(', ') || 'Off'}\` | Loop: \`${
    queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
  }\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``


// envvoie de message ou application de commande en fonction de l'état du bot
client.distube
  .on('playSong', (queue, song) => {
    const embed = new EmbedBuilder()
      .setColor(0x0099FF)
      .setTitle(`${song.name}`)
      .setURL(`${song.url}`)
      .setThumbnail(`${song.thumbnail}`)
      .addFields(
        { name: 'Origine : ', value: `${song.source}` },
        { name: '\u200B', value: '\u200B' },
        { name: 'Durée:', value: `${song.formattedDuration}` , inline: true },
        { name: 'Vues :', value: `${song.views}` , inline: true },
    )
    .setFooter(
      { text: `${status(queue)}` }
        ,
    )
	
    queue.textChannel.send({ embeds: [embed] })
    })
  .on('addSong', (queue, song) =>
    queue.textChannel.send(
      `${client.emotes.success} | ajout  ${song.name} - \`${song.formattedDuration}\` à la file d'attente par : ${song.user}`
    )
  )
  .on('addList', (queue, playlist) =>
    queue.textChannel.send(
      `${client.emotes.success} | ajout \`${playlist.name}\` playlist à la file d'attente\n${status(queue)}`
    )
  )
  .on('error', (channel, e) => {
    if (channel) channel.send(`${client.emotes.error} | une erreur à été rencontrée ${e.toString().slice(0, 1974)}`)
    else console.error(e)
  })
  .on('empty', channel => channel.send('le channel est complet ! '))
  .on('searchNoResult', (message, query) =>
    message.channel.send(`${client.emotes.error} Aucun résultat \`${query}\`!`)
  )
  .on('finish', queue => queue.textChannel.send("File d'attente terminée !"))
 

client.login(config.token);
