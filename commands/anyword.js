const {SlashCommandBuilder} = require("discord.js");

const scriptList = ["안녕하세요", "어쩌라고", "우짤래미", "배고파"];


module.exports = {
    data: new SlashCommandBuilder()
        .setName("아무말")
        .setDescription("아무말로 대답해줌"),
    async execute(interaction){
        const index = Math.floor(Math.random()*scriptList.length); //0~3까지 랜덤 숫자
        await interaction.reply(scriptList[index]);
    },
};