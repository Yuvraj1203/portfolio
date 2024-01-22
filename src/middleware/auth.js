const jwt = require("jsonwebtoken");
const NewUser = require("../models/signupSch");

const auth = async(req,res, next) =>{
    try {
        const token = req.cookies.jwt;
        console.log("1st phase" + token)

        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        console.log(verifyUser);
        console.log("2nd phase")


        const user = await NewUser.findOne({_id:verifyUser.id})
        console.log(user);
        console.log("3rd phase")


        req.user = user;
        req.token = token;
    
        next();
    } catch (error) {
        // res.status(401).render(`something wrong in Auth : ${error}`)
        res.status(400).render("error",{
            output: `Please Authenticate First, Error : ${error}`
        })
    }
}

module.exports = auth;