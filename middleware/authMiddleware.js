const jwtService = require("../services/helper/JwtService");
const jwtTypes = require("../services/helper/jwtTypes");
const ApiError = require("../error/ApiError");
const {User} = require("../models/models");

module.exports = function (roles) {
    return async function (req, res, next) {
        if (req.method === "OPTIONS") {
            next();
        }
        try {
            const token = req.headers.authorization.split(" ")[1];
            if (!token) return next(ApiError.unauthorized());

            const userData = jwtService.verifyToken(token);
            if (!userData) return next(ApiError.unauthorized());

            let user;

            if (userData.type === jwtTypes.ACCESS_TOKEN) {
                user = await User.findOne({where: {access_hash: userData.accessHash}});
            } else if (userData.type === jwtTypes.REFRESH_TOKEN) {
                user = await User.findOne({where: {refresh_hash: userData.refreshHash}});
            }

            if (!user) return next(ApiError.unauthorized());

            if (roles != null) {
                if (!roles.includes(userData.roles)) {
                    return next(ApiError.forbidden('No access'));
                }
            }
            req.user = userData;
            next();
        } catch (error) {
            return next(ApiError.unauthorized());
        }
    };
};
