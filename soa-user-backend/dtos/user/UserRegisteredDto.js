module.exports = class UserRegisteredDto {
    user_id;
    name;
    email;
    number;
    role;

    constructor(model) {
        this.user_id = model.user_id;
        this.name = model.name;
        this.email = model.email;
        this.number = model.number;
        this.role = model.role.name;
    }
}
