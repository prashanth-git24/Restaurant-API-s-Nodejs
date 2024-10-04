const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'user name is required']
    },
    email:{
        type:String,
        required:[true,'user name is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'user name is required'], 
    },
    address:{
        type:Array,
    },
    phone:{
        type:String,
        required:[true,'Phone Number is required'], 
    },
    usertype:{
        type:String,
        enum:['client','admin','vendor','driver'],
        default:'client'
      
    },
},{timestamps:true});

module.exports=mongoose.model('User',userschema);