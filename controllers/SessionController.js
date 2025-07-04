const sessionService = require("../services/SessionService");
const ApiResponse = require("../error/ApiResponse");

class SessionController {
    async getAllSession(req, res, next) {
        try {
            const sessions = await sessionService.getAllSessions();
            return res.json(new ApiResponse("Sessions received successfully", sessions));
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new SessionController();