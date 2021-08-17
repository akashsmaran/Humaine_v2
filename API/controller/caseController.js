const { database } = require("../config/database");
const {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} = require("http-status-codes");
const jwtDecode = require("jwt-decode");
const csv = require("csv-parser");
const fs = require("fs");

const getMyCases = async (req, res) => {
  let token = req.headers.authorization;
  let userInfo = jwtDecode(token);

  const getCasesByUserId = {
    text: "SELECT DISTINCT ON (cases.id) cases.*  FROM cases LEFT JOIN user_cases ON case_id = cases.id WHERE user_id = $1",
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
              text: "SELECT * FROM user_cases WHERE case_id = $1 AND user_id = $2 ORDER BY id DESC",
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
    text: "SELECT cases.*,user_cases.id as sessionId,user_cases.created_at as case_started FROM cases LEFT JOIN user_cases ON case_id = cases.id WHERE cases.id = $1 AND status = $2 AND user_id = $3",
    values: [caseId, "in_progress", userInfo.userID],
  };
  try {
    const response = await database.query(getCase);
    if (!response.rows[0]) {
      //if there is no case in progress then create a new one and send it in the response,

      const newSession = {
        text: "INSERT INTO user_cases(case_id, user_id, status) VALUES($1, $2, $3) RETURNING *",
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
    text: "INSERT INTO cases(case_name, case_description, case_difficulty, case_status) VALUES($1, $2, $3, $4, $5) RETURNING *",
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
    text: "SELECT * FROM user_cases WHERE case_id = $1 AND user_id = $2 ORDER BY created_at DESC LIMIT 1",
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
        text: "SELECT * FROM users_cases_support WHERE case_id = $1 AND session_id = $2 ORDER BY comment_created ASC",
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
  var { intent, indexCommentForIntentResponse } = req;
  // var { intent, intentList, indexForIntentResponse } = req;
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
      // var key = Math.floor(Math.random() * intentList.length);

      comment = indexCommentForIntentResponse;
    }
    userId = 0;
  } else {
    intent = "";
  }
  console.log(
    `This is from addcasecomment intent:${intent}, comment:${comment} `
  );
  const notes = {
    text: "INSERT INTO users_cases_support(user_id, case_id, comment, is_flagged, session_id, intent) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
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
    text: "INSERT INTO users_cases_notes(case_id, user_id, note) VALUES($1, $2, $3) RETURNING *",
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
  const getDiagnosisList = {
    text: "SELECT * FROM diagnosis",
  };
  try {
    const response = await database.query(getDiagnosisList);
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
    console.log(error);
    return res.status(500).json({
      status: 0,
      message: "Something went wrong. Please try again later",
      server: error,
    });
  }
};

const getSteps = async (req, res) => {
  const getStep = {
    text: "SELECT * FROM steps",
  };
  try {
    const response = await database.query(getStep);
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
  let { caseId, diagnosis, steps, sessionId } = req.body;

  if (
    !caseId ||
    !sessionId ||
    !diagnosis ||
    typeof diagnosis !== "string" ||
    !steps ||
    typeof steps !== "string"
  ) {
    return res.status(500).json({
      status: 0,
      message:
        "Validation Error! CaseId, sessionId, Diagnosis, Steps are required fields and Diagnosis & Steps should be a string value",
    });
  }
  diagnosis = JSON.parse(diagnosis);
  diagnosis.forEach((item, index) => {
    const addDiagnosis = {
      text: "INSERT INTO users_cases_diagnosis(case_id, user_id, diagnosis, session_id) VALUES($1, $2, $3, $4) RETURNING *",
      values: [caseId, userInfo.userID, item, sessionId],
    };
    database.query(addDiagnosis);
  });
  steps = JSON.parse(steps);
  steps.forEach((step, index) => {
    const addsteps = {
      text: "INSERT INTO users_cases_steps(case_id, user_id, step, session_id) VALUES($1, $2, $3, $4) RETURNING *",
      values: [caseId, userInfo.userID, step, sessionId],
    };
    database.query(addsteps);
  });

  // Update the user_cases
  // to set stop time i.e end time
  try {
    const endCaseQuery = {
      text: "UPDATE user_cases set status = $2 , stopped_at = NOW() where id IN ($1)",
      values: [sessionId, "attempted"],
    };

    let resultEndCaseUpdated = database.query(endCaseQuery);

    // console.log("Case being updated :" , endCaseQuery , resultEndCaseUpdated);
  } catch (err) {
    console.log("error occured", err);
  }

  return res.status(200).json({
    status: 1,
    message: "Success",
  });
};

const addDiagnosisList = async (req, res) => {
  //Truncate the table before running this
  const results = [];

  fs.createReadStream("./public/diagnosis_list - diagnosis_list.csv")
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      results.forEach((resp, index) => {
        let diagnosis = resp["AAA"];
        const addList = {
          text: "INSERT INTO diagnosis(name) VALUES($1) RETURNING *",
          values: [diagnosis],
        };
        database.query(addList);
      });

      return res.status(200).json({
        status: 1,
        message: "Success",
        data: results,
      });
    });
};

const addStepsList = (req, res) => {
  ////Truncate the table before running this
  const results = [];
  fs.createReadStream("./public/next_steps.csv")
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      results.forEach((resp, index) => {
        let step = resp["Blood samples"];
        const addList = {
          text: "INSERT INTO steps(name) VALUES($1) RETURNING *",
          values: [step],
        };
        database.query(addList);
      });

      return res.status(200).json({
        status: 1,
        message: "Success",
        data: results,
      });
    });
};

const endCaseSession = async (req, res) => {
  const caseId = req.params.id;
  let token = req.headers.authorization;
  let userInfo = jwtDecode(token);
  if (!caseId) {
    return res.status(500).json({
      status: 0,
      message: "Validation Error! CaseId",
    });
  }

  const updateSession = {
    //Where currenct status is in progress, Update status to Attempted!
    text: "Update user_cases SET status = $1,stopped_at = $2 WHERE case_id = $3 AND status = $4 AND user_id = $5",
    values: ["attempted", new Date(), caseId, "in_progress", userInfo.userID],
  };
  try {
    const query = await database.query(updateSession);
    if (query.rowCount > 0) {
      return res.status(200).json({
        status: 1,
        message: "You have attempted the case successfully!",
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

const getDiagnosisResults = async (diagnosis, caseId) => {
  return new Promise(async (resolve, reject) => {
    if (diagnosis.rows.length > 0) {
      let result = await diagnosis.rows.map(async (resp) => {
        let diagnosisId = resp["id"];
        let diagnosisName = resp["name"];
        const userDiagnosis = {
          text: "select exists(select 1 from cases_diagnosis_result WHERE diagnosis_id = $1 AND case_id = $2)",
          values: [diagnosisId, caseId],
        };
        let response = await database.query(userDiagnosis);
        let Diagnosisdata = {
          diagnosis_d: diagnosisId,
          name: diagnosisName,
          status: response.rows[0].exists,
        };
        return Diagnosisdata;
      });
      result = await Promise.all(result);
      resolve(result);
    }
  });
};

const getStepsResults = async (steps, caseId) => {
  return new Promise(async (resolve, reject) => {
    if (steps.rows.length > 0) {
      let result_steps = await steps.rows.map(async (resp) => {
        let stepId = resp["id"];
        let stepName = resp["name"];
        const usersteps = {
          text: "select exists(select 1 from cases_steps_result WHERE step_id = $1 AND case_id = $2)",
          values: [stepId, caseId],
        };
        let response_steps = await database.query(usersteps);
        let data = {
          stepId: stepId,
          name: stepName,
          status: response_steps.rows[0].exists,
        };
        return data;
      });
      result_steps = await Promise.all(result_steps);
      resolve(result_steps);
    }
  });
};

const caseResult = async (req, res) => {
  const caseId = req.params.id;
  const sessionId = req.params.sessionId;
  let token = req.headers.authorization;
  let userInfo = jwtDecode(token);
  if (!caseId || !sessionId) {
    return res.status(500).json({
      status: 0,
      message: "Validation Error! caseId and sessionId are required as params",
    });
  }
  //1. Attempt Number
  //2. Session Start date, to Total time take to complete
  //3. Submiited diagnosis (Correct or Now)
  //4. Submitted Next Steps (Correct or Not)

  const AttempNumber = {
    text: "SELECT * FROM user_cases WHERE user_id = $1 AND case_id = $2",
    values: [userInfo.userID, caseId],
  };
  const sessionDetails = {
    text: "SELECT EXTRACT(EPOCH FROM stopped_at-created_at)/3600 as time, id as session_id, case_id, status, created_at, stopped_at FROM user_cases WHERE user_id = $1 AND case_id = $2 AND id = $3",
    values: [userInfo.userID, caseId, sessionId],
  };
  const userDiagnosis = {
    text: "SELECT diagnosis.id,diagnosis.name FROM users_cases_diagnosis LEFT JOIN diagnosis ON diagnosis.id = users_cases_diagnosis.diagnosis WHERE user_id = $1 AND case_id = $2 AND session_id = $3",
    values: [userInfo.userID, caseId, sessionId],
  };
  const userSteps = {
    text: "SELECT steps.id,steps.name FROM users_cases_steps LEFT JOIN steps ON steps.id = users_cases_steps.step WHERE user_id = $1 AND case_id = $2 AND session_id = $3",
    values: [userInfo.userID, caseId, sessionId],
  };
  const attempts = await database.query(AttempNumber);
  let details = await database.query(sessionDetails);
  let diagnosis = await database.query(userDiagnosis);
  let getDiagnosis = await getDiagnosisResults(diagnosis, caseId);
  let steps = await database.query(userSteps);
  let getSteps = await getStepsResults(steps, caseId);

  const data = {
    attempt: attempts.rows.length,
    details: details.rows,
    diagnosis_results: getDiagnosis,
    steps_results: getSteps,
  };
  return res.status(200).json({
    status: 1,
    message: "Success",
    data: data,
  });
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
  addDiagnosisList,
  addStepsList,
  getDiagnosis,
  getSteps,
  endCaseSession,
  caseResult,
};
