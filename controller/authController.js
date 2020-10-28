const {database} = require('../config/database');
const signUp = async (req,res) => {
    // const {email, password, confirm_password, username, title, level_of_training, institution, gender, birthday, country} = req.body;
    const {email, password} = req.body;
    const text = 'INSERT INTO users(email, password) VALUES($1, $2) RETURNING *'
    const values = ['brianc', 'brian.m.carlson@gmail.com']
    try {
        const res = await database.query(text, values)
        console.log(res.rows[0])
        // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
    } catch (err) {
        console.log(err.stack)
    }
}

const login = (req,res) => {
    const {email, password} = req.body;
    console.log(email, password)
    return res.send('login post');
}
module.exports = {
    signUp,
    login
}