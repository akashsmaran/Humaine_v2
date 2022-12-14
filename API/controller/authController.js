const { jwt, sign } = require("jsonwebtoken");
const md5 = require("md5");
const { database } = require("../config/database");
const {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} = require("http-status-codes");

function checkUserExists(email, callback) {
  const getUserByEmail = {
    text: "SELECT id,email,status FROM users WHERE email = $1",
    values: [email],
  };
  try {
    const query = database.query(getUserByEmail).then((res) => {
      if (res.rows.length > 0) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    });
  } catch (err) {
    callback(err);
  }
}

const signUp = async (req, res, next) => {
  let {
    email,
    password,
    name,
    lastName,
    institution,
    levelOfTraining,
    gender,
    country,
    dateOfBirth,
  } = req.body;

  let encryptPassword = await md5(password);

  checkUserExists(email, (err, result) => {
    if (result == true) {
      res.status(500).json({
        status: 0,
        message:
          "User with this email already exists, if you have forgotten your password, please reset it.",
      });
    }
  });
  const text =
    "INSERT INTO users(email, password, name, last_name, institution, level_of_training, gender, country, date_of_birth ) VALUES($1, $2, $3, $4, $5, $6, $7 ,$8 ,$9 ) RETURNING *";
  const values = [
    email.trim(),
    encryptPassword,
    name,
    lastName,
    institution,
    levelOfTraining,
    gender,
    country,
    (dateOfBirth = "1993-03-18"),
  ];
  gender = "male";
  dateOfBirth = 1993 - 03 - 18;
  try {
    const query = await database
      .query(text, values)
      .then((res) => {
        return {
          email: res.rows[0].email,
          userId: res.rows[0].id,
        };
      })
      .then((obj) => {
        // add an id here which you will use in the next step for choosing which template id to send
        // like res.templateId
        res.email = obj.email;
        res.name = obj.name;
        res.subject = "Account activation";
        res.params = { userId: obj.userId, name: obj.name };
        res.templateId = 1; // This number is taken from the sendinblue email id for the respective template
        res.body = `
        <p>
        A user account has been created with this email address for Humaine. Please confirm that this is you.
        </p>
        <br>
        
        <a href="https://humaine.ai/api/users/activate/${obj.userId}">
        <button> 
        Yes this is me
        </button>
        </a> 
        
        <br>
        <p>
        If you have received this email in error, please ignore it. For any questions, please reach out to us at info@humaine.ai
        </p>
        `;
        next();
      });
    res.status(200).json({
      status: 1,
      message:
        "User has been registered successfully. You will recieve an email shortly to activate your account.",
    });
  } catch (err) {
    res.status(500).json({
      status: 0,
      message: err.stack,
    });
  }
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (validateUser(req.body)) {
    getUserByEmail(email, password, (err, results) => {
      if (err) {
        res.status(500).json({
          message: err,
          status: 0,
        });
      }
      if (!results) {
        return res.status(400).json({
          status: 0,
          message: "Invalid user or password",
        });
      }
      if (results.status == 0) {
        return res.status(400).json({
          status: 0,
          message: "User is not activated yet!",
        });
      }

      if (results) {
        const jsonToken = sign(
          {
            username: results.name,
            userID: results.id,
            senderId: req.sender_id,
            nlpToken: req.nlpToken,
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "24hr",
          },
          function (err, token) {
            if (err) {
              return res.status(500).json({
                status: 0,
                message: err,
              });
            } else {
              return res.status(200).json({
                status: 1,
                message: "login success",
                token: token,
              });
            }
          }
        );
      } else {
        res.status(500).json({
          message: "Error in compairing password",
          status: 0,
        });
      }
    });
  } else {
    res.status(500).json({
      status: 0,
      message: "Invalid User",
    });
  }
};

function getUserByEmail(email, password, callback) {
  const getUserByEmail = {
    text: "SELECT id,name,email,password,status FROM users WHERE email = $1 AND password = $2",
    values: [email, md5(password)],
  };

  try {
    const query = database.query(getUserByEmail).then((res) => {
      if (res.rows.length > 0) {
        callback(null, {
          id: res.rows[0].id,
          name: res.rows[0].name,
          email: res.rows[0].email,
          password: res.rows[0].password,
          status: res.rows[0].status,
        });
      } else {
        callback(null);
      }
    });
  } catch (err) {
    callback(err);
  }
}
function validateUser(user) {
  const validEmail = typeof user.email == "string" && user.email.trim() != "";
  const validPassword =
    typeof user.password == "string" &&
    user.password.trim() != "" &&
    user.password.trim().length >= 6;
  return validEmail && validPassword;
}
const test = async (req, res, next) => {
  res.email = "ammar@asdad";
  next();
  res.status(200).json({
    message: "great",
  });
};
module.exports = {
  signUp,
  login,
  test,
};
