require("dotenv").config();

const {Client} = require('discord.js')

const client = new Client({
    partials:['MESSAGE','REACTION']
});
const PREFIX = "$"

client.on('ready',()=>{
    console.log(`${client.user.tag} has logged in!`)
})

client.on('message',async (message)=>{

    if(message.author.bot) return;
    console.log(`[${message.author.tag}] : ${message.content} `)
    if(message.content==='hello'){
        message.channel.send('HELLO WORLD')
    }

    if(message.content.startsWith(PREFIX)){
        const [CMD_NAME,...args]= message.content
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/)

        if(CMD_NAME==='kick'){
        if(!message.member.hasPermission('KICK_MEMBERS'))
            return message.channel.send("You don't have permissions!")
            if(args.length===0)
            message.reply('please provide an ID')
            const member = message.guild.members.cache.get(args[0])
            if(member){
                member
                .kick()
                .then((member)=>{
                    message.channel.send(`${member} was kicked!`)
                })
                .catch(()=>{
                    message.channel.send(`Doesnt have permissions`)
                })
            }else{
            message.channel.send("USER NOT FOUND")
            }
        }
        if(CMD_NAME==='ban'){
            if(!message.member.hasPermission('BAN_MEMBERS'))
                return message.channel.send("You don't have permissions!")
                if(args.length===0)
                message.reply('please provide an ID')
        
            try{
                const user = await message.guild.members.ban(args[0]);
                message.channel.send("User was banned successfully!")
            }catch(err){
                message.channel.send("User not Found/Not have permission")
            }

            }
    }

})


client.on("messageReactionAdd",(reaction,user)=>{
    
    const {name} = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id)
    if(reaction.message.id === '919561392758095923'){
        switch(name){
            case '🔫': 
                member.roles.add('919561873106534420')
                break;
            case '⚔️':
                member.roles.add('919537649730064467')
                break;
            case '🐺':
                member.roles.add('919562056074665985')
                break;
            case '🥘':
                member.roles.add('919562005298417704')
                break;
        }
      
    }
})

client.on("messageReactionRemove",(reaction,user)=>{
    
    const {name} = reaction.emoji;
    const member = reaction.message.guild.members.cache.get(user.id)
    if(reaction.message.id === '919561392758095923'){
        switch(name){
            case '🔫': 
                member.roles.remove('919561873106534420')
                break;
            case '⚔️':
                member.roles.remove('919537649730064467')
                break;
            case '🐺':
                member.roles.remove('919562056074665985')
                break;
            case '🥘':
                member.roles.remove('919562005298417704')
                break;
        }
      
    }
})

client.login(process.env.DISCORDJS_BOT_TOKEN);