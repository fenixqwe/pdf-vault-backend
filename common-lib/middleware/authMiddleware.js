const jwtService = require("../services/JwtService");
const jwtTypes = require("../services/JwtTypes");

const ApiError = require("../error/ApiError");

module.exports = function ({ findUserByAccessHash, findUserByRefreshHash }) {
    return function (roles = null) {
        return async function (req, res, next) {
            if (req.method === 'OPTIONS') return next();

            try {
                const authHeader = req.headers.authorization;
                if (!authHeader) return next(ApiError.unauthorized());

                const token = authHeader.split(' ')[1];
                if (!token) return next(ApiError.unauthorized());

                const userData = jwtService.verifyToken(token);
                if (!userData) return next(ApiError.unauthorized());

                let user;
                if (userData.type === jwtTypes.ACCESS_TOKEN) {
                    user = await findUserByAccessHash(userData.accessHash);
                } else if (userData.type === jwtTypes.REFRESH_TOKEN) {
                    user = await findUserByRefreshHash(userData.refreshHash);
                }

                if (!user) return next(ApiError.unauthorized());

                if (roles && !roles.includes(userData.roles)) {
                    return next(ApiError.forbidden('No access'));
                }

                req.user = userData;
                next();
            } catch (e) {
                return next(ApiError.unauthorized());
            }
        };
    };
};
