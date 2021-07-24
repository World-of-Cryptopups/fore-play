// process only dotenv files in development
const isDev = process.env.NODE_ENV === 'development';
if (isDev) {
  const dotenv = require('dotenv');
  dotenv.config();
}

import { Client, Collection } from 'discord.js';
import fs from 'fs';
import { CommandProps, ImportCommandProps } from './types/command';
const client = new Client();
const commands: Collection<string, CommandProps> = new Collection();

// bot command prefix
const prefix = '.';

// read commands folder
const commandFolders = fs.readdirSync('./commands');

// parse each commands in dir
for (const folder of commandFolders) {
  const commandFiles = fs
    .readdirSync(`./commands/${folder}`)
    .filter((file) => file.endsWith(isDev ? '.ts' : '.js'));

  // get commands
  for (const file of commandFiles) {
    const {
      command,
    }: ImportCommandProps = require(`./commands/${folder}/${file}`);

    commands.set(command.name, command);
  }
}

client.once('ready', () => {
  console.log('Ready!');
});

client.on('message', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  // parse message content
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args?.shift()?.toLowerCase() || '';

  if (!commands.has(command)) return;

  // execute corresponding command
  try {
    commands?.get(command)?.execute(message, args);
  } catch (e) {
    console.error(e);
    message.reply(
      'There was a problem in trying to execute that command! If problem persists, please contact an admin and try again.'
    );
  }
});

client.login(process.env.TOKEN);
