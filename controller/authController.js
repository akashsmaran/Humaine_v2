const {jwt,sign} = require("jsonwebtoken");
var bcrypt = require('bcrypt');

const {database} = require('../config/database');
const {ReasonPhrases,StatusCodes,getReasonPhrase,getStatusCode}=  require('http-status-codes');

const signUp = async (req,res) => {
    const {email, password, name, title, institution, levelOftraining, gender, country, dateOfBirth} = req.body;

    let encryptPassword = bcrypt.hash(password,10);
    const text = 'INSERT INTO users(email, password, name, title, institution, level_of_tranining, gender, country, date_of_birth ) VALUES($1, $2, $3, $4, $5, $6, $7 ,$8 ,$9 ) RETURNING *'
    const values = [email.trim(), encryptPassword, name.trim(), title.trim(), institution.trim(), levelOftraining.trim(), gender.trim(), country.trim(), dateOfBirth.trim()];
    try {
        const query = await database.query(text, values);
        res.status(200).json({
            'message' : 'User has been registered successfully. You will recieve an email shortly to activate your account.'
        });
    } catch (err) {
        res.status(500).json({
            'message' : err.stack
        });
    }
}

const login =  (req,res) => {
    const {email, password} = req.body;
    if(validateUser(req.body)){
       getUserByEmail(email, (err,results)=>{
            if(err){
                console.log(err);
            }
            if(!results){
                return res.json({
                    status : 0,
                    data : 'Invalid user or password'
                })
            }
            const result = bcrypt.compare(password, results.password);
            if(result){
                results.password = undefined;
                const jsonToken = sign({
                        username: "Ammar",
                        userID: 1
                    },
                    process.env.ACCESS_TOKEN_SECRET, {
                        expiresIn: "1hr"
                    },
                    function(err, token) {
                        if (err) {
                            console.log(err);
                        } else {
                            return res.json({
                                status : 1,
                                data : 'login success',
                                token : token
                            })
                        }
                    });
            }
       });

    } else {
        res.status(500).json({
            'message' : "Invalid User"
        });
    }

}

function getUserByEmail(email, callback){
    const getUserByEmail = {
        text : 'SELECT email,password FROM users WHERE email = $1',
        values : [email]
    }
    try {
        const query = database.query(getUserByEmail).then(res => {
            if(res.rows.length > 0){
                callback(null, {password : res.rows[0].password})
            } else {
                callback(null)
            }
        })
    } catch (err) {
        callback(err);
    }
}
function validateUser(user){
    const validEmail = typeof user.email == 'string' && user.email.trim() != '';
    const validPassword = typeof user.password == 'string' && user.password.trim() != '' && user.password.trim().length >= 6;
    return validEmail && validPassword;
}
const test = async (req,res) => {
    res.status(200).json({
        'message' : "great"
    });
}
module.exports = {
    signUp,
    login,
    test
}