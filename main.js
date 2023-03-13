// require/ nécesssitée
const discord = require('discord.js');
const fs = require('fs');
const https = require('https-proxy-agent');
const { SpotifyPlugin } = require('@distube/spotify');
const { YtDlpPlugin } = require('@distube/yt-dlp');
const { token } = require('./botconfig/config.json');
const { DisTube } = require('distube');
const filters = require(`./botconfig/filters.json`);

// paramétrage constantes
const client =new discord.Client({
    intents: [
        "Guilds",
        "GuildMessages",
        "GuildVoiceStates",
        "MessageContent"
    ]
});
const proxy = 'http://123.123.123.123:8080';
const agent = https(proxy);

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


client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    leaveOnFinish: true,
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
/*
DisTube.on('playSong', (queue, song) =>
        queue.textChannel?.send(
            `Playing \`${song.name}\` - \`${
                song.formattedDuration
            }\`\nRequested by: ${song.user}\n${status(queue)}`,
        ),
    )
      
*/

client.login(token);
