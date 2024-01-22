const jwt = require("jsonwebtoken");
const NewUser = require("../models/signupSch");

const auth = async(req,res, next) =>{
    try {
        const token = req.cookies.jwt;

        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        console.log(verifyUser);

        const user = await NewUser.findOne({_id:verifyUser.id})
        console.log(user);

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