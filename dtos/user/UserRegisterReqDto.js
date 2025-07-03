module.exports = class UserRegisterReqDto {
    name;
    email;
    password;

    constructor(model) {
        this.name = model.name;
        this.email = model.email;
        this.password = model.password;
    }
}
