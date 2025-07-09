const {User, Role} = require('../models/models');

class UserRepository {
    async createUser(user) {
        return User.create(user);
    }

    async getUserById(user_id) {
        return await User.findOne({
            where: {user_id: user_id},
            include: [{ model: Role }]
        });
    }

    async getUserByFields(fieldsArr) {
        return await User.findOne({
            where: fieldsArr,
            include: [{ model: Role }]
        });
    }

    async getUserByEmail(email) {
        return await User.findOne({
            where: {email},
            include: [{ model: Role }]
        });
    }

    async saveModel(model) {
        return await model.save();
    }

    async updateUser(userData, user_id) {
        return await User.update(userData, {where: {user_id: user_id}});
    }

    async deleteUser(user_id) {
        return await User.destroy({where: {user_id : user_id}});
    }

    async findAllByCondition(condition, options = {}) {
        return await User.findAll({
            where: condition,
            ...options
        });
    }

    async findUserByAccessHash(hash) {
        return await User.findOne({ where: { access_hash: hash } });
    }

    async findUserByRefreshHash(hash) {
        return await User.findOne({ where: { refresh_hash: hash } });
    }
}

module.exports = new UserRepository();