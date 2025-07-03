module.exports = class UserLoginReqDto {
    email;
    password;

    constructor(model) {
        this.email = model.email;
        this.password = model.password;
    }
}