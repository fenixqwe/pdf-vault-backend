const roleService = require("../services/RoleService");
const {ApiResponse} = require("common-lib");

class RoleController {
    async getAllRoles(req, res, next) {
        try {
            const roles = await roleService.getAllRoles();
            return res.json(new ApiResponse("Roles received successfully", roles));
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new RoleController();