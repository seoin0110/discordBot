const fs = require('fs');
const path = require('path');
const { Client, Collection, Events, GatewayIntentBits} = require("discord.js");
require("dotenv").config();

let obj = {
  name: "asdf",
  id: 1234,
}

const client = new Client({
  intents: [GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages],
});



//여기서부터는 커멘드 등록
client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file)=>file.endsWith(".js"));

for (const file of commandFiles){
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ('data' in command && 'execute' in command){
    client.commands.set(command.data.name,command);
  }else{
    console.log("데이터가 제대로 처리되지 않았습니다.. 스킵합니다..");
  }
}

console.log(client.commands);


//여기서부터는 이벤트 처리
client.on(Events.ClientReady, (c) => {
  console.log(`Logged in as ${c.user.tag}`);
});

const util = require("util");
const wait = util.promisify(setTimeout);

client.on(Events.MessageCreate, async (msg)=>{
    if(msg.member.user.bot)return;
    // if(msg.content == "핑"){
    //     msg.channel.send("퐁!");
    // }

    /*
    if(msg.content.includes("fuck"))
    {
      msg.channel.send(`<@${msg.author.id}> you!`);
      msg.delete();
    }
    */
   
    //한줄씩 파일 읽기 -> map으로 금지어 삭제 및 "금지어 금지" 전송
    fs.stat('./forbidden.txt',(err,stats)=>{
      if(err && err.code==="ENOENT"){
        return;
      }
      else{
        fs.readFile('./forbidden.txt',(err,data)=>{
          if(err) {
            throw err;
          }
          const forbidden_array = data.toString().split(/\r?\n/);
          if(forbidden_array.length>=1 && forbidden_array[forbidden_array.length-1]===""){
            forbidden_array.pop();
          }
          //console.log(forbidden_array);
          for(forbidden_word of forbidden_array){
            if(msg.content.includes(forbidden_word)){
              msg.channel.send(`<@${msg.author.id}> "${forbidden_word}" 금지!`);
              msg.delete();
              break;
            }
          }
        });

      }
    });
    
    

    if(Math.random()*20<=1){
      msg.channel.send("나 심심해");;
    }

    //console.log(`${msg.member.user.username}가 메세지를 ${msg.content}라고 보냄`);

});

client.on(Events.InteractionCreate, async interaction => {
  if(!interaction.isChatInputCommand())return;
  const command = interaction.client.commands.get(interaction.commandName);
  //console.log(interaction.data);

  if(!command){
    console.log("구현되지 않은 명령어입니다.");
  }

  try{
    await command.execute(interaction);
  }catch(error){
    interaction.reply("명령어를 실행하는 데 오류가 발생했습니다.");
    console.log(error);
  }

});

client.on(Events.GuildMemberAdd,  member => {
  member.channel.send(`${member.id} 등장!`);
});


client.login(process.env.TOKEN);
