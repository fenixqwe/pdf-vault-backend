const Router = require('express');
const router = new Router();

const userController = require('../controllers/UserController');

const authMiddleware = require('../middleware/authMiddleware');

router.patch('/updateUserData/:userId', authMiddleware(['USER', 'ADMIN']), userController.updateUserData);

router.get('/getUserData/:userId', authMiddleware(['USER', 'ADMIN']), userController.getUserData);
router.get('/getAllUsers', authMiddleware(['ADMIN']), userController.getAllUsers);

router.get('/by-access-hash/:hash', userController.findUserByAccessHash);
router.get('/by-refresh-hash/:hash', userController.findUserByAccessHash);

router.delete('/deleteUser/:userId', authMiddleware(['ADMIN']), userController.deleteUser);

module.exports = router;