const authService = require("../services/AuthService");

const {ApiResponse} = require("common-lib");

const UserRegisterReqDto = require("../dtos/user/UserRegisterReqDto");
const UserLoginReqDto = require("../dtos/user/UserLoginReqDto");
const UserResetPasswordReqDto = require("../dtos/user/UserResetPasswordReqDto");

class AuthController {
    async registration(req, res, next) {
        try {
            const userRegisterReqDto = new UserRegisterReqDto(req.body);
            const userData = await authService.registration(userRegisterReqDto);

            return res.json(new ApiResponse("Registered successfully", userData));
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const userLoginReqDto = new UserLoginReqDto(req.body);
            const userData = await authService.login(userLoginReqDto);

            return res.json(new ApiResponse("Login successfully", userData));
        } catch (e) {
            next(e);
        }
    }

    async logout (req, res, next) {
        try {
            const accessToken = req.headers.authorization.split(' ')[1];
            const sessionId = req.query.sessionId;
            await authService.logout(accessToken, sessionId);

            return res.json(new ApiResponse("Logged out successfully"));
        } catch (e) {
            next(e);
        }
    }

    async refreshSession(req, res, next) {
        try {
            const refreshToken = req.headers.authorization.split(' ')[1];
            const newSessionTokens = await authService.refreshSession(refreshToken);

            return res.json(new ApiResponse("Session continued", newSessionTokens));
        } catch (e) {
            next(e);
        }
    }

    async requestResetPassword(req, res, next) {
        try {
            const { email } = req.body;
            await authService.requestResetPassword(email);

            return res.json(new ApiResponse("Requested Successfully"));
        } catch (e) {
            next(e);
        }
    }

    async resetPassword(req, res, next) {
        try {
            const userResetPasswordReqDto = new UserResetPasswordReqDto(req.body);
            await authService.resetPassword(userResetPasswordReqDto);

            return res.json(new ApiResponse("Password was reseted successfully"));
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new AuthController();