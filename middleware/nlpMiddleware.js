const jwt = require("jsonwebtoken");
const {verify} = require("jsonwebtoken");
const axios = require("axios");
const jwtDecode = require("jwt-decode");

const getSenderId = async (req,res,next) => {
    const {message} = req.body;
    let token = req.headers.authorization;
    let userInfo = jwtDecode(token);
    const config = {
        headers: { Authorization: `Bearer ${userInfo.nlpToken}` }
    };
    const bodyParameters = {
        message: message
    };
    axios.post(
        ' http://aa04e4996f2824c7e8ee0c8006a93725-1422191672.us-east-2.elb.amazonaws.com:8000/api/conversations',
        bodyParameters,
        config
    ).then(res => {
        req.sender_id = res.data.sender_id;
        req.message = message;
        next();
    })
    .catch(error => {
        console.error(error)
    });
}

module.exports = {
    getSenderId
}