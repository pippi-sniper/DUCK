const http = require('http');
http
    .createServer(function(req, res) {
        res.write('HAHAHAHAHA');
        res.end();
    })
    .listen(8080);

const Discord = require('discord.js');
const client = new Discord.Client();
const cron = require('node-cron')
const lainan = require("lainan-api");
const prefix = '>>';

client.on('ready', ready => {
    console.log("restart!!!");
});

client.on('guildMemberAdd', member => {
    client.channels.cache.get('781166137039388704').send(
        new Discord.MessageEmbed()
            .setColor('#FFD700')
            .setTitle('Welcome!')
            .setDescription(`<@${member.id}>さんがDUCKにやって来ました！！`)
    );
    member.roles.add('781174285703708704');
});

client.on('message', async message => {
    var member;
    const [command, mention, rea] = message.content.slice(prefix.length).split(' ');
    switch(command){
        case 'bam':
            if(message.author.id !== '489012602182041601') return;
            if (message.mentions.members.size !== 1) return;
            member = message.mentions.members.first();
            member.send('あなたはkickされました(このkickはネタです)\n```Reason：' + rea + '```\nhttps://discord.gg/ahNGUW3WDy');
            setTimeout(() => {
	            member.kick();
	        }, 1000)
            break;
        case 'kick':
            if(message.author.id !== '489012602182041601') return;
            if (message.mentions.members.size !== 1) return;
            member = message.mentions.members.first();
            member.kick({reason:rea});
            break;
        case 'ban':
            if(message.author.id !== '489012602182041601') return;
            if (message.mentions.members.size !== 1) return;
            member = message.mentions.members.first();
            member.ban({reason:rea});
            break;
    }
})

client.on("message", message => {
    if (message.author.id == client.user.id) return;
    lainan.message(message, (reaction) => {
        if (!reaction.responder_bool.IsAuto_search) {
            message.channel.send(reaction.reaction);
        };
    });
});


client.login(process.env.token);
