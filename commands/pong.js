const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const util = require("util");
const wait = util.promisify(setTimeout);

module.exports = {
    data: new SlashCommandBuilder()
        .setName("야꿀벌")
        .setDescription("왜 울고있는거야..?"),
    async execute(interaction) {
        const replyEmbed = new EmbedBuilder()
            .setColor("ff0000")
            .setTitle("소난다..")
            .setURL("https://www.youtube.com/")
            .setDescription("화낸척 하기는..");
        await wait(5e3);
        const message = await interaction.editReply({ embeds: [replyEmbed] });
        message.react("😎");
    },
};