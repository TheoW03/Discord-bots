const googleIt = require('google-it')

const { Client, Intents, Message, MessageEmbed, DiscordAPIError, MessageActionRow, MessageButton } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const fs = require('fs');
const { ADDRGETNETWORKPARAMS } = require('dns');
const { parse } = require('path');
client.on("ready", () => {
    client.user.setActivity(".help for commands", { type: "PLAYING" });
});

function pemdas(equation) {
    let arrayTokens = equation.split(' ');
    let stack = [];
    let OP = ["(", ")", "^", "*", "/", "+", "-"]; //array of operators
    let temp = "";

    for (let i = 0; i < arrayTokens.length; i++) {
        let s = OP.toString();
        //if no op
        if (!s.includes(arrayTokens[i])) {
            temp += arrayTokens[i] + " ";
        } else if (arrayTokens[i] == "(") { //if n+(1+1)
            stack.push(arrayTokens[i]);
        } else if (arrayTokens[i] == ")") { //when arrives at ()
            while (stack.length != 0 && stack[stack.length - 1] != "(") {
                temp += stack.pop() + " ";

            }
            stack.pop();
        } else {
            //if empty loops until PEMDAS is acheived
            while (stack.length != 0 && OrderOfOp(arrayTokens[i]) <= OrderOfOp(stack[stack.length - 1])) {
                temp += stack.pop() + " ";
            }
            stack.push(arrayTokens[i]);
        }
    }
    while (stack.length != 0) {
        temp += stack.pop() + " ";
    }
    temp = temp.replace("(", "");
    return temp;

}
function OrderOfOp(op) {
    if (op == "+" || op == "-") {
        return 1;
    }
    if (op == ("/") || op == "*") {
        return 2;
    }
    if (op == "^") {
        return 3;
    }

    return -1;
}
function solve(infix) {
    infix = infix.replace(/\s\s+/g, ' ');
    let arrayTokens = infix.toString().split(' ');
    let s = [];
    let OP = ["(", ")", "^", "*", "/", "+", "-"]; //array of operators
    console.log(arrayTokens)
    for (let i = 0; i < arrayTokens.length; i++) {
        if (!OP.includes(arrayTokens[i])) {
            s.push(parseInt(arrayTokens[i]))
        } else {
            let a = s.pop();
            let b = s.pop();
            if (arrayTokens[i] == "+") {
                let an = a + b;
                s.push(an);
            } else if (arrayTokens[i] == "*") {
                let an = a * b;
                s.push(an);
            } else if (arrayTokens[i] == "/") {
                let an = a / b;
                s.push(an);
            } else if (arrayTokens[i] == "-") {
                let an = b - a;
                s.push(an);
            } else if (arrayTokens[i] == "^") {
                let an = Math.pow(b, a);
                s.push(an);
            }
        }
        // return answer;
    }
    return s[s.length-2].toString();

}
//on message evemt
/**
 * this method runs if a message is sent
 * .mim
 * .math
 */
client.on("message", message => {
    if (message.author == client.user) {
        return;
    }
    //embed
    if (message.content.startsWith(".embedTest")) {
        var a = message.content.substring(10);
        var embed = new MessageEmbed()
            .setTitle("hello")
            .setDescription("testing")
            .addField("test", message.content)
        message.channel.send({ embeds: [embed] });

    }

    //.help command
    if (message.content.startsWith(".help")) {
        try {
            const data = fs.readFileSync('MathBot/.help.txt', 'utf8')
            var embed = new MessageEmbed()
                .setTitle("help")
                .setDescription("this is a list of commands")
                .addField("commands", ">>> " + data)
            message.channel.send({ embeds: [embed] });
        } catch (err) {
            message.channel.send("this doesnt work");
        }
    }
    //.math command
    if (message.content.startsWith(".math")) {
        let t = message.content.substring(6);
        // let me = add(t);sss
        let me = pemdas(t);

        message.channel.send(solve(me));
        return;
    }
    //.mim command
    if (message.content.startsWith(".mim")) {
        var m = message.content
        var t = "";
        for (var i = 0; i < m.length; i++) {
            var a = m.charAt(i);
            if (i % 2 == 0) {
                a = a.toUpperCase()
            }
            t = t + a;
        }
        t = t.substring(4);
        message.channel.send(t);
    }
    if (message.content.startsWith(".scream")) {
        const data = fs.readFileSync('.scream.txt', 'utf8')
        googleIt({ 'query': '1 + 1' }).then(results => {
            results.forEach(function (item, index) {
                message.channel.send((index + 1) + ": " + item.title, "<" + item.link + ">");
            });
        }).catch(e => {
            // any possible errors that might have occurred (like no Internet connection)
        })

    }



})
require('dotenv').config()
client.login(process.env.MATHBOT);