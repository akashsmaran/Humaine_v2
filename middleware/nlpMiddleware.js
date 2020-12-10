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
        'http://aa04e4996f2824c7e8ee0c8006a93725-1422191672.us-east-2.elb.amazonaws.com:8000/api/conversations',
        bodyParameters,
        config
    ).then(res => {
        req.sender_id = res.data.sender_id;

        next();
    })
    .catch(error => {
        console.error(error)
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
        ' http://aa04e4996f2824c7e8ee0c8006a93725-1422191672.us-east-2.elb.amazonaws.com:8000/api/conversations/'+sender_id+'/messages',
        bodyParameters,
        config
    ).then(response => {
        req.sender_id = sender_id;
        req.comment = comment;
        next();
    })
        .catch(error => {
            console.log('here')
            console.log(error)
            return res.status(500).json({
                status: 0,
                message: error
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
        'http://aa04e4996f2824c7e8ee0c8006a93725-1422191672.us-east-2.elb.amazonaws.com:8000/api/conversations/'+sender_id+'/messages',
        config
    ).then(response => {
        req.sender_id = sender_id;
        req.comment = comment;
        req.intent = response.data.latest_message.intent.name;
        next();
    })
    .catch(error => {
        console.error(error)
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
            return res.status(200).json({
                status: 1,
                intent : null,
                message : 'I am not able to understand your question!'
            });
        }

    }
    catch (e) {
        console.log(e)
    }
}

module.exports = {
    getSenderId,
    updateMessage,
    getIntent,
    compareIntentAndMessage
}