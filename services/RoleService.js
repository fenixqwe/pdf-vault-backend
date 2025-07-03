const roleRepository = require('../repositories/RoleRepository');

class RoleService {
    async createRole(name) {
        return await roleRepository.createRole(name);
    }

    async updateRole(name, role_id) {
        return await roleRepository.updateRole(name, role_id);
    }

    async getAllRoles() {
        return await roleRepository.getAllRoles();
    }

    async getRole(role_id) {
        return await roleRepository.getRoleById(role_id);
    }

    async getRoleByName(name) {
        return await roleRepository.getRoleByName(name);
    }

    async deleteRole(role_id) {
        return await roleRepository.deleteRole(role_id);
    }
}

module.exports = new RoleService();