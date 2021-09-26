const { database } = require("../config/database");
const {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} = require("http-status-codes");
const md5 = require("md5");
const jwtDecode = require("jwt-decode");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
cloudinary.config({
  cloud_name: "home-tutor",
  api_key: "935911474249697",
  api_secret: "IKj8Ghx6Grhvy-zS28gnZVftDT8",
});

const getUser = async (req, res) => {
  let token = req.headers.authorization;
  let userInfo = jwtDecode(token);

  const getUserById = {
    text: "SELECT id,email,status, image, name, last_name, institution, level_of_training, gender, country, date_of_birth FROM users WHERE id = $1",
    values: [userInfo.userID],
  };
  try {
    const response = await database.query(getUserById);
    if (!response.rows[0]) {
      return res
        .status(400)
        .send({ message: "The credentials you provided is incorrect" });
      res.status(400).json({
        status: 0,
        message: "No user found",
      });
    } else {
      res.status(200).json({
        status: 1,
        message: "success",
        user: response.rows[0],
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 0,
      message: error,
    });
  }
};

const updateUser = async (req, res, next) => {
  const {
    name,
    lastName,
    institution,
    levelOftraining,
    gender,
    country,
    dateOfBirth,
  } = req.body;
  let token = req.headers.authorization;
  let userInfo = jwtDecode(token);
  const updateUserInfo = {
    text: "Update users SET name = $2, institution = $3, level_of_training = $4, gender = $5, country = $6, date_of_birth = $7,last_name = $8 WHERE id = $1",
    values: [
      userInfo.userID,
      name,
      institution,
      levelOftraining,
      gender,
      country,
      dateOfBirth,
      lastName,
    ],
  };
  try {
    const response = await database.query(updateUserInfo);
    if (response.rowCount < 1) {
      res.status(400).json({
        status: 0,
        message: "No user found",
      });
    } else {
      res.status(200).json({
        status: 1,
        message: "User has been updated!",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 0,
      message: err,
    });
  }
};

const activateUser = async (req, res, next) => {
  const userId = req.params.userId;
  const activateUser = {
    text: "Update users SET status = 1 WHERE id = $1",
    values: [userId],
  };
  try {
    const query = await database.query(activateUser);
    if (query.rowCount > 0) {
      res.redirect(process.env.HOST_FRONT_URL);
    } else {
      res.status(500).json({
        status: 0,
        message: "Unable to activate the user",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 0,
      message: err,
    });
  }
};

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  //check if email exists
  checkUserExists(email, (err, results) => {
    if (err) {
      res.status(500).json({
        status: 0,
        message: err,
      });
    }
    if (!results) {
      res.status(500).json({
        status: 0,
        message: "User has not registered yet!",
      });
    }
    if (results.status == 0) {
      res.status(500).json({
        status: 0,
        message: "User is not activated yet!",
      });
    }
    res.email = email;
    res.subject = "Reset Password";
    res.body =
      '<p>Click <a href="' +
      process.env.HOST_FRONT_URL +
      "/reset-password/" +
      results.userId +
      '">here</a> to reset your account</p>';
    res.status_message = true;
    next();
  });
};

function checkUserExists(email, callback) {
  const getUserByEmail = {
    text: "SELECT id,email,status FROM users WHERE email = $1",
    values: [email],
  };
  try {
    const query = database.query(getUserByEmail).then((res) => {
      if (res.rows.length > 0) {
        callback(null, {
          email: res.rows[0].email,
          status: res.rows[0].status,
          userId: res.rows[0].id,
        });
      } else {
        callback(null);
      }
    });
  } catch (err) {
    callback(err);
  }
}

const resetPassword = async (req, res, next) => {
  const { userId, password } = req.body;
  let encryptPassword = md5(password);
  const updatePassword = {
    text: "Update users SET password = $1 WHERE id = $2",
    values: [encryptPassword, userId],
  };
  try {
    const response = await database.query(updatePassword);
    if (response.rowCount < 1) {
      res.status(400).json({
        status: 0,
        message: "No user found",
      });
    } else {
      res.status(200).json({
        status: 1,
        message: "Your password has been updated!",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 0,
      message: callback(err),
    });
  }
};
const uploadProfileImage = async (req, resp) => {
  let token = req.headers.authorization;
  let userInfo = jwtDecode(token);
  try {
    //Make sure a file is uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
      return resp.status(400).send("No files were uploaded.");
    }
    let cld_upload_stream = cloudinary.uploader.upload_stream(
      {
        folder: "humaine",
      },
      function (error, result) {
        console.log("Stream upload :", error, result);
        if (error) {
          return resp
            .status(400)
            .json({ error: "Something went wrong while uploading image" });
        }

        const imageUser = {
          text: "Update users SET image = $1 WHERE id = $2",
          values: [result.secure_url, userInfo.userID],
        };
        try {
          const query = database.query(imageUser);
          resp.status(200).json({ image_url: result.secure_url });
        } catch (err) {
          resp.status(500).json({
            status: 0,
            message: err,
          });
        }
      }
    );

    const resultUploaded = await streamifier
      .createReadStream(req.files.file.data)
      .pipe(cld_upload_stream);
  } catch (err) {
    console.log("Error in uploading image ", err);
  } finally {
    console.log("Image upload end point hitted");
  }
};
const health = async (req, res) => {
  res.status(200).json({
    status: 1,
    message: "Server Is running",
  });
};
module.exports = {
  getUser,
  updateUser,
  activateUser,
  forgotPassword,
  resetPassword,
  health,
  uploadProfileImage,
};
