const Router = require('express');
const router = new Router();

const documentController = require('../controllers/DocumentController');

const authMiddleware = require('../middleware/authMiddleware');

router.post('/uploadDocument', authMiddleware(['USER', 'ADMIN']), documentController.uploadDocument);

router.get('/downloadDocument/:documentId', authMiddleware(['USER', 'ADMIN']), documentController.downloadDocument);

module.exports = router;