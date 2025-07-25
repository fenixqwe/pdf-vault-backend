const Router = require('express');
const router = new Router();

const authController = require('../controllers/AuthController');

const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', authMiddleware(['ADMIN']),  authController.registration)
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/requestResetPassword', authController.requestResetPassword);
router.post('/resetPassword', authController.resetPassword);

router.get('/refresh', authMiddleware(['USER', 'ADMIN']),  authController.refreshSession);

module.exports = router;