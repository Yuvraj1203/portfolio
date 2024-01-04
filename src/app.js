const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
require("./db/conn");
const ContactMsg = require("./models/contactSch");
const NewUser = require("./models/signupSch");
const bcrypt = require("bcryptjs");

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
        res.status(400).render("error",{
            output: "Server issue"
        })
    }
})

app.post("/registration", async(req,res)=>{
    try {

        const password = req.body.newPassword;

        const passHashing = async(password)=>{
            const hashing = await bcrypt.hash(password,4);

            const SignUped = new NewUser({
                newName : req.body.newName,
                newEmail : req.body.newEmail,
                newPassword : hashing,
                newDob : req.body.newDob
            })
    
            const registered = await SignUped.save();
            res.status(201).render("index");
        }

        passHashing(password);


    } catch (error) {
        res.status(400).render("error",{
            output: "Server issue"
        })
    }
})

app.post("/userLogin", async(req,res)=>{
    try {
        const email = req.body.userEmail;
        const password = req.body.userPassword;

        const useremail = await NewUser.findOne({newEmail:email});
        const userpass = await useremail.newPassword;

        const passMatching = async(password,userpass)=>{
            const matching = await bcrypt.compare(password,userpass);
            
            if(matching){
                res.status(201).render("private");
            }else{
                res.status(400).render("invalid",{
                    output: "Invalid Password"
                })
            }
        }   
        passMatching(password,userpass);     

    } catch (error) {
        res.status(400).render("invalid",{
            output: "Invalid Email"
        })
    }
})

app.listen(port,()=>{
    console.log(`listening to the port : ${port}`)
})