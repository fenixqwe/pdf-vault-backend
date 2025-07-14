module.exports = class UserResetPasswordReqDto {
    token;
    new_password;

    constructor(model) {
        this.token = model.token;
        this.new_password = model.new_password;
    }
}
