const Discord = require('discord.js')
const got = require('got')
const client = new Discord.Client()

const config = require('./config.json')
const command = require('./command')
const poll = require('./poll')

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
          value: '*1.17*',
        }
      )

    message.channel.send(versionEmbed)
  })

  // Profanity Blocker
  client.on('message', async message => {
    const { member } = message


    const swearWords = [
      'lettuce',
      'another lettuce',
      'nigger',
      'beater',
      'blowjob',
      'handjob',
      'suicide',
      'brazzers',
      'breast cancer',
      'brunette',
      'busty',
      'buttfuck',
      'clit',
      'clitoris',
      'cocksucker',
      'condom',
      'condoms',
      'crackwhore',
      'cum',
      'cumming',
      'cumshot',
      'cumshots',
      'cyst',
      'deepthroat',
      'dental abscenes',
      'doggiestyle',
      'doggie style',
      'doggy style',
      'dildo',
      'ejaculate',
      'ejaculated',
      'ejaculates',
      'ejaculation',
      'ejaculating',
      'el chapo',
      'erectile dysfunction',
      'erection',
      'erotic',
      'faggot',
      'faggots',
      'faggs',
      'faghag',
      'fap',
      'fapping',
      'fetish',
      'fetishes',
      'fingered',
      'fingering',
      'fisted',
      'footjob',
      'foreskin',
      'fuckme',
      'fuck me',
      'lets fuck',
      'fucktard',
      'g - spot',
      'g spot',
      'g Spot',
      'gambling',
      'gang bang',
      'gangbang',
      'gangbanged',
      'genital',
      'genital herpes',
      'grope',
      'groping',
      'groped',
      'hand job',
      'handjob',
      'handjobs',
      'hentai',
      'heroin',
      'hetero',
      'hitler',
      'holocaust',
      'holohoax',
      'homo',
      'homoerotic',
      'hooker',
      'hookers',
      'horney',
      'horniest',
      'horny',
      'hotbox',
      'hotsex',
      'hottest',
      'hump',
      'humped',
      'humping',
      'hydroxychloroquine',
      'incest',
      'intercourse',
      'isil',
      'isis',
      'jacking off',
      'jackoff',
      'jerk - off',
      'jerkoff',
      'liveleak',
      'lust',
      'lustful',
      'marijuana',
      'massacre',
      'masterbate',
      'masterbating',
      'masterbation',
      'masturbate',
      'masturbating',
      'masturbation',
      'masturbators',
      'milf',
      'milfs',
      'missionary position',
      'molest',
      'molester',
      'mothafucka',
      'mothafuckas',
      'mothafuckaz',
      'mothafucker',
      'mothafuckers',
      'mothafuckin',
      'mothafucking',
      'motherfuck',
      'motherfucka',
      'motherfucker',
      'motherfuckers',
      'motherfuckin',
      'motherfucking',
      'mutherfucker',
      'naggers',
      'nasal and sinus cancer',
      'nazi',
      'necrophilia',
      'neo - nazi',
      'neonazi',
      'nigga',
      'niggah',
      'niggas',
      'niggaz',
      'nigger',
      'niggers',
      'niglet',
      'negro',
      'nudes',
      'nudist',
      'nudity',
      'nutsack',
      'oral Sex',
      'orgasim',
      'orgasm',
      'orgasmic',
      'orgasms',
      'paedo',
      'paedophile',
      'pantyhose',
      'pedophile',
      'pedophile',
      'pedophilia',
      'pedophiliac',
      'penile cancer',
      'penis',
      'pervert',
      'perverted',
      'sexually transmitted infections',
      'skullfuck',
      'slave',
      'slut',
      'smut',
      'smutty',
      'sperm',
      'squirting',
      'stockings',
      'strip',
      'terrorism',
      'terrorist',
      'terrorists',
      'testicles',
      'threesome',
      'tit',
      'tities',
      'tits',
      'titten',
      'titties',
      'titty',
      'tri - sexual',
      'twat',
      'undress',
      'undressing',
      'upskirt',
      'upskirts',
      'vagina',
      'vaginal',
      'vaginal cancer',
      'vbucks',
      'viagra',
      'vibrator',
      'vibrators',
      'white power',
      'white pride',
      'xbox nigga',
      'xnxx',
      'xtube',
      'xvideos',
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

  // Poll
  poll(client)

  // Meme Command
  client.on('message', message => {

    if (message.content === ",meme") {
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
    if (message.content === ',ping') {
      message.channel.send(`🏓Latency is **${message.createdTimestamp - message.createdTimestamp}ms** API Latency is **${Math.round(client.ws.ping)}ms**`);
    }
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

    message.channel.send(`**KILL YOURSELF ${tag}**`)
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
        )
      });
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

})

client.login(config.token)