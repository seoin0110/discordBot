const {SlashCommandBuilder} = require("discord.js");
require("dotenv").config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName("인증")
        .setDescription("욤 역할을 부여해줍니다."),
    async execute(interaction){
        await interaction.member.roles.add(process.env.ROLE_ID);
        await interaction.reply("욤 역할을 부여했습니다.");
    },
};