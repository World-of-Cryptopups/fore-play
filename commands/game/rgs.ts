import { MessageEmbed } from 'discord.js';
import item from '../../samples/rgs-item.json';
import { CommandProps } from '../../types/command';

export const command: CommandProps = {
  name: 'rgs',
  execute: async (message, args) => {
    message.channel.startTyping();

    const msg = await message.channel.send(
      'Setting up the game, please wait...'
    );

    // TODO: for production
    // const f = await axios.get<WAXResponseProps>(
    //   'https://wax.api.atomicassets.io/atomicassets/v1/assets?collection_name=cryptopuppie&schema_name=pupskincards&page=1&limit=1000&order=desc&sort=asset_id&before=1626544800000'
    // );
    await msg.edit(
      `<@!${message.author.id}>, we are now starting the game in 2 seconds!`
    );

    // TODO: for production
    // const item = f.data.data[Math.floor(Math.random() * f.data.data.length)];

    // set timer
    setTimeout(async () => {
      await msg.edit(`<@!${message.author.id}>, Game has STARTED!`);

      // embed question
      const em = new MessageEmbed()
        .setTitle('What is the name of this Pupskin Card?')
        .setDescription('Answer the question to gain rewards.')
        .setThumbnail(
          `https://wax.atomichub.io/ipfs/${item.data.img}` // (its not working eh)
        )
        .setFooter('GamePug');

      // main quiz
      message.channel.send(em).then(() => {
        message.channel
          .awaitMessages((m) => m.author.id === message.author.id, {
            max: 1,
            time: 10000,
          })
          .then((collected) => {
            // lowecase both answers to be fair
            if (
              collected.first()?.content.toLowerCase() ==
              item.name.toLowerCase()
            ) {
              message.reply('Correct Answer!');
            } else {
              message.reply(
                `Sorry, your answer is incorrect. Correct answer is **${item.name}**`
              );
            }
          });
      });
    }, 2000);

    message.channel.stopTyping();
  },
};
