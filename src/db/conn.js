const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://portfolio:portfolio@cluster0.ezqz7ep.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log(`Mongo db is connected`)
}).catch((e)=>{
    console.log(`Got error in connecting mongo db : ${e}`)
})