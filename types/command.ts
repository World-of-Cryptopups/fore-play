import { Message } from 'discord.js';

export type CommandProps = {
  name: string;
  description?: string;
  alias?: string[];
  cooldown?: number;
  args?: boolean;
  usage?: string;
  guildOnly?: boolean;
  execute: (message: Message, args: string[]) => void;
};

export type ImportCommandProps = {
  command: CommandProps;
};
