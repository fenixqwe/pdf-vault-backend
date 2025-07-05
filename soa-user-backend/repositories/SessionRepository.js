const { Session } = require('../models/models');

class SessionRepository {
    async createUserSession(userId, startTime) {
        return await Session.create({
            user_id: userId,
            startTime,
        });
    }

    async getCertainSession(sessionId) {
        return await Session.findByPk(sessionId);
    }

    async saveModel(model) {
        return await model.save();
    }

    async getAllSessions() {
        return await Session.findAll();
    }

    async findAllByCondition(condition, options = {}) {
        return await Session.findAll({
            where: condition,
            ...options
        });
    }
}

module.exports = new SessionRepository();