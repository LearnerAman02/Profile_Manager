//database will not be created directly jab tak hum document(object) nhi banayenge which we have to send in database
const mongoose = require("mongoose");

//create schema(schema will be stored in database)
const userSchema = new mongoose.Schema({
  name : {
    type:String,
    required:true 
  },
  email : {
    type:String,
    unique:true,
    required:true,
  },
  age : {
    type:Number,
  },
},{timestamps:true});// so that time bhi saath mein jaayega in the databases

// create Model(with the help of model we will be able to perform CRUD operations)
const User = mongoose.model('User',userSchema);

module.exports = User;