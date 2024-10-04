const express =require('express');
const { getusercontroller,updateusercontroller,resetpasswordcontroller,deletecontroller} = require('../controllers/usercontroller');
const authmiddleware = require('../middlewares/authmiddleware');

const router =express.Router();

router.get('/getuser',authmiddleware,getusercontroller);

router.put('/updateuser',authmiddleware,updateusercontroller);

router.put('/resetpassword',authmiddleware,resetpasswordcontroller);

router.delete('/deleteuser/:id',authmiddleware,deletecontroller)

module.exports= router;