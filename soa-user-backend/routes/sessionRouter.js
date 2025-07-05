const Router = require('express');
const router = new Router();

const sessionController = require('../controllers/SessionController');

router.get('/allSessions', sessionController.getAllSession);

module.exports = router;