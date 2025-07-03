const {User} = require('../models/models');

class UserRepository {
    async createUser(user) {
        return User.create(user);
    }

    async getUserById(user_id) {
        return await User.findOne({where: {user_id: user_id}});
    }

    async getUserByFields(fieldsArr) {
        return await User.findOne({where: fieldsArr});
    }

    async getUserByEmail(email) {
        return await User.findOne({where: {email}});
    }

    async saveModel(model) {
        return await model.save();
    }

    async updateUser(userData, user_id) {
        return await User.update(userData, {where: {user_id: user_id}});
    }

    async getAllUsers() {
        return await User.findAll();
    }
}

module.exports = new UserRepository();