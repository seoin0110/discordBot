const { Events } = require('discord.js');

module.exports = {
    name: Events.GuildMemberAdd,
    once: false,
    async function(member) {
        member.channel.send(`${member.id} 등장!`);
    },
};