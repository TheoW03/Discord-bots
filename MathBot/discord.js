const { Client, Intents, Message, MessageEmbed, DiscordAPIError, MessageActionRow, MessageButton } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on("messageCreate", message => {
    if (message.author == client.user) {
        return;
    }
    console.log(message.content);

    if(message.content.includes(".ping")){
        message.channel.send({content: "hello world"})
    }
})
client.login(process.env.MATHBOT);
