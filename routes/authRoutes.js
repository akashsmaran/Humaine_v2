var express = require('express');
var router = express.Router();

var authMiddleware = require('../middleware/authMiddleware')
var authController = require('../controller/authController');


router.post('/signup',authMiddleware.validateSignup, authController.signUp);
router.post('/login', authController.login);
router.get('/test',authMiddleware.validateToken,authController.test)


module.exports = router;
