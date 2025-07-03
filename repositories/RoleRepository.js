const { Role } = require("../models/models");

class RoleRepository {
    async createRole(name) {
        return await Role.create({ name: name });
    }

    async updateRole(name, role_id) {
        return await Role.update({ name: name }, { where: { role_id: role_id } });
    }

    async getAllRoles() {
        return await Role.findAll();
    }

    async getRoleById(role_id) {
        return await Role.findOne({ where: { role_id: role_id } });
    }

    async getRoleByName(name) {
        return await Role.findOne({ where: { name: name } });
    }

    async deleteRole(role_id) {
        return await Role.destroy({ where: { role_id: role_id } });
    }
}

module.exports = new RoleRepository();
