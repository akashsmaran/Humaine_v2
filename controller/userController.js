const {database} = require('../config/database');
const {ReasonPhrases,StatusCodes,getReasonPhrase,getStatusCode}=  require('http-status-codes');

const activateUser = async (req,res,next) => {
    const userId = req.params.userId;
    const activateUser = {
        text : 'Update users SET status = 1 WHERE id = $1',
        values : [userId]
    }
    try {
        const query = database.query(activateUser).then(res => {
            console.log('success!')
        })
    } catch (err) {
        callback(err);
    }
}
module.exports = {
    activateUser
}