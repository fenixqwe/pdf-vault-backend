const { Role } = require("../models/models");

class RoleRepository {
    async getRoleById(role_id) {
        return await Role.findOne({ where: { role_id: role_id } });
    }

    async getAllRoles() {
        return await Role.findAll({attributes: ['role_id', 'name']});
    }

    async getRoleByName(name) {
        return await Role.findOne({ where: { name: name } });
    }
}

module.exports = new RoleRepository();
