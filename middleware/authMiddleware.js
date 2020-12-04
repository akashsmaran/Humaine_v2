const jwt = require("jsonwebtoken");
const {verify} = require("jsonwebtoken");
const axios = require("axios");

const validateSignup = async (req,res,next) => {
    const {email, password,dateOfBirth} = req.body;
    if(email){
        next();
    } else {
        res.status(500).json({
            status : 0,
            message : "Email required"
        });
    }
}
const validateToken = async (req,res,next) => {
    let token = req.get('authorization');
    if(token){
        token = token.slice(7);
        verify(token, process.env.ACCESS_TOKEN_SECRET,(err, decoded) =>{
            if(err){
                res.status(400).json({
                    status: 0,
                    message: 'Invalid token',
                });
            } else {
                next();
            }
        })
    } else {
        res.status(401).json({
            status: 0,
            message : 'Access denied! unauthorized user'
        });
    }
}

const nlpLogin = async (req,res,next) => {
    axios
        .post('http://aa04e4996f2824c7e8ee0c8006a93725-1422191672.us-east-2.elb.amazonaws.com:8000/api/auth',{"username":"me","password":'rasarasa'})
        .then(res => {
            let token = res.data.access_token
            req.nlpToken =  token;
            next();
        })
        .catch(error => {
            console.error(error)
        });
}

module.exports = {
    validateSignup,
    validateToken,
    nlpLogin
}