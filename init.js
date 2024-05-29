const mongoose = require("mongoose");
const Chat = require("./models/chat.js")

main().then(()=>{
    console.log("Moongose is runing");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

}

const allchats = [
    {
      from: "bilal",
      to: "zohaib",
      msg: "Walikum Salam",
      created_at: new Date()
    },
    {
      from: "zohaib",
      to: "bilal",
      msg: "How are you?",
      created_at: new Date()
    },
    {
      from: "bilal",
      to: "zohaib",
      msg: "I am good, thanks!",
      created_at: new Date()
    },
    {
      from: "zohaib",
      to: "bilal",
      msg: "Great to hear!",
      created_at: new Date()
    },
    {
      from: "bilal",
      to: "zohaib",
      msg: "What about you?",
      created_at: new Date()
    },
    {
      from: "zohaib",
      to: "bilal",
      msg: "I'm doing well too, thanks for asking!",
      created_at: new Date()
    }
  ];

Chat.insertMany(allchats).then((res)=>{
    console.log(res);
})
