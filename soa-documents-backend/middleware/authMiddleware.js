const createAuthMiddleware = require("common-lib/middleware/authMiddleware");

const userServiceClient = require("../utils/userServiceClient");

const authMiddleware = createAuthMiddleware({
    findUserByAccessHash: userServiceClient.getUserByAccessHash,
    findUserByRefreshHash: userServiceClient.getUserByRefreshHash,
});

module.exports = authMiddleware;