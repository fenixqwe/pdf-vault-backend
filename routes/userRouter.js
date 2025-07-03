const Router = require('express');
const router = new Router();

const userController = require('../controllers/UserController');

const authMiddleware = require('../middleware/authMiddleware');

router.patch('/updateUserData/:userId', authMiddleware(['USER', 'ADMIN']), userController.updateUserData);

router.get('/getUserData/:userId', authMiddleware(['USER', 'ADMIN']), userController.getUserData);
router.get('/getAllUsers', authMiddleware(['ADMIN', 'USER']), userController.getAllUsers);

module.exports = router;