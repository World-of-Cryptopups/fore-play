import { Message } from 'discord.js';
import { CommandProps } from '../../types/command';

export const command: CommandProps = {
  name: 'hello',
  execute(message: Message, args: string[]) {
    message.channel.send('Start of the Development of GamePug!');
  },
};
