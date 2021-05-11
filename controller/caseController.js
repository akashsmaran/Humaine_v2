const { database } = require("../config/database");
const {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} = require("http-status-codes");
const jwtDecode = require("jwt-decode");

const getMyCases = async (req, res) => {
  let token = req.headers.authorization;
  let userInfo = jwtDecode(token);

  const getCasesByUserId = {
    text:
      "SELECT DISTINCT ON (cases.id) cases.*  FROM cases LEFT JOIN user_cases ON case_id = cases.id WHERE user_id = $1",
    values: [userInfo.userID],
  };
  try {
    const response = await database.query(getCasesByUserId);
    if (!response.rows[0]) {
      return res.status(400).json({
        status: 0,
        message: "No case found",
      });
    } else {
      return res.status(200).json({
        status: 1,
        message: "success",
        data: response.rows,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 0,
      message: "Something went wrong. Please try again later",
      server: error,
    });
  }
};

const getCases = async (req, res) => {
  let token = req.headers.authorization;
  let userInfo = jwtDecode(token);
  const getAllCases = {
    text: `SELECT * FROM cases WHERE case_status = 'active'`,
  };
  try {
    const response = await database.query(getAllCases).then(async (data) => {
      var cases = data.rows;
      if (cases.length > 0) {
        var finalResult = await Promise.all(
          cases.map(async function (el) {
            let case_id = el.id;
            var objectAssign = Object.assign({}, el);

            var getAllCases = {
              text:
                "SELECT * FROM user_cases WHERE case_id = $1 AND user_id = $2 ORDER BY id DESC",
              values: [case_id, userInfo.userID],
            };
            var response2 = await database.query(getAllCases);
            objectAssign.image_url_example =
              "http://localhost:4000/images/default.jpg";
            objectAssign.score = "68%";
            objectAssign.user_cases = response2.rows;

            return objectAssign;
          })
        );
        return finalResult;
      } else {
        return res.status(400).json({
          status: 0,
          message: "No active cases found",
        });
      }
    });
    return res.status(200).json({
      status: 1,
      message: "success",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      status: 0,
      message: "Something went wrong. Please try again later",
      server: error,
    });
  }
};

const getCase = async (req, res) => {
  let token = req.headers.authorization;
  let userInfo = jwtDecode(token);
  let caseId = req.params.id;

  const getCase = {
    text:
      "SELECT cases.*,user_cases.id as sessionId,user_cases.created_at as case_started FROM cases LEFT JOIN user_cases ON case_id = cases.id WHERE cases.id = $1 AND status = $2 AND user_id = $3",
    values: [caseId, "in_progress", userInfo.userID],
  };
  try {
    const response = await database.query(getCase);
    if (!response.rows[0]) {
      //if there is no case in progress then create a new one and send it in the response,

      const newSession = {
        text:
          "INSERT INTO user_cases(case_id, user_id, status) VALUES($1, $2, $3) RETURNING *",
        values: [caseId, userInfo.userID, "in_progress"],
      };
      try {
        const query = await database.query(newSession);
        if (query.rowCount > 0) {
          const getNewSession = await database.query(getCase);
          return res.status(200).json({
            status: 1,
            message: "success",
            data: getNewSession.rows,
          });
        } else {
          return res.status(500).json({
            status: 0,
            message: "Something went wrong. Please try again later",
          });
        }
      } catch (error) {
        return res.status(500).json({
          status: 0,
          message: "Something went wrong. Please try again later",
          server: error,
        });
      }
    } else {
      return res.status(200).json({
        status: 1,
        message: "success",
        data: response.rows,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 0,
      message: "Something went wrong. Please try again later",
      server: error,
    });
  }
};

const addCase = async (req, res, next) => {
  let token = req.headers.authorization;
  let userInfo = jwtDecode(token);
  const { caseName, caseDescription, caseDifficulty } = req.body;
  if (!caseName || !caseDescription || !caseDifficulty) {
    return res.status(500).json({
      status: 0,
      message: "Validation Error! CaseId, Comment are required fields",
    });
  }
  const notes = {
    text:
      "INSERT INTO cases(case_name, case_description, case_difficulty, case_status) VALUES($1, $2, $3, $4, $5) RETURNING *",
    values: [caseName, caseDescription, caseDifficulty, "active"],
  };
  try {
    const query = await database.query(notes);
    if (query.rowCount > 0) {
      return res.status(200).json({
        status: 1,
        message: "success",
      });
    } else {
      return res.status(500).json({
        status: 0,
        message: "Something went wrong. Please try again later",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 0,
      message: "Something went wrong. Please try again later",
      server: error,
    });
  }
};

const getCaseComments = async (req, res) => {
  let case_id = req.params.id;
  let token = req.headers.authorization;
  let userInfo = jwtDecode(token);

  const getCommentsByCaseId = {
    text:
      "SELECT * FROM user_cases WHERE case_id = $1 AND user_id = $2 ORDER BY created_at DESC LIMIT 1",
    values: [case_id, userInfo.userID],
  };
  try {
    const response = await database.query(getCommentsByCaseId);
    if (!response.rows[0]) {
      return res.status(200).json({
        status: 0,
        message: "No messages found",
        data: [],
      });
    } else {
      let session_id = response.rows[0].id;
      const getCommentsByCaseId = {
        text:
          "SELECT * FROM users_cases_support WHERE case_id = $1 AND session_id = $2 ORDER BY comment_created ASC",
        values: [case_id, session_id],
      };
      const messages = await database.query(getCommentsByCaseId);
      if (!messages.rows[0]) {
        return res.status(200).json({
          status: 0,
          message: "No messages found",
          data: [],
        });
      } else {
        return res.status(200).json({
          status: 1,
          message: "success",
          data: messages.rows,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      status: 0,
      message: "Something went wrong. Please try again later",
      server: error,
    });
  }
};

const addCaseComment = async (req, res, next) => {
  let token = req.headers.authorization;
  let userInfo = jwtDecode(token);
  var { caseId, sessionId, comment } = req.body;
  var { intent, intentList } = req;
  let userId = userInfo.userID;
  if (!caseId || !comment) {
    return res.status(500).json({
      status: 0,
      message: "Validation Error! caseId, comment are required fields",
    });
  }

  if (intent) {
    if (intent == "NA") {
      //case if No intent returns from NLP after comparison
      comment = "I am not able to understand your question!";
    } else {
      //case if something has been returned from the NLP
      var key = Math.floor(Math.random() * intentList.length);
      comment = intentList[key];
      console.log(key);
    }
    userId = 0;
  } else {
    intent = "";
  }
  const notes = {
    text:
      "INSERT INTO users_cases_support(user_id, case_id, comment, is_flagged, session_id, intent) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
    values: [userId, caseId, comment, false, sessionId, intent],
  };
  try {
    const query = await database.query(notes);
    if (query.rowCount > 0) {
      if (intent) {
        return res.status(200).json({
          status: 1,
          intent: intent,
          message: "success",
          userId: userId,
          comment: comment,
          id: query.rows[0].id,
        });
      } else {
        next();
      }
    } else {
      return res.status(500).json({
        status: 0,
        message: "Something went wrong. Please try again later",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 0,
      message: "Something went wrong. Please try again later",
      server: error,
    });
  }
};

const flagCase = async (req, res, next) => {
  const { caseId, isFlag, messageId } = req.body;
  if (!messageId || !isFlag) {
    return res.status(500).json({
      status: 0,
      message: "Validation Error! messageId and IsFlag are required fields",
    });
  }
  const flag = {
    text: "Update users_cases_support SET is_flagged = $1 WHERE id = $2",
    values: [isFlag, messageId],
  };
  try {
    const query = await database.query(flag);
    if (query.rowCount > 0) {
      return res.status(200).json({
        status: 1,
        message: "success",
      });
    } else {
      return res.status(500).json({
        status: 0,
        message: "Something went wrong. Please try again later",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 0,
      message: "Something went wrong. Please try again later",
      server: error,
    });
  }
};

const addNotes = async (req, res, next) => {
  let token = req.headers.authorization;
  let userInfo = jwtDecode(token);
  const { caseId, note } = req.body;
  if (!caseId || !note) {
    return res.status(500).json({
      status: 0,
      message: "Validation Error! CaseId, IsFlag, Note are required fields",
    });
  }
  const notes = {
    text:
      "INSERT INTO users_cases_notes(case_id, user_id, note) VALUES($1, $2, $3) RETURNING *",
    values: [caseId, userInfo.userID, note],
  };
  try {
    const query = await database.query(notes);
    if (query.rowCount > 0) {
      return res.status(200).json({
        status: 1,
        message: "success",
      });
    } else {
      return res.status(500).json({
        status: 0,
        message: "Something went wrong. Please try again later",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 0,
      message: "Something went wrong. Please try again later",
      server: error,
    });
  }
};

const getNotes = async (req, res) => {
  let token = req.headers.authorization;
  let userInfo = jwtDecode(token);
  let case_id = req.params.id;

  const getNotesByCaseId = {
    text: "SELECT * FROM users_cases_notes WHERE case_id = $1 AND user_id = $2",
    values: [case_id, userInfo.userID],
  };
  try {
    const response = await database.query(getNotesByCaseId);
    if (!response.rows[0]) {
      return res.status(200).json({
        status: 0,
        message: "No notes found",
        data: [],
      });
    } else {
      return res.status(200).json({
        status: 1,
        message: "success",
        data: response.rows,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 0,
      message: "Something went wrong. Please try again later",
      server: error,
    });
  }
};

const getDiagnosis = async (req, res) => {
  let token = req.headers.authorization;
  let userInfo = jwtDecode(token);
  let case_id = req.params.id;

  const getNotesByCaseId = {
    text:
      "SELECT * FROM users_cases_diagnosis WHERE case_id = $1 AND user_id = $2",
    values: [case_id, userInfo.userID],
  };
  try {
    const response = await database.query(getNotesByCaseId);
    if (!response.rows[0]) {
      return res.status(200).json({
        status: 0,
        message: "No diagnosis result found",
        data: [],
      });
    } else {
      return res.status(200).json({
        status: 1,
        message: "success",
        data: response.rows,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 0,
      message: "Something went wrong. Please try again later",
      server: error,
    });
  }
};

const addDiagnosis = async (req, res, next) => {
  let token = req.headers.authorization;
  let userInfo = jwtDecode(token);
  const { caseId, diagnosis } = req.body;
  if (!caseId || !diagnosis) {
    return res.status(500).json({
      status: 0,
      message: "Validation Error! CaseId, Diagnosis are required fields",
    });
  }

  const updateSession = {
    text:
      "Update user_cases SET status = $1,stopped_at = $2 WHERE case_id = $3 AND status = $4",
    values: ["attempted", new Date(), caseId, "in_progress"],
  };
  try {
    const query = await database.query(updateSession);
    if (query.rowCount > 0) {
      const addDiagnosis = {
        text:
          "INSERT INTO users_cases_diagnosis(case_id, user_id, diagnosis) VALUES($1, $2, $3) RETURNING *",
        values: [caseId, userInfo.userID, diagnosis],
      };
      try {
        const query = await database.query(addDiagnosis);
        if (query.rowCount > 0) {
          return res.status(200).json({
            status: 1,
            message: "success",
          });
        } else {
          return res.status(500).json({
            status: 0,
            message: "Something went wrong. Please try again later",
          });
        }
      } catch (error) {
        return res.status(500).json({
          status: 0,
          message: "Something went wrong. Please try again later",
          server: error,
        });
      }
    } else {
      return res.status(500).json({
        status: 1,
        message: "Case has already been attempted!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 0,
      message: "Something went wrong. Please try again later",
      server: error,
    });
  }
};

module.exports = {
  getMyCases,
  getCases,
  getCase,
  addCase,
  getCaseComments,
  addCaseComment,
  flagCase,
  addNotes,
  getNotes,
  addDiagnosis,
  getDiagnosis,
};
