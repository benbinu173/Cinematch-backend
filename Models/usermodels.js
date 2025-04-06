// MODELS will be used here.

// while creating the modal name and the collectioon shud be the same.

// import
const mongoose = require('mongoose')

// creation of the schema 
const userSchema = new mongoose.Schema({

    username : {
        required : true,
        type : String
    },
    email : {
        required : true,
        type : String,
        unique : true
    },
    password : {
       required : true,
        type : String
    },
    
    

})

// creating the model
const users = mongoose.model("users", userSchema)
// here the name users shud be the same of the collection which was created in the mongodb
// export model 
module.exports = users