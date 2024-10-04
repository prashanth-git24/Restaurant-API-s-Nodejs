const express =require('express');
const {createcontroller,getAllCatController,updateCatController,deleteCatController} = require('../controllers/categorycontroller');
const authmiddleware = require('../middlewares/authmiddleware');

const router =express.Router();

router.post('/create',authmiddleware,createcontroller);
router.get("/getAll", getAllCatController);

router.put("/update/:id", authmiddleware, updateCatController);

router.delete("/delete/:id", authmiddleware, deleteCatController);

module.exports= router;