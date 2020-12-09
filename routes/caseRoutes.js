var express = require('express');
var router = express.Router();

var authMiddleware = require('../middleware/authMiddleware');
var caseController = require('../controller/caseController');
var nlpMiddleware = require('../middleware/nlpMiddleware');

router.get('/',authMiddleware.validateToken,caseController.getCase);
router.post('/',authMiddleware.validateToken,caseController.addCase);

router.get('/support/:id',authMiddleware.validateToken,caseController.getCaseComments);
router.post('/support/add',authMiddleware.validateToken,caseController.addCaseComment,nlpMiddleware.updateMessage, nlpMiddleware.getIntent, nlpMiddleware.compareIntentAndMessage,caseController.addCaseComment);

router.post('/support/flag',authMiddleware.validateToken,caseController.flagCase);

router.get('/support/notes/:id',authMiddleware.validateToken,caseController.getNotes);
router.post('/support/notes/add',authMiddleware.validateToken,caseController.addNotes);

router.get('/support/diagnosis/:id',authMiddleware.validateToken,caseController.getDiagnosis);
router.post('/support/diagnosis/add',authMiddleware.validateToken,caseController.addDiagnosis);

router.post('/nlp/message',authMiddleware.validateToken,nlpMiddleware.updateMessage, nlpMiddleware.getIntent, nlpMiddleware.compareIntentAndMessage);

router.get('/nlp/compare',authMiddleware.validateToken,nlpMiddleware.compareIntentAndMessage);
module.exports = router;
