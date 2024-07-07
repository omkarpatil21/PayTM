const mongoose = require('mongoose')
const {DB_URL}=  require("./config");
mongoose.connect(DB_URL)

const userSchema=mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        minLenth : 5
    },
    lastName : {
        type : String,
        required : true,
        minLenth : 5
    },
    username :{
        type: String,
        required : true,
        unique : true,
        minLenth : 5
    },
    password : {
        type : String,
        required : true,
        minLenth : 5
    }
})

const User  = mongoose.model('User',userSchema);

const accountSchema = mongoose.Schema({
    userId : {
        type :  mongoose.Schema.Types.ObjectId,
        ref : User
    },
    balance : Number
})

const Account = mongoose.model('Account',accountSchema);
module.exports = {
    User,
    Account
}