const { Client, Intents, Message, MessageEmbed, DiscordAPIError } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on("message", message => {
    if (message.author == client.user) {
        return;
    }
    
    //.mim command
    if (message.content.startsWith(".mimic")) {
        var m = message.content;
        var t = "";
        for (var i = 0; i < m.length; i++) {
            var a = m.charAt(i);
            if (i % 2 == 0) {
                a = a.toUpperCase()
            }
            t = t + a;
        }
        t = t.substring(6);
        message.channel.send(t);
        return;
    }
})

require('dotenv').config()
client.login(process.env.MIM)