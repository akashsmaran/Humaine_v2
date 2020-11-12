const {database} = require('../config/database');
const {ReasonPhrases,StatusCodes,getReasonPhrase,getStatusCode}=  require('http-status-codes');
const md5 = require('md5');

const getUser = async (req,res) => {
    const userId = req.params.userId;
    const getUserById = {
        text : 'SELECT id,email,status,name, title, institution, level_of_training, gender, country, date_of_birth FROM users WHERE id = $1',
        values : [userId]
    }
    try {
        const response  = await database.query(getUserById);
        if (!response.rows[0]) {
            return res.status(400).send({'message': 'The credentials you provided is incorrect'});
            res.status(400).json({
                status: 0,
                message: 'No user found',
            });
        }
        else {
            res.status(200).json({
                status: 1,
                message: 'success',
                user : response.rows[0]
            });
        }
    } catch(error) {
        res.status(500).json({
            status: 0,
            message: error
        });
    }
}

const activateUser = async (req,res,next) => {
    const userId = req.params.userId;
    const activateUser = {
        text : 'Update users SET status = 1 WHERE id = $1',
        values : [userId]
    }
    try {
        const query = database.query(activateUser).then(res => {
            // res.redirect(process.env.HOST_URL+'/reset-password');
        })
    } catch (err) {
        res.status(500).json({
            status: 0,
            message: callback(err)
        });
    }
}

const forgotPassword = async (req,res,next) => {
    const {email} = req.body;
    //check if email exists
    checkUserExists(email, (err,results)=> {
        if (err) {
            res.status(500).json({
                status: 0,
                message: err
            });
        }
        if (!results) {
            res.status(500).json({
                status: 0,
                message: 'User has not registered yet!'
            });
        }
        if (results.status == 0) {
            res.status(500).json({
                status: 0,
                message: 'User is not activated yet!'
            });
        }
        res.email = email;
        res.subject = 'Reset Password';
        res.body = '<p>Click <a href="'+process.env.HOST_URL+'/reset-password/' + results.userId + '">here</a> to reset your account</p>';
        res.status_message = true;
        next();
    });
}

function checkUserExists(email, callback){
    const getUserByEmail = {
        text : 'SELECT id,email,status FROM users WHERE email = $1',
        values : [email]
    }
    try {
        const query = database.query(getUserByEmail).then(res => {
            if(res.rows.length > 0){
                callback(null, {email : res.rows[0].email, status : res.rows[0].status, userId : res.rows[0].id})
            } else {
                callback(null)
            }
        })
    } catch (err) {
        callback(err);
    }
}

const resetPassword = async (req,res,next) => {
    const {userId, password} = req.body;
    let encryptPassword = md5(password);
    const updatePassword = {
        text : 'Update users SET password = $1 WHERE id = $2',
        values : [encryptPassword, userId]
    }
    try {
        const response  = await database.query(updatePassword);
        if (response.rowCount < 1) {
            res.status(400).json({
                status: 0,
                message: 'No user found',
            });
        }
        else {
            res.status(200).json({
                status: 1,
                message: 'Your password has been updated!'
            });
        }
    } catch (err) {
        res.status(500).json({
            status: 0,
            message: callback(err)
        });
    }
}

module.exports = {
    activateUser,
    forgotPassword,
    resetPassword,
    getUser
}