const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
    username: {
        type: String
    },
    emailId: {
        type:String
    },
    password: {
        type:String
    },
    question: {
        type:String
    },
    answer: {
        type:String
    },
    secret: {
        type:String
    }
    
})


module.exports = mongoose.model('User', UsersSchema);