const createAuthMiddleware = require("common-lib/middleware/authMiddleware");

const {User} = require("../models/models");

const authMiddleware = createAuthMiddleware({
    findUserByAccessHash: async (hash) => {
        return await User.findOne({ where: { access_hash: hash } }); // ???
    },
    findUserByRefreshHash: async (hash) => {
        return await User.findOne({ where: { refresh_hash: hash } }); // ????
    }
});

module.exports = authMiddleware;