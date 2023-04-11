const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('skipass')
    .setDescription('Une vidéo très drôle'),
  async execute(interaction) {
    await interaction.reply('https://www.skipass.com/videos/snowboard-de-fond-1.html');
  },
};
