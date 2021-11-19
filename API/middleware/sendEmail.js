var nodemailer = require("nodemailer");

var SibApiV3Sdk = require("sib-api-v3-sdk");

const sendEmail2 = (req, res, next) => {
  var email = res.email;
  var subject = res.subject;
  var body = res.body;

  var transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    // service: "gmail",
    // ignoreTLS: false,
    // secure: false,
    auth: {
      user: process.env.SENDINBLUE_EMAIL,
      pass: process.env.SENDINBLUE_PASSWORD,
    },
  });
  var mailOptions = {
    from: "humaine.ai@gmail.com",
    to: email,
    subject: res.subject,
    html: res.body,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      if ((res.status_message = true)) {
        res.status(200).json({
          status: 1,
          message:
            "An email has been sent to your account. Please follow the instructions to complete the process",
        });
      }
    }
  });
};

//  Cannot be integrated because this component is used for all kinds of emails and not verification email alone
// Can try to integrate by sending another id component along with the response to
//  figure out what kind of email to send

const sendEmail = (req, res, next) => {
  var defaultClient = SibApiV3Sdk.ApiClient.instance;

  // Configure API key authorization: api-key
  var apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey =
    "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";

  var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email

  sendSmtpEmail = {
    to: [
      {
        email: res.email,
        // name: "John Doe",
      },
    ],
    templateId: res.templateId,
    params: {
      // name: "John",
      // surname: "Doe",
      ...res.params,
    },
    headers: {
      "X-Mailin-custom":
        "'accept: application/json'|'content-type: application/json'",
    },
  };

  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    function (data) {
      console.log(data);
    },
    function (error) {
      console.error(error.response.text);
    }
  );
};

module.exports = {
  sendEmail,
};
