module.exports = class UserRegisterReqDto {
    name;
    email;
    number;
    password;

    constructor(model) {
        this.name = model.name;
        this.email = model.email;
        this.number = model.number;
        this.password = model.password;
    }
}
