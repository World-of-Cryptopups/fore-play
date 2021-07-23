// process only dotenv files in development
if (process.env.NODE_ENV === 'development') {
  const dotenv = require('dotenv');
  dotenv.config();
}

const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
  console.log('Ready!');
});

client.on('message', (message) => {
  if (message.content === '.hello') {
    message.channel.send('Start of the Development of ForePlay!');
  }
});

client.login(process.env.TOKEN);
