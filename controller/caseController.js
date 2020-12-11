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
            message: 'Something went wrong. Please try again later',
            server : error
        });
    }
}

const addCase = async (req,res,next) => {
    let token = req.headers.authorization;
    let userInfo = jwtDecode(token);
    const {caseName,caseDescription,caseDifficulty} = req.body;
    const {intent, intentList} = req;
    return false;
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

    } catch (error) {
        return res.status(500).json({
            status: 0,
            message: 'Something went wrong. Please try again later',
            server : error
        });
    }
}

const getCaseComments = async (req,res) => {
    let case_id = req.params.id;

    const getCommentsByCaseId = {
        text : 'SELECT * FROM users_cases_support WHERE case_id = $1 ORDER BY comment_created ASC',
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
            message: 'Something went wrong. Please try again later',
            server : error
        });
    }
}

const addCaseComment = async (req,res,next) => {
    let token = req.headers.authorization;
    let userInfo = jwtDecode(token);
    var {caseId,comment} = req.body;
    var {intent,intentList } = req;
    let userId = userInfo.userID;
    if(!caseId  || !comment){
        return res.status(500).json({
            status: 0,
            message: 'Validation Error! caseId, comment are required fields'
        });
    }
    if(intent){
        if(intent == 'NA'){ //case if No intent returns from NLP after comparison
            comment = 'I am not able to understand your question!';
        } else { //case if something has been returned from the NLP
            var key = Math.floor(Math.random() * intentList.length);
            comment = intentList[key];
            console.log(key)
        }
        userId = 0;

    } else {
        intent = '';
    }
    const notes = {
        text : 'INSERT INTO users_cases_support(case_id, user_id, comment, is_flagged, intent) VALUES($1, $2, $3, $4, $5) RETURNING *',
        values : [caseId, userId, comment, false,intent]
    }
    try {
        const query = await database.query(notes);
        if(query.rowCount > 0){
            if(intent){
                return res.status(200).json({
                    status: 1,
                    intent : intent,
                    message : 'success',
                    userId : userId,
                    comment : comment,
                    id : query.rows[0].id
                });
            } else {
                next();
            }

        } else {
            return res.status(500).json({
                status: 0,
                message: 'Something went wrong. Please try again later'
            });
        }

    } catch (error) {
        return res.status(500).json({
            status: 0,
            message: 'Something went wrong. Please try again later',
            server : error
        });
    }
}

const flagCase = async (req,res,next) => {
    const {caseId,isFlag, messageId} = req.body;
    if(!messageId || !isFlag){
        return res.status(500).json({
            status: 0,
            message: 'Validation Error! messageId and IsFlag are required fields'
        });
    }
    const flag = {
        text : 'Update users_cases_support SET is_flagged = $1 WHERE id = $2',
        values : [isFlag, messageId]
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

    } catch (error) {
        return res.status(500).json({
            status: 0,
            message: 'Something went wrong. Please try again later',
            server : error
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

    } catch (error) {
        return res.status(500).json({
            status: 0,
            message: 'Something went wrong. Please try again later',
            server : error
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
            message: 'Something went wrong. Please try again later',
            server : error
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
            message: 'Something went wrong. Please try again later',
            server : error
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

    } catch (error) {
        return res.status(500).json({
            status: 0,
            message: 'Something went wrong. Please try again later',
            server : error
        });
    }
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
    getDiagnosis
}