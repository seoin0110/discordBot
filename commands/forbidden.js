const {SlashCommandBuilder} = require("discord.js");
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("금지어등록")
        .setDescription("금지어를 등록할 수 있습니다")
        .addStringOption(option=>
            option
                .setName('forbidden_word')
                .setDescription('forbidden word')
                .setRequired(true)),
    async execute(interaction){
        const forbidden_word = interaction.options.getString('forbidden_word');
        await fs.appendFile('forbidden.txt',`${forbidden_word}\n`,(err)=>{
            if(err) throw err;
            interaction.reply(`"${forbidden_word}" 금지어를 부여했습니다.`);
        })
       
    },
};