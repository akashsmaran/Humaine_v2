const {database} = require('../config/database');
const {ReasonPhrases,StatusCodes,getReasonPhrase,getStatusCode}=  require('http-status-codes');
const md5 = require('md5');
const jwtDecode = require('jwt-decode');

const getCase = async (req,res) => {
    let token = req.headers.authorization;
    let userInfo = jwtDecode(token);

    res.status(200).json({
        status: 1,
        message: 'You are good to start working with case page now!'
    });
}


module.exports = {
    getCase,
}