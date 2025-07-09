const Router = require('express');
const router = new Router();

const roleController = require('../controllers/RoleController');

const authMiddleware = require('../middleware/authMiddleware');

router.get('/getAllRoles', authMiddleware([ 'ADMIN']),  roleController.getAllRoles);

module.exports = router;