const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const signUpSch = mongoose.Schema({
    newName : {
        type : String,
        require : true
    },
    newEmail : {
        type : String,
        require : true,
        unique : true,
        lowercase :true
    },
    newPassword : {
        type : String,
        require : true
    },
    newDob : {
        type : String,
        require : true
    },
    tokens:[{
        token:{
            type : String,
            require : true
        }
    }]
})

signUpSch.methods.getToken = async function(){
    try {
        const token = await jwt.sign({id:this._id.toString()},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        console.log("token went to tokens");
        await this.save();
        return token;
    } catch (error) {
        console.log("error in getToken method : "+ error);
    }
}

const NewUser = mongoose.model("newUser", signUpSch);

module.exports = NewUser;