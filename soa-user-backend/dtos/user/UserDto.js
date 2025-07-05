module.exports = class UserDto {
    user_id;
    name;
    email;
    number;
    role;
    lastLoginAt;
    lastSessionDuration;

    constructor(userModel, roleModel = null, activeSession = null, completedSession = null) {
        this.user_id = userModel.user_id;
        this.name = userModel.name;
        this.email = userModel.email;
        this.number = userModel.number;

        this.role = roleModel ? roleModel.name : null;
        this.lastLoginAt = activeSession ? activeSession.startTime : null;
        this.lastSessionDuration = completedSession ? completedSession.durationSeconds : null;
    }
}
