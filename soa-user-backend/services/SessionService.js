const sessionRepository = require("../repositories/SessionRepository");
const { ApiError } = require('common-lib');
const errorMessagesEnum = require("../error/ErrorMessagesEnum");
const { Op } = require('sequelize');

class SessionService {
    async startSession(userId) {
        const startTime = new Date();
        const session = await sessionRepository.createUserSession(userId, startTime)
        return session.session_id;
    }

    async endSession(sessionId){
        const session = await sessionRepository.getCertainSession(sessionId);
        if (!session || session.endTime) throw ApiError.badRequest(errorMessagesEnum.SESSION_NOT_EXISTS);

        const endTime = new Date();
        session.endTime = endTime;
        session.durationSeconds = Math.floor((endTime - session.startTime) / 1000);
        return await sessionRepository.saveModel(session)
    }

    async getAllSessions() {
        const sessions = await sessionRepository.getAllSessions();
        return sessions.map(session => session)
    }

    async getLatestSessions(userIds, onlyCompleted = false) {
        const where = {
            user_id: userIds
        };

        if (onlyCompleted) {
            where.endTime = { [Op.ne]: null };
        }

        const sessions = await sessionRepository.findAllByCondition(
            where,
            { order: [['startTime', 'DESC']] }
        );

        const map = new Map();
        for (const session of sessions) {
            if (!map.has(session.user_id)) {
                map.set(session.user_id, session);
            }
        }

        return map;
    }
}

module.exports = new SessionService();