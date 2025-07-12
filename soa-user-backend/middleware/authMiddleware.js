const createAuthMiddleware = require("common-lib/middleware/authMiddleware");

const userController = require("../controllers/userController");

const authMiddleware = createAuthMiddleware({
    findUserByAccessHash: userController.findUserByAccessHash,
    findUserByRefreshHash: userController.findUserByRefreshHash
});

module.exports = authMiddleware;