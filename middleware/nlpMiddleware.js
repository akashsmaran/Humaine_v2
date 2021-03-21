const jwt = require("jsonwebtoken");
const {verify} = require("jsonwebtoken");
const axios = require("axios");
const jwtDecode = require("jwt-decode");
const fs = require('fs');

const getSenderId = async (req,res,next) => {
    const {message} = req.body;
    let nlpToken = req.nlpToken;
    const config = {
        headers: { Authorization: `Bearer ${nlpToken}` }
    };
    const bodyParameters = {
        message: message
    };
    axios.post(
        ' http://a3514d41916e9434e89ce7affed85dc9-1560023551.us-east-2.elb.amazonaws.com:8000/api/conversations',
        bodyParameters,
        config
    ).then(res => {
        req.sender_id = res.data.sender_id;

        next();
    })
    .catch(error => {
        return res.status(500).json({
            status: 0,
            message: 'Something went wrong. Please try again later',
            server : error
        });

    });
}

const updateMessage = async (req,res,next) => {
    let token = req.headers.authorization;
    let userInfo = jwtDecode(token);
    const {comment} = req.body;
    const sender_id = userInfo.senderId;

    const config = {
        headers: { Authorization: `Bearer ${userInfo.nlpToken}` }
    };
    const bodyParameters = {
        message: comment
    };
    axios.post(
        ' http://a3514d41916e9434e89ce7affed85dc9-1560023551.us-east-2.elb.amazonaws.com:8000/api/conversations/'+sender_id+'/messages',
        bodyParameters,
        config
    ).then(response => {
        req.sender_id = sender_id;
        req.comment = comment;
        next();
    })
        .catch(error => {
            return res.status(500).json({
                status: 0,
                message: 'Something went wrong. Please try again later',
                server : error
            });
        });
}

const getIntent = async (req,res,next) => {
    let token = req.headers.authorization;
    let userInfo = jwtDecode(token);

    const sender_id = userInfo.senderId;
    const {comment} = req.body;

    const config = {
        headers: { Authorization: `Bearer ${userInfo.nlpToken}` }
    };
    const bodyParameters = {
        message: comment
    };
    axios.get(
        ' http://a3514d41916e9434e89ce7affed85dc9-1560023551.us-east-2.elb.amazonaws.com:8000/api/conversations/'+sender_id+'/messages',
        config
    ).then(response => {
        req.sender_id = sender_id;
        req.comment = comment;
        req.intent = response.data.latest_message.intent.name;
        next();
    })
    .catch(error => {
        return res.status(500).json({
            status: 0,
            message: 'Something went wrong. Please try again later',
            server : error
        });
    });
}

const compareIntentAndMessage = async (req,res,next) => {
    const {message, sender_id,intent} = req;
    let rawdata = fs.readFileSync(process.env.INTENT_PATH);
    let intentsList = JSON.parse(rawdata);
    let result;
    try{
        let intentListExists = Object.keys(intentsList).includes(intent);

        if(intentListExists){
            result = Object.keys(intentsList).forEach(function(key) {
                if(key === intent){
                    req.intent = intent;
                    req.intentList = intentsList[key];
                    next();
                }
            });
        } else {
            req.intent = 'NA';
            req.intentList = '';
            next();
        }

    }
    catch (e) {
        return res.status(500).json({
            status: 0,
            message: 'Something went wrong. Please try again later',
            server : error
        });
    }
}

module.exports = {
    getSenderId,
    updateMessage,
    getIntent,
    compareIntentAndMessage
}