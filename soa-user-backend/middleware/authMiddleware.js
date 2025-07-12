const createAuthMiddleware = require("common-lib/middleware/authMiddleware");

const userService = require("../services/UserService");

const authMiddleware = createAuthMiddleware({
    findUserByAccessHash: userService.findUserByAccessHash,
    findUserByRefreshHash: userService.findUserByRefreshHash
});

module.exports = authMiddleware;