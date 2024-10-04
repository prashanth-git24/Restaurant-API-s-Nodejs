const usermodel = require("../models/usermodel");
const bcrypt= require('bcrypt');
const getusercontroller = async (req,res) =>{
    try {
       const user = await usermodel.findById({_id : req.body.id});
     if(!user){
        return res.status(404).send({
            success:false,
            message:'User Not Found'
        })
     }
     user.password=undefined;
     res.status(200).send({
        success:true,
        mesage:"User get Successfully",
        user,
     });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Get User API',
            error
        });
    }
};
const updateusercontroller=async(req,res)=>{
    try {
        const user = await usermodel.findById({_id : req.body.id});
        if(!user){
            return res.status(404).send({
                success:false,
                message:'User Not Found',
            })
         }
         const {username,address,phone} = req.body;
         if(username) user.username = username;
         if(address) user.address = address;
         if(phone) user.phone = phone;
         await user.save();
         res.status(200).send({
            success:true,
            message:"User Updated Successfully",
         })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Get User API',
            error
        });
    }
};
const resetpasswordcontroller=async(req,res)=>{
    try {
        const user = await usermodel.findById({_id : req.body.id});
        if(!user){
            return res.status(404).send({
                success:false,
                message:'User Not Found',
            })
         }
         const {newpassword} = req.body;
         if(!newpassword){
            res.status(400).send({
                success:false,
                message:'Please Provide New Password',
                error
            });
         }

    var salt = bcrypt.genSaltSync(10);
    const hashpassword= await bcrypt.hash(newpassword,salt);
    user.password=hashpassword;
    await user.save();
    res.status(200).send({
       success:true,
       message:"Password Updated Successfully",
    })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:'Please Enter a newpassword field' 
        });
    }
};
const deletecontroller= async(req,res)=>{
try {
    const id = req.params.id;
   const user = await usermodel.findByIdAndDelete(id);
    if(!user){
        return res.status(404).send({
            success:false,
            message:'id Not Found',
        })
     }
     res.status(200).send({
        success:true,
        message:'User Deleted Successfully',
    })

} catch (error) {
    res.status(500).send({
        success:false,
        message:'Error in Password Reset API',
        error
    })
}
};

module.exports ={getusercontroller,updateusercontroller,resetpasswordcontroller,deletecontroller};