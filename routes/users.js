var express = require('express');
var router = express.Router();
var userController = require('../controller/userController');
var emailMiddleware = require('../middleware/sendEmail')
var authMiddleware = require('../middleware/authMiddleware')
router.get('/',authMiddleware.validateToken,userController.getUser);
router.get('/activate/:userId',userController.activateUser);
router.post('/forgot-password',userController.forgotPassword, emailMiddleware.sendEmail);
router.post('/reset-password',userController.resetPassword);
router.get('/health',userController.health);


module.exports = router;
