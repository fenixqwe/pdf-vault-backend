const userRepository = require("../../repositories/UserRepository");

const errorMessagesEnum = require("../../error/ErrorMessagesEnum");
const { ApiError } = require('common-lib');

class RecordExistenceService {
    async checkUserIsExists(userId) {
        const user = await userRepository.getUserById(userId);
        if (!user) throw ApiError.badRequest(errorMessagesEnum.USER_DOES_NOT_EXISTS);
        return user;
    }
}

module.exports = new RecordExistenceService();