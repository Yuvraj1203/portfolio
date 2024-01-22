const jwt = require("jsonwebtoken");
const NewUser = require("../models/signupSch");

const auth = async(req,res, next) =>{
    try {
        try {
            const token = req.cookies.jwt;
            return token;
        } catch (error) {
            res.status(400).render("error",{
                output: `error in first phase : ${error}`
            })
        }

        try {
            const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
            console.log(verifyUser);
            return verifyUser;
        } catch (error) {
            res.status(400).render("error",{
                output: `Error in verifcation : ${error}`
            })
        }

        try {
            const user = await NewUser.findOne({_id:verifyUser.id})
            console.log(user);
            return user;
        } catch (error) {
            res.status(400).render("error",{
                output: `Error in 3rd phase : ${error}`
            })
        }



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