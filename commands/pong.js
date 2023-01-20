const {SlashCommandBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("야꿀벌")
        .setDescription("왜 울고있는거야..?"),
    async execute(interaction){
        await interaction.reply("소난다..");
    },
};