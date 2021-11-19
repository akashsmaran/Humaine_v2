var express = require("express");
var router = express.Router();

var authMiddleware = require("../middleware/authMiddleware");
var emailMiddleware = require("../middleware/sendEmail");
var authController = require("../controller/authController");
var nlpMiddleware = require("../middleware/nlpMiddleware");

router.post(
  "/signup",
  authMiddleware.validateSignup,
  authController.signUp,
  emailMiddleware.sendEmail
);
router.post(
  "/login",
  authMiddleware.nlpLogin,
  nlpMiddleware.getSenderId,
  authController.login
);
router.get("/test", authMiddleware.validateToken, authController.test);

module.exports = router;
