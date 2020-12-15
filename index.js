const Discord = require('discord.js')
const got = require('got')
const client = new Discord.Client()

const config = require('./config.json')
const command = require('./command')
const fs = require("fs")
let db = JSON.parse(fs.readFileSync("./database.json", "utf8"))

// On loop
client.on('ready', () => {
  console.log('The client is ready!')


  // Version 
  command(client, ['v', 'version'], message => {
    const versionEmbed = new Discord.MessageEmbed()
      .setTitle(`***Version***`)
      .setThumbnail(client.user.displayAvatarURL())
      .setColor('#2400FF')
      .addFields(
        {
          name: 'Version:',
          value: '*2.4*',
        }
      )

    message.channel.send(versionEmbed)
  })

  // Profanity Blocker
  client.on('message', async message => {
    const { member } = message


    const swearWords = [
      'nigger',
      'beater',
      'breast cancer',
      'clit',
      'clitoris',
      'cumshot',
      'cumshots',
      'dental abscenes',
      'erectile dysfunction',
      'faggot',
      'faggots',
      'faggs',
      'faghag',
      'genital',
      'genital herpes',
      'hitler',
      'holohoax',
      'homo',
      'homoerotic',
      'isil',
      'isis',
      'naggers',
      'nazi',
      'neo - nazi',
      'neonazi',
      'nigga',
      'niga',
      'niba',
      'niger',
      'nibba',
      'n1gga',
      'n1bba',
      'neger',
      'niggah',
      'niggas',
      'niggaz',
      'nigger',
      'niggers',
      'niglet',
      'negro',
      'orgasm',
      'orgasmic',
      'orgasms',
      'slut',
      'tri - sexual',
      'twat',
      'hizra',
      'xbox nigga'
    ]

    if (swearWords.some(word => message.content.toLowerCase().includes(word))) {
      message.delete()

      message.member.send(`***YOU HAVE SOME NERVE SAYING THAT IN THIS SERVER***`)
    }
  })


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
          value: '*,*',
        },
        {
          name: 'meme:',
          value: '*Sends memes.*',
        },
        {
          name: 'ping:',
          value: '*Shows the ping.*',
        },
        {
          name: 'member:',
          value: '*Shows current members in server.*',
        },
        {
          name: '8ball:',
          value: '*Ask a yes or no question and bot answers.*',
        },
        {
          name: 'remind:',
          value: '*Gives a friendly remider.*',
        },
        {
          name: 'version:',
          value: '*Prints the version.*',
        },
        {
          name: 'avatar:',
          value: '*Shows the avatar of person tagged. <use alone for own>*',
        },
        {
          name: 'info:',
          value: '*Shows the current level and exp of the user.*'
        },
        {
          name: 'helpa:',
          value: '*Shows list of admin commands.*',
        }
      )

    message.channel.send(embed)

  })


  // Admin Help
  command(client, ['adminh', 'helpa', 'adminhelp'], message => {

    if (message.member.hasPermission('ADMINISTRATOR')) {
      const newEmbed = new Discord.MessageEmbed()
        .setTitle(`***SUPER SECRET HELP MENU***`)
        .setThumbnail(client.user.displayAvatarURL())
        .setColor('#39940D')
        .setFooter('Developed by Tahluwu')
        .addFields(
          {
            name: 'ban:',
            value: '*Bans user, Tag person you wanna ban to init.*',
          },
          {
            name: 'kick:',
            value: '*Kicks user, Tag person you wanna ban to init.*',
          },
          {
            name: 'clear:',
            value: '*Clears message, use with args uwu.*',
          },
          {
            name: 'nuke:',
            value: '*Hiroshimas the channel.*',
          },
          {
            name: 'mute:',
            value: '*Mutes a user <requires a mute role in server>*',
          },
          {
            name: 'status:',
            value: '*Sets the status uwu.*',
          }
        )

      message.channel.send(newEmbed)
    } else {
      message.channel.send(`***no***`)
    }

  })

  // 8 Ball 
  command(client, ['8ball', 'EightBall', 'eightball'], message => {
    const { member } = message

    const tag = `<@${member.id}>`
    const userContent = message.content.replace(',8ball', '')

    const replies = [
      'It is certain.',
      'It is decidedly so.',
      'Without a doubt.',
      'Yes – definitely.',
      'You may rely on it.',
      'As I see it, yes.',
      'Most likely.',
      'Outlook good.',
      'Yes.',
      'Signs point to yes.',
      'Reply hazy, try again.',
      'Ask again later.',
      'Better not tell you now.',
      'Cannot predict now.',
      'Concentrate and ask again.',
      'Dont count on it.',
      'My reply is no.',
      'My sources say no.',
      'Outlook not so good.',
      'Very doubtful.',
    ]

    const randomReply = replies[Math.floor(Math.random() * replies.length)];

    message.channel.send(`***Question: ${userContent}\nAnswer: ${randomReply}***`)

  })


  // Meme Command
  command(client, ['meme'], message => {

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
  })

  // Latency
  command(client, ['p', 'ping'], message => {
    message.channel.send(`🏓Latency is **${message.createdTimestamp - message.createdTimestamp}ms** API Latency is **${Math.round(client.ws.ping)}ms**`);
  });

  // Members
  command(client, ['member', 'mems'], (message) => {
    client.guilds.cache.forEach((guild) => {
      message.channel.send(`***${guild.name}*** has a total of ***${guild.memberCount}*** members`)
    })
  })

  // Reminder
  command(client, 'remind', (message) => {

    const { member } = message

    const tag = `<@${member.id}>`

    const neckRopeReplies = [
      `**KILL YOURSELF ${tag}**`,
      `**JUMP OFF A ROOF ${tag}**`,
      `**NOBODY WANTS YOU ${tag}**`,
      `**THATS WHY SHE LEFT YOU ${tag}**`,
      `**WHY DONT YOU GO HANG YOURSELF ${tag}**`,
      `**HANG YOURSELF ${tag}**`,
      `**COMMIT SELF HARM ${tag}**`,
      `**YOUR FRIENDS DONT GIVE A SHIT ABOUT YOU ${tag}**`,
      `**WHY WERE YOU EVEN BORN ${tag}**`,
      `**YOU DONT MATTER ${tag}**`,
      `**THE WORLD DOSENT NEED YOU ${tag}**`
    ]

    const randNeckRopeReplies = neckRopeReplies[Math.floor(Math.random() * neckRopeReplies.length)];

    message.channel.send(`${randNeckRopeReplies}`)

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

  // Avatar
  command(client, ['av', 'avatar'], message => {

    const { member, mentions } = message

    const avTarget = mentions.users.first()

    if (avTarget) {
      const avEmbed = new Discord.MessageEmbed()
        .setImage(avTarget.displayAvatarURL())

      message.channel.send(avEmbed)

    } else {
      const avEmbed = new Discord.MessageEmbed()
        .setImage(message.author.displayAvatarURL())

      message.channel.send(avEmbed)
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
        )
      });
      message.channel.send(`${tag} Cleared **${amount}** Messages`)
    } else {
      message.channel.send(`**${tag} Unfortunately enough, you don't have the balls to do that.**`)
    }

  })

  // Status Setter
  command(client, ['status', 's'], (message) => {
    const { member, mentions } = message

    const tag = `<@${member.id}>`


    if (message.member.hasPermission('ADMINISTRATOR')) {
      const content = message.content.replace(',status', '')
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

  // Muter
  command(client, 'mute', message => {
    const { member, mentions } = message

    const tag = `<@${member.id}>`

    const mutedRole = message.guild.roles.cache.find(
      (role) => role.name === "Mute"
    );

    if (member.hasPermission('ADMINISTRATOR')) {
      const target = mentions.users.first()
      if (!mutedRole) {
        message.channel.send(`**Role not dere :(**`)
      } else {
        const targetMember = message.guild.members.cache.get(target.id)
        targetMember.roles.add(mutedRole);
        message.channel.send(`**${tag} used Silencio**`);
      }
    } else {
      message.channel.send(`**${tag} Unfortunately enough, you don't have the balls to do that.**`)
    }
  })

  // EXP System
  client.on('message', message => {

    const { member, mentions } = message

    const bruhMoment = mentions.users.first()


    if (message.author.bot) return;

    if (!db[message.author.id]) db[message.author.id] = {
      xp: 0,
      level: 0
    };
    db[message.author.id].xp++;
    let userInfo = db[message.author.id];
    if (userInfo.xp > 100) {
      userInfo.level++
      userInfo.xp = 0
      message.reply(`****Congratulations you have leveled up**** `)
    }
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd === 'info') {
      let userInfo = db[message.author.id];
      let member = message.mentions.members.first();
      let embed = new Discord.MessageEmbed()
        .setThumbnail(message.author.displayAvatarURL())
        .setColor(0x4286f4)
        .addField(`**Level**`, userInfo.level)
        .addField(`**XP**`, userInfo.xp + `/100`);
      if (!member) return message.channel.send(embed)

      let memberInfo = db[member.id]

      if (typeof memberInfo === 'undefined') {
        message.channel.send(`***Theres nothing to show O-O***`)
      } else {
        let embed2 = new Discord.MessageEmbed()
          .setThumbnail(bruhMoment.displayAvatarURL())
          .setColor(0x4286f4)
          .addField(`**Level**`, memberInfo.level)
          .addField(`**XP**`, memberInfo.xp + `/100`)
        message.channel.send(embed2)
      }

    }

    fs.writeFile('./database.json', JSON.stringify(db), (x) => {
      if (x) console.error(x)
    });


  })

})

client.login(config.token)