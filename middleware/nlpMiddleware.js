const jwt = require("jsonwebtoken");
const { verify } = require("jsonwebtoken");
const axios = require("axios");
const jwtDecode = require("jwt-decode");
const fs = require("fs");
const { database } = require("../config/database");

const getSenderId = async (req, res, next) => {
  const { message } = req.body;
  let nlpToken = req.nlpToken;
  const config = {
    headers: { Authorization: `Bearer ${nlpToken}` },
  };
  const bodyParameters = {
    message: message,
  };
  axios
    .post(
      " http://a3514d41916e9434e89ce7affed85dc9-1560023551.us-east-2.elb.amazonaws.com:8000/api/conversations",
      bodyParameters,
      config
    )
    .then((res) => {
      req.sender_id = res.data.sender_id;

      next();
    })
    .catch((error) => {
      return res.status(500).json({
        status: 0,
        message: "Something went wrong. Please try again later",
        server: error,
      });
    });
};

const updateMessage = async (req, res, next) => {
  let token = req.headers.authorization;
  let userInfo = jwtDecode(token);
  const { comment } = req.body;
  const sender_id = userInfo.senderId;

  const config = {
    headers: { Authorization: `Bearer ${userInfo.nlpToken}` },
  };
  const bodyParameters = {
    message: comment,
  };
  axios
    .post(
      " http://a3514d41916e9434e89ce7affed85dc9-1560023551.us-east-2.elb.amazonaws.com:8000/api/conversations/" +
        sender_id +
        "/messages",
      bodyParameters,
      config
    )
    .then((response) => {
      req.sender_id = sender_id;
      req.comment = comment;
      next();
    })
    .catch((error) => {
      return res.status(500).json({
        status: 0,
        message: "Something went wrong. Please try again later",
        server: error,
      });
    });
};

const getIntent = async (req, res, next) => {
  let token = req.headers.authorization;
  let userInfo = jwtDecode(token);

  const sender_id = userInfo.senderId;
  const userId = userInfo.userID;
  const { comment } = req.body;

  const config = {
    headers: { Authorization: `Bearer ${userInfo.nlpToken}` },
  };
  const bodyParameters = {
    message: comment,
  };
  axios
    .get(
      " http://a3514d41916e9434e89ce7affed85dc9-1560023551.us-east-2.elb.amazonaws.com:8000/api/conversations/" +
        sender_id +
        "/messages",
      config
    )
    .then((response) => {
      req.sender_id = sender_id;
      req.userId = userId;

      req.comment = comment;
      req.intent = response.data.latest_message.intent.name;
      next();
    })
    .catch((error) => {
      return res.status(500).json({
        status: 0,
        message: "Something went wrong. Please try again later",
        server: error,
      });
    });
};

const compareIntentAndMessage1 = async (req, res, next) => {
  // TODO: As each user and cases will need different response in Intent
  // array, get case and user id as well

  const { message, sender_id, intent } = req;
  //   Case Id can be taken from req.body.caseId
  //   Sender Id can be taken from token->userInfo.userId

  // TODO:  The below file reading should be adjusted when the new intent files
  // come to case specific intent files
  let rawdata = fs.readFileSync(process.env.INTENT_PATH);
  let intentsList = JSON.parse(rawdata);
  let result;
  try {
    let intentListExists = Object.keys(intentsList).includes(intent);

    if (intentListExists) {
      result = Object.keys(intentsList).forEach(function (key) {
        if (key === intent) {
          req.intent = intent;
          req.intentList = intentsList[key];
          next();
        }
      });
    } else {
      req.intent = "NA";
      req.intentList = "";
      next();
    }
  } catch (e) {
    return res.status(500).json({
      status: 0,
      message: "Something went wrong. Please try again later",
      server: error,
    });
  }
};
const compareIntentAndMessage = async (req, res, next) => {
  const { message, sender_id, intent, userId } = req;
  const caseId = req.body.caseId;

  if (!caseId && caseId != 0) {
    console.log("Reached  here");
    return res.status(500).json({
      status: 0,
      message: "Validation Error! CaseId, userId are required fields",
    });
  }
  if (!userId && userId != 0) {
    return res.status(500).json({
      status: 0,
      message: "Validation Error! CaseId, userId are required fields",
    });
  }

  const getIntentsIndexList = {
    text:
      "SELECT * FROM users_cases_intents WHERE case_id = $1 AND user_id = $2",
    values: [caseId, userId],
  };
  try {
    const response = await database.query(getIntentsIndexList);
    if (!response.rows[0]) {
      // If there is no entry for this particular userId and caseId, Initialize it
      console.log("Reached here");
      let resultInitialize = intializeIntentIndex({ caseId, userId });
      if (resultInitialize.status == 0) {
        console.log("Error is here 1");
        return res.status(500).json({
          status: 0,
          message: "Something went wrong. Please try again later",
        });
      }
    } else {
      console.log(response.rows[0]);
      console.log("Error is here 4");
      //   let session_id = response.rows[0].id;
      //   const getCommentsByCaseId = {
      //     text:
      //       "SELECT * FROM users_cases_support WHERE case_id = $1 AND session_id = $2 ORDER BY comment_created ASC",
      //     values: [case_id, session_id],
      //   };
      //   const messages = await database.query(getCommentsByCaseId);
      //   if (!messages.rows[0]) {
      //     return res.status(200).json({
      //       status: 0,
      //       message: "No messages found",
      //       data: [],
      //     });
      //   } else {
      //     return res.status(200).json({
      //       status: 1,
      //       message: "success",
      //       data: messages.rows,
      //     });
      //   }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 0,
      message: "Something went wrong. Please try again later",
      server: error,
    });
  }
  let rawdata = fs.readFileSync(process.env.INTENT_PATH);
  let intentsList = JSON.parse(rawdata);
  let result;
  try {
    let intentListExists = Object.keys(intentsList).includes(intent);

    if (intentListExists) {
      result = Object.keys(intentsList).forEach(function (key) {
        if (key === intent) {
          req.intent = intent;
          req.intentList = intentsList[key];
          next();
        }
      });
    } else {
      req.intent = "NA";
      req.intentList = "";
      next();
    }
  } catch (e) {
    return res.status(500).json({
      status: 0,
      message: "Something went wrong. Please try again later",
      server: error,
    });
  }

  // TODO:  The below file reading should be adjusted when the new intent files
  // come to case specific intent files
};

const intializeIntentIndex = async ({ userId, caseId }) => {
  console.log(userId);
  console.log(caseId);
  let initializeIntentsListIndexRawData = fs.readFileSync(
    process.env.INITIALIZE_INTENT_PATH
  );
  let initializeIntentsListIndex = JSON.parse(
    initializeIntentsListIndexRawData
  );

  const initializeIntentQuery = {
    text:
      "INSERT INTO users_cases_intents(case_id, user_id, intent) VALUES($1, $2, $3) RETURNING *",
    values: [caseId, userId, initializeIntentsListIndex],
  };

  try {
    const query = await database.query(initializeIntentQuery);
    if (query.rowCount > 0) {
      return { status: 1, message: "success" };
    } else {
      console.log("Error is here 2");
      return {
        status: 0,
        message: "Something went wrong. Please try again later",
      };
    }
  } catch (error) {
    console.log("Error is here 3");
    console.log(error);
    return {
      status: 0,
      message: "Something went wrong. Please try again later",
      server: error,
    };
  }
};

module.exports = {
  getSenderId,
  updateMessage,
  getIntent,
  compareIntentAndMessage,
};
