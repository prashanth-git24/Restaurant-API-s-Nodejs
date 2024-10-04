const express =require('express');
const { createrestaurantcontroller,getallrestaurants, getbytitle,deletebytitle} = require('../controllers/restaurantcontroller');
const authmiddleware = require('../middlewares/authmiddleware');

const router =express.Router();

router.post('/create',authmiddleware,createrestaurantcontroller);

router.get('/getall',getallrestaurants);

router.get('/getbytitle/:title',getbytitle);

router.delete('/deletebytitle/:title',authmiddleware,deletebytitle);

module.exports= router;