const userRepository = require("../repositories/UserRepository");

const sessionService = require("./SessionService");
const recordExistenceService = require("./helper/RecordExistenceService");

const UserRegisteredDto = require("../dtos/user/UserRegisteredDto");

const errorMessagesEnum = require("../error/ErrorMessagesEnum");
const { ApiError } = require('common-lib');

const { Op, fn, col, where } = require('sequelize');
const {Role} = require("../models/models");
const UserDto = require("../dtos/user/UserDto");

class UserService {
    async getUserData(user_id) {
        await recordExistenceService.checkUserIsExists(user_id);
        const user = await userRepository.getUserById(user_id);
        return new UserRegisteredDto(user);
    }

    async updateUserData(userData, user_id, currentUser) {
        await recordExistenceService.checkUserIsExists(user_id);
        const user = await userRepository.getUserById(user_id);

        if (currentUser.roles !== 'ADMIN' && currentUser.userId !== user_id) {
            throw ApiError.forbidden('You can update only your own data');
        }

        if (userData.email && user.email !== userData.email) {
            const candidate = await userRepository.getUserByEmail(userData.email);
            if (candidate) throw ApiError.badRequest(errorMessagesEnum.USER_ALREADY_EXISTS);
        }

        if (userData.role_id && currentUser.roles !== 'ADMIN') {
            throw ApiError.forbidden('Only administrators can change user roles');
        }

        await userRepository.updateUser(userData, user_id);
    }

    async deleteUser(user_id) {
        await recordExistenceService.checkUserIsExists(user_id);
        await userRepository.deleteUser(user_id);
    }

    async getAllUsers(searchString) {
        const condition = where(
            fn('LOWER', col('email')),
            {
                [Op.like]: `%${searchString.toLowerCase()}%`
            }
        );

        const users = await userRepository.findAllByCondition(condition, {
            include: [{ model: Role }]
        });

        const userIds = users.map(user => user.user_id);

        const [activeSessions, completedSessions] = await Promise.all([
            sessionService.getLatestSessions(userIds),
            sessionService.getLatestSessions(userIds, true)
        ]);

        return users.map(user => {
            const activeSession = activeSessions.get(user.user_id) || null;
            const completedSession = completedSessions.get(user.user_id) || null;
            return new UserDto(user, user.role, activeSession, completedSession);
        });
    }

    async findUserByAccessHash(accessHash) {
        return await userRepository.findUserByAccessHash(accessHash);
    }

    async findUserByRefreshHash(refreshHash) {
        return await userRepository.findUserByRefreshHash(refreshHash);
    }
}

module.exports = new UserService();