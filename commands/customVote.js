const {
    SlashCommandBuilder,
    EmbedBuilder,
    ButtonBuilder,
    ActionRowBuilder,
    ButtonStyle
} = require("discord.js");
const emojis = ["찬성", "반대"];


module.exports = {
    data: new SlashCommandBuilder()
        .setName("커스텀투표")
        .setDescription("Button 방식으로 투표합니다")
        .addIntegerOption((option) =>
            option
                .setName("time")
                .setDescription("투표를 받을 시간을 초 단위로 입력해주세요")
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName("voteleftcontent")
                .setDescription("투표 왼쪽 항목을 뭘로할지 정합니다")
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName("voterightcontent")
                .setDescription("투표 오른쪽 항목을 뭘로할지 정합니다")
                .setRequired(true)
        )
        .addBooleanOption((option) =>
            option
                .setName("votestatus")
                .setDescription("투표 현황을 보여줄지 정합니다")
                .setRequired(true)
        ),
    async execute(interaction) {
        const voteLeftContent = interaction.options.getString("voteleftcontent");
        const voteRightContent = interaction.options.getString("voterightcontent");
        const voteStatus = interaction.options.getBoolean("votestatus");
        const voteTime = interaction.options.getInteger("time");

        const mainEmbed = new EmbedBuilder()
            .setTitle("VS 게임")
            .setColor(0x000000);

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel(voteLeftContent)
                    .setStyle(ButtonStyle.Primary)
                    .setCustomId("botoleft" + interaction.id),
                new ButtonBuilder()
                    .setLabel(voteRightContent)
                    .setStyle(ButtonStyle.Danger)
                    .setCustomId("botoright" + interaction.id)
            );

        const message = await interaction.editReply({
            embeds: [mainEmbed],
            components: [row],
            ephemeral: true,
        });
        let left = 0;
        let right = 0;
        const filter = (i) => {
            if (i.customId == "botoleft" + interaction.id) {
                left++;
            }
            else if (i.customId == "botoright" + interaction.id) {
                right++;
            }
            return (
                i.customId == "botoleft" + interaction.id ||
                i.customId == "botoright" + interaction.id
            );
        };

        const collector = message.createMessageComponentCollector({ filter, time: voteTime * 1000 });

        collector.on('collect', async i => {
            if (voteStatus === true) {
                const resultEmbed = new EmbedBuilder()
                    .setTitle("투표 결과")
                    //.setDescription(`총 ${collected.size} 개의 이모티콘을 수집했습니다.`);
                    .setDescription(`${voteLeftContent} ${left}표, ${voteRightContent} ${right}표`);
                await i.update({ embeds: [resultEmbed], components: [row] }); //component를 비워주면 빈 버튼으로 업데이트됩니다. 한번 누르면 끝인 반응이겠죠?
            } else {
                await i.update({ embeds: [mainEmbed], components: [row] }); //component를 비워주면 빈 버튼으로 업데이트됩니다. 한번 누르면 끝인 반응이겠죠?
            }
        });

        collector.on('end', collected => {
            const resultEmbed = new EmbedBuilder()
                .setTitle("투표 결과")
                //.setDescription(`총 ${collected.size} 개의 이모티콘을 수집했습니다.`);
                .setDescription(`${voteLeftContent} ${left}표, ${voteRightContent} ${right}표`);
            message.edit({ embeds: [resultEmbed], components: [] });
        });

    },
};