var express = require('express');
var router = express.Router();

var authMiddleware = require('../middleware/authMiddleware');
var caseController = require('../controller/caseController');
var nlpMiddleware = require('../middleware/nlpMiddleware');

router.get('/',authMiddleware.validateToken,caseController.getCases);
router.get('/my-cases',authMiddleware.validateToken,caseController.getMyCases);
router.get('/:id',authMiddleware.validateToken,caseController.getCase);

router.post('/',authMiddleware.validateToken,caseController.addCase);

router.get('/support/:id',authMiddleware.validateToken,caseController.getCaseComments);
router.post('/support/add',authMiddleware.validateToken,caseController.addCaseComment,nlpMiddleware.updateMessage, nlpMiddleware.getIntent, nlpMiddleware.compareIntentAndMessage,caseController.addCaseComment);

router.post('/support/flag',authMiddleware.validateToken,caseController.flagCase);

router.get('/support/notes/:id',authMiddleware.validateToken,caseController.getNotes);
router.post('/support/notes/add',authMiddleware.validateToken,caseController.addNotes);

router.get('/support/diagnosis/all',authMiddleware.validateToken,caseController.getDiagnosis);
router.post('/support/diagnosis/add',authMiddleware.validateToken,caseController.addDiagnosis);
router.post('/support/diagnosis/add-list',authMiddleware.validateToken,caseController.addDiagnosisList);
router.get('/support/diagnosis/all-steps',authMiddleware.validateToken,caseController.getSteps);
router.post('/support/diagnosis/add-steps',authMiddleware.validateToken,caseController.addStepsList);


router.post('/nlp/message',authMiddleware.validateToken,nlpMiddleware.updateMessage, nlpMiddleware.getIntent, nlpMiddleware.compareIntentAndMessage);
router.get('/nlp/compare',authMiddleware.validateToken,nlpMiddleware.compareIntentAndMessage);

router.get('/end-case/:id',authMiddleware.validateToken,caseController.endCaseSession);
router.get('/case-result/:id/:sessionId',authMiddleware.validateToken,caseController.caseResult);
module.exports = router;
