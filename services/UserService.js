const userRepository = require("../repositories/UserRepository");
const UserRegisteredDto = require("../dtos/user/UserRegisteredDto");

const errorMessagesEnum = require("../error/ErrorMessagesEnum");
const ApiError = require("../error/ApiError");

class UserService {
    async getUserData(user_id) {
        //await recordExistenceService.checkUserIsExists(user_id);
        const user = await userRepository.getUserById(user_id);
        return new UserRegisteredDto(user);
    }

    async updateUserData(userData, user_id) {
        //await recordExistenceService.checkUserIsExists(user_id);
        const user = await userRepository.getUserById(user_id);

        if (userData.email && user.email !== userData.email) {
            const candidate = await userRepository.getUserByEmail(userData.email);
            if (candidate) throw ApiError.badRequest(errorMessagesEnum.USER_ALREADY_EXISTS);
        }

        await userRepository.updateUser(userData, user_id);
    }

    async getAllUsers() {
        const users = await userRepository.getAllUsers();
        return users.map(user => user);
    }
}

module.exports = new UserService();