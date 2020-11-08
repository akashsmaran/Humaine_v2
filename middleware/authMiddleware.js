const jwt = require("jsonwebtoken");
const {verify} = require("jsonwebtoken");
const validateSignup = async (req,res,next) => {
    const {email, password,dateOfBirth} = req.body;
    if(email){
        next();
    } else {
        return res.status(500).json('email required!')
    }
}
const validateToken = async (req,res,next) => {
    let token = req.get('authorization');
    console.log(token)
    if(token){
        token = token.slice(7);
        verify(token, process.env.ACCESS_TOKEN_SECRET,(err, decoded) =>{
            if(err){
                return res.json({
                    status : 0,
                    data : 'Invalid token'
                })
            } else {
                next();
            }
        })
    } else {
        res.json({
            success : 0,
            message : 'access denied! unauthorized user'
        })
    }
}

module.exports = {
    validateSignup,
    validateToken
}