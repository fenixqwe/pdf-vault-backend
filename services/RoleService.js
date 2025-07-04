const roleRepository = require('../repositories/RoleRepository');

class RoleService {
    async getRole(role_id) {
        return await roleRepository.getRoleById(role_id);
    }

    async getRoleByName(name) {
        return await roleRepository.getRoleByName(name);
    }
}

module.exports = new RoleService();