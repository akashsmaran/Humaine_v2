const {database} = require('../config/database');
const {ReasonPhrases,StatusCodes,getReasonPhrase,getStatusCode}=  require('http-status-codes');
const md5 = require('md5');
const axios = require("axios");
const jwtDecode = require("jwt-decode");

const getCase = async (req,res) => {
    let token = req.headers.authorization;
    let userInfo = jwtDecode(token);

    const getCasesByUserId = {
        text : 'SELECT * FROM cases WHERE user_id = $1',
        values : [userInfo.userID]
    }
    try {
        const response  = await database.query(getCasesByUserId);
        if (!response.rows[0]) {
            return res.status(400).json({
                status: 0,
                message: 'No case found',
            });
        }
        else {
            return res.status(200).json({
                status: 1,
                message: 'success',
                data : response.rows
            });
        }
    } catch(error) {
        return res.status(500).json({
            status: 0,
            message: error
        });
    }
}

const addCase = async (req,res,next) => {
    let token = req.headers.authorization;
    let userInfo = jwtDecode(token);
    const {caseName,caseDescription,caseDifficulty} = req.body;
    if(!caseName  || !caseDescription || !caseDifficulty){
        return res.status(500).json({
            status: 0,
            message: 'Validation Error! CaseId, Comment are required fields'
        });
    }
    const notes = {
        text : 'INSERT INTO cases(case_name, user_id, case_description, case_difficulty, case_status) VALUES($1, $2, $3, $4, $5) RETURNING *',
        values : [caseName, userInfo.userID, caseDescription, caseDifficulty, 'active']
    }
    try {
        const query = await database.query(notes);
        if(query.rowCount > 0){
            return res.status(200).json({
                status: 1,
                message: 'success'
            });
        } else {
            return res.status(500).json({
                status: 0,
                message: 'Something went wrong. Please try again later'
            });
        }

    } catch (err) {
        res.status(500).json({
            status: 0,
            message: err
        });
    }
}

const getCaseComments = async (req,res) => {
    let case_id = req.params.id;

    const getCommentsByCaseId = {
        text : 'SELECT * FROM users_cases_support WHERE case_id = $1 ORDER BY comment_created DESC',
        values : [case_id]
    }
    try {
        const response  = await database.query(getCommentsByCaseId);
        if (!response.rows[0]) {
            return res.status(200).json({
                status: 0,
                message: 'No case found',
                data : []
            });
        }
        else {
            return res.status(200).json({
                status: 1,
                message: 'success',
                data : response.rows
            });
        }
    } catch(error) {
        return res.status(500).json({
            status: 0,
            message: error
        });
    }
}

const addCaseComment = async (req,res,next) => {
    let token = req.headers.authorization;
    let userInfo = jwtDecode(token);
    const {caseId,comment} = req.body;
    if(!caseId  || !comment){
        return res.status(500).json({
            status: 0,
            message: 'Validation Error! CaseId, Comment are required fields'
        });
    }
    const notes = {
        text : 'INSERT INTO users_cases_support(case_id, user_id, comment, is_flagged) VALUES($1, $2, $3, $4) RETURNING *',
        values : [caseId, userInfo.userID, comment, false]
    }
    try {
        const query = await database.query(notes);
        if(query.rowCount > 0){
            return res.status(200).json({
                status: 1,
                message: 'success'
            });
        } else {
            return res.status(500).json({
                status: 0,
                message: 'Something went wrong. Please try again later'
            });
        }

    } catch (err) {
        res.status(500).json({
            status: 0,
            message: err
        });
    }
}

const flagCase = async (req,res,next) => {
    const {caseId,isFlag} = req.body;
    if(!caseId || !isFlag){
        return res.status(500).json({
            status: 0,
            message: 'Validation Error! CaseId and IsFlag are required fields'
        });
    }
    const flag = {
        text : 'Update users_cases_support SET is_flagged = $1 WHERE case_id = $2',
        values : [isFlag, caseId]
    }
    try {
        const query = await database.query(flag);
        if(query.rowCount > 0){
            return res.status(200).json({
                status: 1,
                message: 'success'
            });
        } else {
            return res.status(500).json({
                status: 0,
                message: 'Something went wrong. Please try again later'
            });
        }

    } catch (err) {
        res.status(500).json({
            status: 0,
            message: err
        });
    }
}

const addNotes = async (req,res,next) => {
    let token = req.headers.authorization;
    let userInfo = jwtDecode(token);
    const {caseId,note} = req.body;
    if(!caseId  || !note){
        return res.status(500).json({
            status: 0,
            message: 'Validation Error! CaseId, IsFlag, Note are required fields'
        });
    }
    const notes = {
        text : 'INSERT INTO users_cases_notes(case_id, user_id, note) VALUES($1, $2, $3) RETURNING *',
        values : [caseId, userInfo.userID, note]
    }
    try {
        const query = await database.query(notes);
        if(query.rowCount > 0){
            return res.status(200).json({
                status: 1,
                message: 'success'
            });
        } else {
            return res.status(500).json({
                status: 0,
                message: 'Something went wrong. Please try again later'
            });
        }

    } catch (err) {
        res.status(500).json({
            status: 0,
            message: err
        });
    }
}

const getNotes = async (req,res) => {
    let token = req.headers.authorization;
    let userInfo = jwtDecode(token);
    let case_id = req.params.id;

    const getNotesByCaseId = {
        text : 'SELECT * FROM users_cases_notes WHERE case_id = $1 AND user_id = $2',
        values : [case_id,userInfo.userID]
    }
    try {
        const response  = await database.query(getNotesByCaseId);
        if (!response.rows[0]) {
            return res.status(200).json({
                status: 0,
                message: 'No notes found',
                data : []
            });
        }
        else {
            return res.status(200).json({
                status: 1,
                message: 'success',
                data : response.rows
            });
        }
    } catch(error) {
        return res.status(500).json({
            status: 0,
            message: error
        });
    }
}

const getDiagnosis = async (req,res) => {
    let token = req.headers.authorization;
    let userInfo = jwtDecode(token);
    let case_id = req.params.id;

    const getNotesByCaseId = {
        text : 'SELECT * FROM users_cases_diagnosis WHERE case_id = $1 AND user_id = $2',
        values : [case_id,userInfo.userID]
    }
    try {
        const response  = await database.query(getNotesByCaseId);
        if (!response.rows[0]) {
            return res.status(200).json({
                status: 0,
                message: 'No diagnosis result found',
                data : []
            });
        }
        else {
            return res.status(200).json({
                status: 1,
                message: 'success',
                data : response.rows
            });
        }
    } catch(error) {
        return res.status(500).json({
            status: 0,
            message: error
        });
    }
}

const addDiagnosis = async (req,res,next) => {
    let token = req.headers.authorization;
    let userInfo = jwtDecode(token);
    const {caseId,diagnosis} = req.body;
    if(!caseId  || !diagnosis){
        return res.status(500).json({
            status: 0,
            message: 'Validation Error! CaseId, IsFlag, Note are required fields'
        });
    }
    const addDiagnosis = {
        text : 'INSERT INTO users_cases_diagnosis(case_id, user_id, diagnosis) VALUES($1, $2, $3) RETURNING *',
        values : [caseId, userInfo.userID, diagnosis]
    }
    try {
        const query = await database.query(addDiagnosis);
        if(query.rowCount > 0){
            return res.status(200).json({
                status: 1,
                message: 'success'
            });
        } else {
            return res.status(500).json({
                status: 0,
                message: 'Something went wrong. Please try again later'
            });
        }

    } catch (err) {
        res.status(500).json({
            status: 0,
            message: err
        });
    }
}

const sendMessage = async (req,res) => {
    const {message, sender_id} = req;
    let token = req.headers.authorization;
    let userInfo = jwtDecode(token);
    console.log(message, sender_id)
    const config = {
        headers: { Authorization: `Bearer ${userInfo.nlpToken}` }
    };
    const bodyParameters = {
        message: message
    };
    axios.post(
        ' http://aa04e4996f2824c7e8ee0c8006a93725-1422191672.us-east-2.elb.amazonaws.com:8000/api/conversations/'+sender_id+'/messages',
        bodyParameters,
        config
    ).then(response => {
        return res.status(200).json({
            status: 1,
            message: 'Success',
            sender_id : sender_id,
            data : response.data
        });

    })
    .catch(error => {
        return res.status(500).json({
            status: 0,
            message: error
        });
    });
}

module.exports = {
    getCase,
    addCase,
    getCaseComments,
    addCaseComment,
    flagCase,
    addNotes,
    getNotes,
    addDiagnosis,
    getDiagnosis,
    sendMessage
}