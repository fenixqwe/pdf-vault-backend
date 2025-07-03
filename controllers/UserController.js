const userService = require("../services/UserService");
const ApiResponse = require("../error/ApiResponse");

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
            console.log(userData)
            console.log(userId)
            await userService.updateUserData(userData, userId);


            return res.json(new ApiResponse("User data updated successfully"));
        } catch (e) {
            next(e);
        }
    }

    async deleteUser(req, res, next) {
        try {
            const userId = req.params.userId;
            await userService.deleteUser(userId);
            return res.json(new ApiResponse("User deleted successfully"));
        } catch (e) {
            next(e);
        }
    }

    async getAllUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            return res.json(new ApiResponse("User received successfully", users));
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new UserController();