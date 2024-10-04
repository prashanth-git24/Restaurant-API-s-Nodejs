const usermodel = require("../models/usermodel");
const bcrypt= require('bcrypt');
const JWT= require('jsonwebtoken');
const SECRET='$prashanth';
const registercontroller = async(req,res)=>{
    try{
   const {username,email,password,phone,address,usertype}= req.body;
   if(!username || !email || !password || !phone || !address){
 return res.status(400).send({
    success:false,
    message:'Please Provide All fields',
 });
   }
   const existinguser = await usermodel.findOne({email});
   if(existinguser){
    return res.status(409).send({
        success:false,
        message:'Email Already Exists',
     });
   }
   var salt = bcrypt.genSaltSync(10);
   const hashpassword= await bcrypt.hash(password,salt);
   const user= await usermodel.create({
    username,email,password:hashpassword,address,phone,usertype:usertype
 });
 res.status(201).send({
    success:true,
    message:'Successfully Registered',
 });
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            sucess:false,
            message:'Error in Register API',
            error
        })
    }
};

const logincontroller = async (req,res)=>{
try {
    const {email,password}= req.body;
    if(!email || !password){
        return res.status(400).send({
            success:false,
            message:'Email and Password are required',
        });
    }
    const user =await usermodel.findOne({email});
    if(!user){
        return res.status(404).send({
            success:false,
            message:'User Not Found'
        });
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch) {
        return res.status(404).send({
            success:false,
            message:'Wrong Password',
        });
    }
    const token = JWT.sign({id:user._id},SECRET,{
     expiresIn:"1h",   
    });
    user.password=undefined;
    res.status(200).send({
        success:true,
        message:"Login Successfully",
        user,
        token
    });
} catch (error) {
  console.log(error);
  res.status(500).send({
    success:false,
    message:'Error in Login API',
    error
  });  
}
};

module.exports={registercontroller,logincontroller};