const mongoose = require("mongoose");

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
    }
})

const NewUser = mongoose.model("newUser", signUpSch);

module.exports = NewUser;