const jwt = require("jsonwebtoken");
const jwtType = require("./JwtTypes");

class JwtService {
    generateTokens(tokenPairDto) {
        const {user_id, name, role_name, access_hash, refresh_hash} = tokenPairDto;

        const accessToken = this.generateAccessToken({
            userId: user_id,
            name: name,
            roles: role_name,
            type: jwtType.ACCESS_TOKEN,
            accessHash: access_hash,
        });

        const refreshToken = this.generateRefreshToken({
            userId: user_id,
            name: name,
            roles: role_name,
            type: jwtType.REFRESH_TOKEN,
            refreshHash: refresh_hash
        });

        return {access_token: accessToken, refresh_token: refreshToken};
    }

    generateAccessToken(payload) {
        return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "1h"});
    }

    generateRefreshToken(payload) {
        return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "24h"});
    }

    generateToken(payload, expireTime) {
        return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: expireTime});
    }

    verifyToken(token) {
        try {
            return jwt.verify(token, process.env.SECRET_KEY);
        } catch (e) {
            return null;
        }
    }
}

module.exports = new JwtService();
