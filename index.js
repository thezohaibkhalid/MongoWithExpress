const express = require("express");
const app = express(); 
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js")
const methodOverride = require("method-override");


main().then(()=>{
    console.log("Moongose is runing");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

}

// let chat1 = new Chat({
//     from: "bilal",
//     to:"zohaib",
//     msg:"Walikum Salam",
//     created_at: new Date()
// });

// chat1.save().then((res)=>{
//     console.log(res);
// })





app.set("views", path.join(__dirname,"views") );
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

app.listen(8080, ()=>{
    console.log("Server is On");
})

app.get("/",(req,res)=>{
    res.send("Root is working");
});



//________________________INDEX ROUTE-------------------->>
app.get("/chats", async(req, res)=>{
    let chats = await Chat.find();
    // console.log(chats);
    res.render("index.ejs", {chats});
})
//CREATE ROUTE-------------------->>
app.post("/chats", (req, res)=>{
    let {from, to, msg} = req.body;
    let newChat = new Chat({
        from:from,
        msg:msg, 
        to:to,
        created_at: new Date()
    });
    console.log(newChat);
    
    newChat.save().then((res)=>{
        console.log("Your chat was saved")
    }).catch((err)=>{
        console.log(err);
    })
    res.redirect("/chats");
});


app.get("/chats/new", (req, res)=>{
    res.render("new.ejs")
});



app.get("/chats/:id/edit", async(req, res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", {chat});
});

//---------------UPDATE ROUTE------------**

app.put("/chats/:id", async (req, res)=>{
    let {id} = req.params;
    let {msg : newMsg} = req.body;
    // console.log(newMsg);
    let updatedChat = await Chat.findByIdAndUpdate(id, {msg:newMsg}, {runValidators:true , new:true});
    console.log(updatedChat);
    res.redirect("/chats")
});


//---------------DESTROY ROUTE---------------
app.delete("/chats/:id", async (req,res)=>{
    try{

    
    let {id} = req.params;
    let chatToBeDeleted = await Chat.findByIdAndDelete(id);

    console.log(chatToBeDeleted);
    res.redirect("/chats")
    } catch(error){
        console.log(err);
    }
})