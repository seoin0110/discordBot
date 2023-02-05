const { Events } = require('discord.js');
const fs = require('fs');
module.exports = {
    name: Events.MessageCreate,
    once: false,
    async execute(msg) {
        if (msg.member.user.bot) return;
        // if(msg.content == "핑"){
        //     msg.channel.send("퐁!");
        // }


        // if(msg.content.includes("fuck"))
        // {
        //   msg.channel.send(`<@${msg.author.id}> you!`);
        //   msg.delete();
        // }


        //한줄씩 파일 읽기 -> map으로 금지어 삭제 및 "금지어 금지" 전송
        fs.stat('../forbidden.txt', (err, stats) => {
            if (err && err.code === "ENOENT") {
                return;
            }
            else {
                fs.readFile('../forbidden.txt', (err, data) => {
                    if (err) {
                        throw err;
                    }
                    const forbidden_array = data.toString().split(/\r?\n/);
                    if (forbidden_array.length >= 1 && forbidden_array[forbidden_array.length - 1] === "") {
                        forbidden_array.pop();
                    }
                    //console.log(forbidden_array);
                    for (forbidden_word of forbidden_array) {
                        if (msg.content.includes(forbidden_word)) {
                            msg.channel.send(`<@${msg.author.id}> "${forbidden_word}" 금지!`);
                            msg.delete();
                            break;
                        }
                    }
                });

            }
        });



        if (Math.random() * 20 <= 1) {
            msg.channel.send("나 심심해");;
        }

        //console.log(`${msg.member.user.username}가 메세지를 ${msg.content}라고 보냄`);

    },
};