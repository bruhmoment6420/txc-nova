![TXC_DIMDIM](https://cdn.discordapp.com/avatars/780651711030493226/961aac2b97631bbafb07f8ca4c855d04.webp)
# txc-nova
This is a Discord bot was originally made solely for the TXC-CNFSD Discord server but now it is available for commercial use.
This is primarily a moderation bot but it also has various miscellaneous functions.
You can directly add the commercial version or you could make this bot your own by cloning it and setting it up mannually according to your needs.
This has been written completely in JavaScript.
It uses the Discord.JS library or wrapper.


## Adding the commercial version to your server
[Add Me](https://discord.com/api/oauth2/authorize?client_id=780651711030493226&permissions=8&scope=bot "Click me !!") 
Use that link to add the commercial version of the bot that works out of the box to your server.


## Setting it up manually
The following section describes how to set the bot up manually.
### Running
Ill be using ```npm``` for the packages but ```yarn``` can also be used.

### Prerequisites
This following guide assumes you have programming and discord bot development knowledge.
If not please use the commercial verision.

### Starting the bot
This describes how to start the bot.
#### Step 0
Firstly make a discord bot from the [Discord Developer Portal](https://discord.com/developers/applications "UwU").
Then get the token for the bot and clone the repository onto your computer.
#### Step 1
In project directory run:
```
npm install
```
#### Step 2
Go to ```config.json``` and change the ```token``` to your own bots one.
If you want to change the prefix go ahead and change the ```prefix``` value.
#### Step 3
Once everything is ready to go run:
```
node index.js
```
