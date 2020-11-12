var express = require('express');
var router = express.Router();

var authMiddleware = require('../middleware/authMiddleware');
var caseController = require('../controller/caseController');

router.get('/',authMiddleware.validateToken,caseController.getCase)

module.exports = router;
