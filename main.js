const discord = require('discord.js');
const fs = require('fs');
const client =new discord.Client({
    intents: [
        "Guilds",
        "GuildMessages",
        "GuildVoiceStates",
        "MessageContent"
    ]
});
const { SpotifyPlugin } = require("@distube/spotify");
const { YtDlpPlugin } = require("@distube/yt-dlp");
const { token } = require('./config.json');
const { DisTube } = require("distube");

client.commands = new discord.Collection();

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


client.DisTube = new DisTube(client, {
    searchSongs: 5,
	searchCooldown: 30,
	leaveOnEmpty: false,
	leaveOnFinish: false,
	leaveOnStop: false,
    plugins: [new SpotifyPlugin()],
    plugins: [new YtDlpPlugin({ update: true })],

});



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

client.DisTube.on("PlaySong", (queue, song) => {
    queue.message.channel.send("Joue Acutuellement: " + song.name)
})

client.login(process.env.TOKEN);
