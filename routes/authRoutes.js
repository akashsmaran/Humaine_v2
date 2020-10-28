var express = require('express');
var router = express.Router();

var authController = require('../controller/authController')


router.post('/signup', authController.signUp);
router.post('/login', authController.login);


module.exports = router;
