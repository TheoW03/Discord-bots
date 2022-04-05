const fs = require('fs')
class voters {
    DidVote = false;
    constructor(resultTheyVoted, voter) {
        this.voter = voter
        this.resultTheyVoted = resultTheyVoted;
    }
    getResult() {
        return this.resultTheyVoted;
    }
    getDidVote() {
        return this.DidVote
    }
    setDidVote() {
        this.DidVote = true
    }
    getUser() {
        return this.user;
    }
    toString() {
        return this.resultTheyVoted + this.voter
    }
}

var ar = []
var results = []
const { Client, Intents, Message, MessageEmbed, DiscordAPIError, MessageActionRow, MessageButton, Permissions } = require('discord.js');
const { resultStatsSelector } = require('google-it/lib/utils');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

var arrInteractUsers = []
var arr = []
var i2 = 0;
var t = ""
var closePoll=false
client.on('interactionCreate', interaction => {
    let me = "";
    if (!interaction.isButton()) return;
    // if (arrInteractUsers.includes(interaction.users)) {
    //     return;
    // }
    if(closePoll){
        return;
    }


    for (let i = 0; i < ar.length; i++) {
        if (ar[i] == interaction.customId) {
            results[i] += 1;
        }
    }
    for (let i = 0; i < results.length; i++) {
        me = me + ar[i] + ": " + results[i] + "\n"
    }
    const message = interaction.message;
    // interaction.update(t+"\n"+me)
    let newEmbed = new MessageEmbed()
        .setTitle("poll")
        .setDescription("number of voters")
        .addField(t,me);
    // interaction.embeds[0].fields[2] = t+"\n"+me;
    interaction.update({embeds:[newEmbed]});
    arrInteractUsers[i2] = interaction.users;
    i2++;
});

/**
 * runs if message
 * .poll
 * .close
 */
client.on("message", message => {
    let row = new MessageActionRow()
    if (message.author == client.user) {
        return;
    }
    //start poll
    if (message.content.startsWith(".poll")) {
        if(closePoll === true){
            closePoll = false;
            i2 = 0;
        }
        t = message.content.substring(6)
        ar = t.split(" or ")
        
        for (let i = 0; i < ar.length; i++) {
            results[i] = 0;
            row.addComponents(
                new MessageButton()
                    .setCustomId(ar[i])
                    .setLabel(ar[i])
                    .setStyle('PRIMARY'),
            );

        }
        let me = ""
        for (let i = 0; i < results.length; i++) {
            me = me + ar[i] + ": " + results[i] + "\n"
        }
        var embed = new MessageEmbed()
            .setTitle("poll")
            .setDescription("number of voters")
            .addField(t, me)
        try{
            message.channel.send({ embeds: [embed], components: [row] })
        }catch(err){
            message.channel.send("too big limit amt = 5");
        }
        
        // message.channel.send({ content:t+"\n"+me, components: [row] });
    }
    //close poll
    if(message.content.startsWith(".close")){
        closePoll = true;
        let temp = ""
        let arrOfTotals = []
        let amt = []
        let arrOfResults = []
        let i4 = 0;
        for(let i = 0; i < results.length;i++){
            let percent = (results[i] / i2) * 100;
            percent = Math.round(percent);
            arrOfTotals[i] = percent
            temp = temp +ar[i]+": " + results[i]+ "/"+ i2 + ": "+percent+"% \n";
            arrOfResults[i] = (percent/100)*12;
        }
        let Ind = 0;  
        let biggest = Math.max.apply(null, arrOfTotals)  
        let winner = ar[arrOfTotals.indexOf(biggest)]+ ": "+biggest+"%"+"\n";
        const allEqual = arrOfTotals => arrOfTotals.every(biggest => biggest === arrOfTotals[0])
        if(allEqual(arrOfTotals)){
            winner = "tie";
        }
        let t2 = "";
        let theTitle = "";
        let blueSquare = true
        let redSqure = false
        let orangeSquare = false

        console.log(arrOfResults.toString())
        for(let i = 0; i < arrOfResults.length;i++){
            theTitle += ar[i] +" "+ (Math.round((arrOfResults[i] / 12)*100)).toString() + '%';
            for(let i2 = 0; i2 < arrOfResults[i];i2++){
               
                
                if(blueSquare){
                    t2 += ":blue_square:";
                }
                if(redSqure){
                    t2 += ":red_square:";
                }
                if(orangeSquare){
                    t2 += ":orange_square:"; 
                }
            }
            //black square
            //TODO test when get home
            theTitle += "\t \t \t";
        
            if(arrOfResults[i]==0){
                // let sum = arrOfResults.sum() - 12;
                let sum = arrOfResults.reduce((a,b)=>a+b, 0) - 12;
                // for(let bla = 0; i < sum;i++){
                //     theTitle += "\t";
                //     t2 += ":black_medium_square:";
                // }
                // if(sum == 0){
                //     t2 += "\t \t \t";
                // }
            }
            if(blueSquare){
                blueSquare=false
                redSqure = true
            }else if(redSqure){
                redSqure = false
                orangeSquare = true
            }
            
            
        }
        
        var embed = new MessageEmbed()
           .setTitle("poll results")
           .setDescription("results of "+t)
           .addField("winner",winner)
           .addField(theTitle,t2);
        
        
        // fs.writeFile('C:\\Users\\jduda\\my-app\\src\\Tetx.txt', t+"\n"+temp, (err) => {
        //     if (err) throw err;
        // })
        message.channel.send({embeds: [embed]});

    }


});

require('dotenv').config()
client.login(process.env.TOKENPOLL);
