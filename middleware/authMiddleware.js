const jwt = require("jsonwebtoken");
const {verify} = require("jsonwebtoken");
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

module.exports = {
    validateSignup,
    validateToken
}