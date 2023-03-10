const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");
const emojis = ["πββοΈ", "πββοΈ"];


module.exports = {
    data: new SlashCommandBuilder()
        .setName("ν¬ν")
        .setDescription("μ΄λͺ¨ν°μ½ λ°©μμΌλ‘ ν¬νν©λλ€")
        .addStringOption((option) =>
            option
                .setName("votecontent")
                .setDescription("ν¬ν λ΄μ©μ λ­λ‘ν μ§ μ ν©λλ€")
                .setRequired(true)
        )
        .addIntegerOption((option) =>
            option
                .setName("time")
                .setDescription("ν¬νλ₯Ό λ°μ μκ°μ μ΄ λ¨μλ‘ μλ ₯ν΄μ£ΌμΈμ")
                .setRequired(true)
        ),
    async execute(interaction) {
        const voteContent = interaction.options.getString("votecontent");
        const voteTime = interaction.options.getInteger("time");
        const mainEmbed = new EmbedBuilder()
            .setTitle(voteContent)
            .setColor(0x000000);

        const message = await interaction.editReply({ embeds: [mainEmbed] });
        emojis.forEach((e) => message.react(e));
        const filter = (reaction, user) => {
            return emojis.find((e) => e == reaction.emoji.name);
        };

        const voteCollector = message.createReactionCollector({
            filter,
            time: voteTime * 1000,
        });

        let yes = 0;
        let no = 0;
        voteCollector.on("collect", (reaction, user) => {
            console.log(reaction);
            if (reaction.emoji.name == "πββοΈ") {
                yes++;
            } else if (reaction.emoji.name == "πββοΈ") {
                no++;
            }
        });
        voteCollector.on("end", collected => {
            const yesCount = collected.get("πββοΈ").count - 1;
            const noCount = collected.get("πββοΈ").count - 1;
            const resultEmbed = new EmbedBuilder()
                .setTitle("ν¬ν κ²°κ³Ό")
                //.setDescription(`μ΄ ${collected.size} κ°μ μ΄λͺ¨ν°μ½μ μμ§νμ΅λλ€.`);
                .setDescription(`μ°¬μ± ${yesCount}ν, λ°λ ${noCount}ν`);
            interaction.editReply({ embeds: [resultEmbed] });
            message.reactions.removeAll()
                .catch(error => console.error('Failed to clear reactions:', error));
        });

    },
};