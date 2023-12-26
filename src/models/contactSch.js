const mongoose = require("mongoose");

const contactSch = mongoose.Schema({
    contactName : {
        type : String,
        require : true
    },
    contactEmail : {
        type : String,
        require : true,
        lowercase :true
    },
    contactMessage : {
        type : String,
        require : true
    }
})

const ContactMsg = mongoose.model("ContactMsg",contactSch);

module.exports = ContactMsg;