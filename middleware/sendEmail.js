var nodemailer = require('nodemailer');
const sendEmail = (req,res,next) => {
    var email = res.email;
    var subject = res.subject;
    var body = res.body;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_EMAIL,
            pass: process.env.GMAIL_PASSWORD
        }
    });
    var mailOptions = {
        from: 'ammaryousaf6@gmail.com',
        to: email,
        subject: res.subject,
        html: res.body
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}


module.exports = {
    sendEmail
}