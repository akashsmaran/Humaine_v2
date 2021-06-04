const jwt = require("jsonwebtoken");
const { verify } = require("jsonwebtoken");
const axios = require("axios");

const validateSignup = async (req, res, next) => {
  const { email, password } = req.body;
  const validEmail = typeof email == "string" && email.trim() != "";
  const validPassword =
    typeof password == "string" &&
    password.trim() != "" &&
    password.trim().length >= 6;
  if (validEmail && validPassword) {
    next();
  } else {
    res.status(500).json({
      status: 0,
      message:
        "Please check your email and password. Your password should be greater then or equal to 6 characters",
    });
  }
};
const validateToken = async (req, res, next) => {
  let token = req.get("authorization");
  if (token) {
    token = token.slice(7);
    verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(400).json({
          status: 0,
          message: "Invalid token",
          errorMsg: err,
        });
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({
      status: 0,
      message: "Access denied! unauthorized user",
    });
  }
};

const nlpLogin = async (req, res, next) => {
  axios
    .post(
      "http://a3514d41916e9434e89ce7affed85dc9-1560023551.us-east-2.elb.amazonaws.com:8000/api/auth",
      { username: "me", password: "rasarasa" }
    )
    .then((res) => {
      let token = res.data.access_token;
      req.nlpToken = token;
      next();
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = {
  validateSignup,
  validateToken,
  nlpLogin,
};
