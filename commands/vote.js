const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");
const emojis = ["🙆‍♀️", "🙅‍♀️"];


module.exports = {
    data: new SlashCommandBuilder()
        .setName("투표")
        .setDescription("이모티콘 방식으로 투표합니다")
        .addStringOption((option) =>
            option
                .setName("votecontent")
                .setDescription("투표 내용을 뭘로할지 정합니다")
                .setRequired(true)
        )
        .addIntegerOption((option) =>
            option
                .setName("time")
                .setDescription("투표를 받을 시간을 초 단위로 입력해주세요")
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
            if (reaction.emoji.name == "🙆‍♀️") {
                yes++;
            } else if (reaction.emoji.name == "🙅‍♀️") {
                no++;
            }
        });
        voteCollector.on("end", collected => {
            const yesCount = collected.get("🙆‍♀️").count - 1;
            const noCount = collected.get("🙅‍♀️").count - 1;
            const resultEmbed = new EmbedBuilder()
                .setTitle("투표 결과")
                //.setDescription(`총 ${collected.size} 개의 이모티콘을 수집했습니다.`);
                .setDescription(`찬성 ${yesCount}표, 반대 ${noCount}표`);
            interaction.editReply({ embeds: [resultEmbed] });
            message.reactions.removeAll()
                .catch(error => console.error('Failed to clear reactions:', error));
        });

    },
};