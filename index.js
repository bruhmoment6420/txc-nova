const Discord  = require('discord.js')
const got = require('got')
const client = new Discord.Client() 

const config = require('./config.json')
const command = require('./command')
const poll = require('./poll')

// On loop
client.on('ready', () => {
  console.log('The client is ready!')

  // Help Command
  command(client, ['help', 'h'], message => {
  const embed = new Discord.MessageEmbed()
      .setTitle(`***Help Menu***`)
      .setThumbnail(client.user.displayAvatarURL())
      .setColor('#2400FF')
      .setFooter('Developed by Tahlil') 	
      .addFields(
      {
        name: 'Bot Prefix',
        value: '*>*',
      },
      {
        name: 'ban:',
        value: '*Bans a user duh. <Requires ADMIN>.*',
      },
      {
        name: 'kick:',
        value: '*Kicks a user also duh. <Requires ADMIN>.*',
      },
      {
        name: 'clear:',
        value: '*Clears messages also duh. <Requires ADMIN>.*',
      },
      {
        name: 'nuke:',
        value: '*Hiroshimas the channel. <Requires ADMIN>.*',
      },
      {
        name: 'meme:',
        value: '*Sends memes.*',
      },
      {
        name: 'status:',
        value: '*Sets bot playing status.*',
      },
      {
        name: 'ping:',
        value: '*Shows the ping.*'
      },
      {
        name: 'member:',
        value: '*Shows current members in server.*'
      } 
    )

    message.channel.send(embed)

  })

  // Poll
  poll(client)

  // Meme Command
  client.on('message', message => {

    if (message.content === ">meme") {
      const embed = new Discord.MessageEmbed()
      got('https://www.reddit.com/r/memes/random/.json').then(response => {
        let content = JSON.parse(response.body);
        let permalink = content[0].data.children[0].data.permalink;
        let memeUrl = `https://reddit.com${permalink}`;
        let memeImage = content[0].data.children[0].data.url;
        let memeTitle = content[0].data.children[0].data.title;
        let memeUpvotes = content[0].data.children[0].data.ups;
        let memeDownvotes = content[0].data.children[0].data.downs;
        let memeNumComments = content[0].data.children[0].data.num_comments;
        embed.setTitle(`${memeTitle}`)
        embed.setURL(`${memeUrl}`)
        embed.setImage(memeImage)
        embed.setColor('RANDOM')
        embed.setFooter(`👍 ${memeUpvotes} 👎 ${memeDownvotes} 💬 ${memeNumComments}`)
        message.channel.send(embed);
      })
    }
  })

  // Latency
  client.on('message', message => {
    if (message.content === '>ping') {  
      message.channel.send(`🏓Latency is **${message.createdTimestamp - message.createdTimestamp}ms** API Latency is **${Math.round(client.ws.ping)}ms**`);
    }
  });

  // Members
  command(client, ['member', 'mems'], (message) => {
    client.guilds.cache.forEach((guild) => {
      message.channel.send(`${guild.name} has a total of ${guild.memberCount} members`)
    })
  })


  // NUKE
  command(client, ['nuke'], (message) => {
    
    const { member, mentions } = message

    const tag = `<@${member.id}>`

    let nukeStatus = false

    if (message.member.hasPermission('ADMINISTRATOR')) {
      nukeStatus = true
      message.channel.messages.fetch().then((results) => {
        message.channel.bulkDelete(results)
      })
    } else {
      message.channel.send(`**${tag} Unfortunately enough, you don't have the balls to do that.**`)
    }

    if (nukeStatus === true) {
      message.channel.send(`**HIROSHIMA**`)
    }
    
  })
  
  // Clearer
  command(client, ['clr', 'clear'], async message => {

    const { member, mentions } = message

    const tag = `<@${member.id}>`

    if (message.member.hasPermission('ADMINISTRATOR')) {

      const args = message.content.split(' ').slice(1); 
      const amount = args.join(' ');

      if (!amount) return message.reply('**You haven\'t given an amount of messages which should be deleted!**');
      if (isNaN(amount)) return message.reply('**The amount parameter isn`t a number!**'); 

      if (amount > 100) return message.reply('**You can`t delete more than 100 messages at once!**'); 
      if (amount < 1) return message.reply('**You have to delete at least 1 message!**'); 

      await message.channel.messages.fetch({ limit: amount }).then(messages => { 
        message.channel.bulkDelete(messages 
      )});
      message.channel.send(`Cleared **${amount}** Messages`)
    } else {
      message.channel.send(`**${tag} Unfortunately enough, you don't have the balls to do that.**`)
    }

  })

  // Status Setter
  command(client, ['status', 's'], (message) => {
    const { member, mentions } = message

    const tag = `<@${member.id}>`
    
 
    if (message.member.hasPermission('ADMINISTRATOR')) {
      const content = message.content.replace('>status', '')
      message.channel.send(`Status changed to **${content}**`)

      client.user.setPresence({
        activity: {
          name: content,
          type: 0,
        }
      })
    } else {
      message.channel.send(`**${tag} Unfortunately enough, you don't have the balls to do that.**`)
    }
  })

  // Banner
  command(client, 'ban', message => {
    const { member, mentions } = message

    const tag = `<@${member.id}>`

    if (member.hasPermission('ADMINISTRATOR')) {
      const target = mentions.users.first()
      if (target) {
        const targetMember = message.guild.members.cache.get(target.id)
        targetMember.ban()
        message.channel.send(`**${tag} Performed a epic gamer move.**`)
      } else {
        message.channel.send(`**${tag} Please specify someone to ban.**`)
      }
    } else {
      message.channel.send(`**${tag} Unfortunately enough, you don't have the balls to do that.**`)
    }
  })

  // Kicker
  command(client, 'kick', message => {
    const { member, mentions } = message

    const tag = `<@${member.id}>`

    if (member.hasPermission('ADMINISTRATOR')) {
      const target = mentions.users.first()
      if (target) {
        const targetMember = message.guild.members.cache.get(target.id)
        targetMember.kick()
        message.channel.send(`**${tag} Performed a slightly less lethal epic gamer move.**`)
      } else {
        message.channel.send(`**${tag} Please specify someone to kick.**`)
      }
    } else {
      message.channel.send(`**${tag} Unfortunately enough, you don't have the balls to do that.**`)
    }
  })

})

client.login(config.token)