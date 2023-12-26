const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
require("./db/conn");
const ContactMsg = require("./models/contactSch");
const NewUser = require("./models/signupSch");

const port = process.env.PORT || 7000;

const static_path = path.join(__dirname,"../public");
const views_path = path.join(__dirname,"../template/views");
const partial_path = path.join(__dirname,"../template/partials");

app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views", views_path);
hbs.registerPartials(partial_path);

app.use(express.urlencoded({extended:false}))

app.get("/",(req,res)=>{
    res.status(201).render("index");
})

app.post("/contactmsg", async(req,res)=>{

    try {
        const contactMsgGet = new ContactMsg({
            contactName : req.body.contactName,
            contactEmail : req.body.contactEmail,
            contactMessage : req.body.contactMessage
        })
        
        const contactMsgSaved = await contactMsgGet.save();
        res.status(201).render("index");
        
    } catch (error) {
        res.status(400).send("error in saving contact message in db")
    }
})

app.post("/registration", async(req,res)=>{
    try {
        const SignUped = new NewUser({
            newName : req.body.newName,
            newEmail : req.body.newEmail,
            newPassword : req.body.newPassword,
            newDob : req.body.newDob
        })

        const registered = await SignUped.save();
        res.status(201).render("index");

    } catch (error) {
        res.status(400).send("Some error in Registration")
    }
})

app.post("/userLogin", async(req,res)=>{
    try {
        const email = req.body.userEmail;
        const password = req.body.userPassword;

        const useremail = await NewUser.findOne({newEmail:email});

        if(useremail.newPassword === password){
            res.status(201).render("private");
        }else{
            res.status(400).render("invalid",{
                output: "Password"
            })
        }

    } catch (error) {
        res.status(400).render("invalid",{
            output: "Email"
        })
    }
})

app.listen(port,()=>{
    console.log(`listening to the port : ${port}`)
})