const { Events } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;
        const command = interaction.client.commands.get(interaction.commandName);
        //console.log(interaction.data);

        if (!command) {
            console.log("구현되지 않은 명령어입니다.");
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            interaction.reply("명령어를 실행하는 데 오류가 발생했습니다.");
            console.log(error);
        }

    },
};