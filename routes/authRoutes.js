const express =require('express');
const { registercontroller, logincontroller } = require('../controllers/authcontroller');

const router =express.Router();

router.post('/register',registercontroller);

router.post('/login', logincontroller);

module.exports= router;