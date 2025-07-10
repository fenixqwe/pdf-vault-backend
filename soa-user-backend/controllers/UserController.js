const userService = require("../services/UserService");
const {ApiResponse} = require("common-lib");

class UserController {
    async getUserData(req, res, next) {
        try {
            const user_id = req.params.userId;
            const user = await userService.getUserData(user_id);

            return res.json(new ApiResponse("User received successfully", user));
        } catch (e) {
            next(e);
        }
    }

    async updateUserData(req, res, next) {
        try {
            const userData = req.body;
            const userId = req.params.userId;
            const updatedUser = await userService.updateUserData(userData, userId, req.user);

            return res.json(new ApiResponse("User data updated successfully", updatedUser));
        } catch (e) {
            next(e);
        }
    }

    async deleteUser(req, res, next) {
        try {
            const userId = req.params.userId;
            const token = req.headers.authorization.split(" ")[1];

            await userService.deleteUser(userId, token);
            return res.json(new ApiResponse("User deleted successfully"));
        } catch (e) {
            next(e);
        }
    }

    async getAllUsers(req, res, next) {
        try {
            const searchString = req.query.searchString;

            const users = await userService.getAllUsers(searchString);
            return res.json(new ApiResponse("Users received successfully", users));
        } catch (e) {
            next(e);
        }
    }

    async findUserByAccessHash(req, res, next) {
        try {
            const accessHash = req.params.hash;

            const user = await userService.findUserByAccessHash(accessHash);
            return res.json(new ApiResponse("User received successfully", user));
        } catch (e) {
            next(e);
        }
    }

    async findUserByRefreshHash(req, res, next) {
        try {
            const refreshHash = req.params.hash;

            const user = await userService.findUserByRefreshHash(refreshHash);
            return res.json(new ApiResponse("User received successfully", user));
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new UserController();