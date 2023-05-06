const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("명령어 사용법"),
    async execute(interaction) {
        const replyEmbed = new EmbedBuilder()
            .setColor("ff0000")
            .setTitle("help")
            .setURL("https://www.youtube.com/")
            .setAuthor({ name: '횽챵', iconURL: 'http://sogang.kiwi.co.kr/page/data/file/b03/11_%EA%B5%90%EC%88%98%EB%8B%A8%EC%8B%A0_%EC%9E%A5%ED%98%95%EC%88%98.jpg', url: 'https://sgunews.sogang.ac.kr/front/cmsboardview.do?siteId=sgunews&bbsConfigFK=3606&pkid=872838' })
            .setDescription("명령어 사용법")
            .setThumbnail('http://sogang.kiwi.co.kr/page/data/file/b03/11_%EA%B5%90%EC%88%98%EB%8B%A8%EC%8B%A0_%EC%9E%A5%ED%98%95%EC%88%98.jpg')
            .addFields(
                { name: '/금지어등록', value: '금지어를 등록합니다.' },
                { name: '/아무말', value: '아무말을 해줍니다', inline: false },
                { name: '/인증', value: '욤 역할을 부여받습니다', inline: false },
            )
            .setImage('https://cdn-store.leagueoflegends.co.kr/images/v2/emotes/1502.png')
            .setTimestamp()
            .setFooter({ text: 'ボット', iconURL: 'https://cdn-store.leagueoflegends.co.kr/images/v2/emotes/3133.png' });
        await interaction.editReply({ embeds: [replyEmbed] });
    },
};