const {jwt,sign} = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const sendEmail = require('../middleware/sendEmail')
const {database} = require('../config/database');
const {ReasonPhrases,StatusCodes,getReasonPhrase,getStatusCode}=  require('http-status-codes');

const signUp = async (req,res,next) => {
    const {email, password, name, title, institution, levelOftraining, gender, country, dateOfBirth} = req.body;

    const saltRounds = 10;
    let encryptPassword = await bcrypt.hash(password, saltRounds);

    const text = 'INSERT INTO users(email, password, name, title, institution, level_of_tranining, gender, country, date_of_birth ) VALUES($1, $2, $3, $4, $5, $6, $7 ,$8 ,$9 ) RETURNING *'
    const values = [email.trim(), encryptPassword, name.trim(), title.trim(), institution.trim(), levelOftraining.trim(), gender.trim(), country.trim(), dateOfBirth.trim()];
    try {
        const query = await database.query(text, values).then((res) => {
            return {
                email : res.rows[0].email,
                userId : res.rows[0].id
            };
        }).then((obj) => {
            res.email = obj.email;
            res.subject = 'Account activation';
            res.body = '<p>Click <a href="http://localhost:3000/users/activate/' + obj.userId + '">here</a> to activate your account</p>'
            next();
        });
        res.status(200).json({
            status : 1,
            message : 'User has been registered successfully. You will recieve an email shortly to activate your account.'
        });
    } catch (err) {
        res.status(500).json({
            status : 0,
            message : err.stack
        });
    }
}

const login =  (req,res) => {
    const {email, password} = req.body;
    if(validateUser(req.body)){
       getUserByEmail(email, (err,results)=>{
            if(err){
                res.status(500).json({
                    message : err,
                    status : 0
                });
            }
            if(!results){
                return res.json({
                    status : 0,
                    message : 'Invalid user or password'
                })
            }
            if(results.status == 0){
                return res.json({
                    status : 0,
                    message : 'Use is not activated yet!'
                })
            }
            const result = bcrypt.compare(password, results.password);
            if(result){
                results.password = undefined;
                const jsonToken = sign({
                        username: results.name,
                        userID: results.id
                    },
                    process.env.ACCESS_TOKEN_SECRET, {
                        expiresIn: "24hr"
                    },
                    function(err, token) {
                        if (err) {
                            return res.json({
                                status : 0,
                                message : err
                            })
                        } else {
                            return res.json({
                                status : 1,
                                message : 'login success',
                                token : token
                            })
                        }
                    });
            } else {
                res.status(500).json({
                    message : "Error in compairing password",
                    status : 0
                });
            }
       });
    } else {
        res.status(500).json({
            status : 0,
            message : "Invalid User"
        });
    }

}

function getUserByEmail(email, callback){
    const getUserByEmail = {
        text : 'SELECT password,status FROM users WHERE email = $1',
        values : [email]
    }
    try {
        const query = database.query(getUserByEmail).then(res => {
            if(res.rows.length > 0){
                callback(null, {password : res.rows[0].password, status : res.rows[0].status})
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
const test = async (req,res,next) => {
    res.email = 'ammar@asdad';
    next();
    res.status(200).json({
        'message' : "great"
    });
}
module.exports = {
    signUp,
    login,
    test
}