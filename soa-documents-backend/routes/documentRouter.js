const Router = require('express');
const router = new Router();

const documentController = require('../controllers/DocumentController');

const authMiddleware = require('../middleware/authMiddleware');

router.post('/uploadDocument', authMiddleware(['USER', 'ADMIN']), documentController.uploadDocument);
router.post('/uploadDocumentForUser/:userId', authMiddleware(['ADMIN']), documentController.uploadDocumentForUser);

router.get('/downloadDocument/:documentId', authMiddleware(['USER', 'ADMIN']), documentController.downloadDocument);
router.get('/previewDocument/:documentId', authMiddleware(['USER', 'ADMIN']), documentController.previewDocument);
router.get('/getAllDocuments', authMiddleware(['ADMIN']), documentController.getAllDocuments);
router.get('/getAllUsersDocuments', authMiddleware(['USER', 'ADMIN']), documentController.getAllUserDocuments);
router.get('/getCertainUserDocuments/:userId', authMiddleware(['ADMIN']), documentController.getCertainUserDocuments);

router.delete('/deleteDocument/:documentId', authMiddleware(['USER', 'ADMIN']), documentController.deleteDocument);

module.exports = router;