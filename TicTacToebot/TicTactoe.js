const { Client, Intents, Message, MessageEmbed, DiscordAPIError, MessageActionRow, MessageButton, Permissions, Emoji } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
class gameBoard {
    constructor(Board, player1, player2) {
        this.Board = Board;
        this.player1 = player1;
        this.player2 = player2;
    }
    vsFunc() {
        return this.player1 + " vs " + this.player2;
    }
    addTo2Dar(row, column, turn) {
        if (turn % 2 == 0) {
            if (this.Board[row][column] == ":white_medium_square:") {
                this.Board[row][column] = ":regional_indicator_x:";
            }
        } else {
            if (this.Board[row][column] == ":white_medium_square:") {
                this.Board[row][column] = ":regional_indicator_o:";
            }
        }

    }
    checkRow(row, column) {
        return (this.Board[row][column] == ":white_medium_square:")

    }
    getsect(row, column) {
        return this.Board[row][column]
    }
    getTurn(turns) {
        if (turns % 2 == 0) {
            return this.player1;
        } else {
            return this.player2;
        }
    }
    win() {
        let checkHorzontal = "";
        let checkVerticle1 = "";
        let checkVerticle2 = "";
        let checkVerticle3 = "";
        let i = 0;
        let i2 = 2;
        let checkDiangol1 = "";
        let checkDiangol2 = "";
    
        
        for (let r = 0; r < this.Board.length; r++) {
            checkVerticle1 += this.Board[r][0];
            checkVerticle2 += this.Board[r][1];
            checkVerticle3 += this.Board[r][2];
            checkDiangol1 += this.Board[r][i2];
            checkDiangol2 += this.Board[r][i];
            console.log(checkVerticle1, checkVerticle2, checkVerticle3)
            for (let c = 0; c < this.Board[r].length; c++) {
                checkHorzontal += this.Board[r][c];
            }
            if (checkHorzontal == ":regional_indicator_x::regional_indicator_x::regional_indicator_x:") {
                return this.player1 + " wins";
            }
            if (checkHorzontal == ":regional_indicator_o::regional_indicator_o::regional_indicator_o:") {
                return this.player2 + " wins";
            }
            checkHorzontal = "";
            i2--;
            i++;
        }
        if (!checkVerticle1.indexOf(":white_medium_square:") || !checkVerticle2.indexOf(":white_medium_square:") || !checkVerticle1.indexOf(":white_medium_square:")) {
            if (checkVerticle1 == ":regional_indicator_x::regional_indicator_x::regional_indicator_x:") {
                return this.player1 + " wins";
            }
            if (checkVerticle2 == ":regional_indicator_x::regional_indicator_x::regional_indicator_x:") {
                return this.player1 + " wins";
            }
            if (checkVerticle3 == ":regional_indicator_x::regional_indicator_x::regional_indicator_x:") {
                return this.player1 + " wins";
            }
        }
        if (!checkVerticle1.indexOf(":white_medium_square:") || !checkVerticle2.indexOf(":white_medium_square:") || !checkVerticle1.indexOf(":white_medium_square:")) {
            if (checkVerticle1 == ":regional_indicator_o::regional_indicator_o::regional_indicator_o:") {
                return this.player2 + " wins";
            }
            if (checkVerticle2 == ":regional_indicator_o::regional_indicator_o::regional_indicator_o:") {
                return this.player2 + " wins";
            }
            if (checkVerticle3 == ":regional_indicator_o::regional_indicator_o::regional_indicator_o:") {
                return this.player2 + " wins";
            }

        }
        if (checkDiangol1 == ":regional_indicator_x::regional_indicator_x::regional_indicator_x:") {
            return this.player1 + " wins";
        }
        if (checkDiangol1 == ":regional_indicator_o::regional_indicator_o::regional_indicator_o:") {
            return this.player2 + " wins";
        }
        if (checkDiangol2 == ":regional_indicator_x::regional_indicator_x::regional_indicator_x:") {
            return this.player1 + " wins";
        }
        if (checkDiangol2 == ":regional_indicator_o::regional_indicator_o::regional_indicator_o:") {
            return this.player2 + " wins";
        }
        
        return "";

    }


    toString() {
        let temp = "";
        for (let r = 0; r < this.Board.length; r++) {
            for (let c = 0; c < this.Board[r].length; c++) {
                if ((c + 1) != this.Board[r].length) {
                    temp += this.Board[r][c];
                } else {
                    temp += this.Board[r][c] + "\n ";
                }

            }
        }
        return temp;

    }
}
var rows = 0;
var column = 0;
var gameOB;
var turns = 0;
client.on('interactionCreate', interaction => {
    if (!interaction.isButton()) return;
    if (interaction.customId == "back") {
        if (column == 0 && rows == 0) {
            return;
        }
        if (column == 0) {
            column = 2;
            rows--;
        } else {
            column--;
        }
        let newEmbed = new MessageEmbed()
            .setTitle("tic tact toe")
            .setDescription(gameOB.vsFunc())
            .addField("game", gameOB.toString())
            .addField("turn", gameOB.getTurn(turns))
            .addField("where on board", " row: " + (rows + 1) + " column: " + (column + 1))
            .addField("where you on board", gameOB.getsect(rows, column));
        // interaction.embeds[0].fields[2] = t+"\n"+me;
        interaction.update({ embeds: [newEmbed] });

    }
    if (interaction.customId == "forward") {
        if (column == 2 && rows == 2) {
            return;
        }

        if (column == 2) {
            column = 0;
            rows++;
        } else {
            column++;
        }
        let newEmbed = new MessageEmbed()
            .setTitle("tic tact toe")
            .setDescription(gameOB.vsFunc())
            .addField("game", gameOB.toString())
            .addField("turn", gameOB.getTurn(turns))
            .addField("where on board", " row: " + (rows + 1) + " column: " + (column + 1))
            .addField("where you on board", gameOB.getsect(rows, column));
        // interaction.embeds[0].fields[2] = t+"\n"+me;
        interaction.update({ embeds: [newEmbed] });

    }
    if (interaction.customId == "enter") {
        if (!gameOB.checkRow(rows, column)) {
            return;
        }
        gameOB.addTo2Dar(rows, column, turns)
        rows = 0;
        column = 0;
        turns++;
        let PotenWInner = gameOB.win()
        console.log(PotenWInner)

        if (PotenWInner != "") {
            let newEmbed = new MessageEmbed()
                .setTitle("tic tact toe")
                .setDescription(gameOB.vsFunc())
                .addField("winner", PotenWInner);

            interaction.update({ embeds: [newEmbed] });
            return;

        }
        let newEmbed = new MessageEmbed()
            .setTitle("tic tact toe")
            .setDescription(gameOB.vsFunc())
            .addField("game", gameOB.toString())
            .addField("turn", gameOB.getTurn(turns))
            .addField("where on board", " row: " + (rows + 1) + " column: " + (column + 1))
            .addField("where you on board ", gameOB.getsect(rows, column));

        // interaction.embeds[0].fields[2] = t+"\n"+me;
        interaction.update({ embeds: [newEmbed] });

    }


});

var board = [
    [":white_medium_square:", ":white_medium_square:", ":white_medium_square:"],
    [":white_medium_square:", ":white_medium_square:", ":white_medium_square:"],
    [":white_medium_square:", ":white_medium_square:", ":white_medium_square:"]
];
var boardControls = [[], [], []]

client.on("ready", () => {
    client.user.setActivity(".tictactoe player1 vs player2", { type: "PLAYING" });
});
client.on("message", message => {
    if (message.author == client.user) {
        return;
    }
    if(message.content.startsWith(".ping")){
        message.channel.send("pong");
    }
    if (message.content.startsWith(".tictactoe")) {
        let t = message.content.substring(10);
        let players = t.split("vs");
        gameOB = new gameBoard(board, players[0], players[1])
        var embed = new MessageEmbed()
            .setTitle("TITLE")
            .setDescription(players[0] + "vs" + players[1])
            .addField("game", gameOB.toString())
            .addField("turn", gameOB.getTurn(turns))
            .addField("where on board", " row: " + (rows + 1) + " column: " + (column + 1))
            .addField("where you on board ", gameOB.getsect(rows, column));

        let controlsID = ["back", "enter", "forward"];
        let controls = ["◀", "⬆", "▶"];
        let row = new MessageActionRow()
        for (let i = 0; i < controls.length; i++) {
            let t = i.toString()
            row.addComponents(
                new MessageButton()
                    .setCustomId(controlsID[i])
                    .setLabel(controls[i])
                    .setStyle('PRIMARY'),
            );
        }
        message.channel.send({ embeds: [embed], components: [row] });
    }

});
require('dotenv').config()
client.login(process.env.TOKENTIC);
