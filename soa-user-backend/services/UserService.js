const userRepository = require("../repositories/UserRepository");

const sessionService = require("./SessionService");
const recordExistenceService = require("./helper/RecordExistenceService");

const errorMessagesEnum = require("../error/ErrorMessagesEnum");
const { ApiError, jwtService} = require('common-lib');

const { Op, fn, col, where } = require('sequelize');
const {Role} = require("../models/models");
const UserDto = require("../dtos/user/UserDto");

class UserService {
    async getUserData(user_id) {
        await recordExistenceService.checkUserIsExists(user_id);
        const user = await userRepository.getUserById(user_id);
        const [activeSessions, completedSessions] = await Promise.all([
            sessionService.getLatestSessions(user_id),
            sessionService.getLatestSessions(user_id, true)
        ]);

        const activeSession = activeSessions.get(user_id) || null;
        const completedSession = completedSessions.get(user_id) || null;

        return new UserDto(user, user.role, activeSession || null, completedSession || null);
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
        } else if (userData.role_id && currentUser.roles === 'ADMIN') {
            throw ApiError.forbidden('You cannot change your own role');
        }

        await userRepository.updateUser(userData, user_id);

        return await this.getUserData(user_id)
    }

    async deleteUser(user_id, token) {
        await recordExistenceService.checkUserIsExists(user_id);
        const { userId: tokenUserId } = jwtService.verifyToken(token);

        if (user_id === tokenUserId) throw ApiError.forbidden('You cannot delete yourself');

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