module.exports = class UserRegisteredDto {
    user_id;
    name;
    email;
    number;

    constructor(model) {
        this.user_id = model.user_id;
        this.name = model.name;
        this.email = model.email;
        this.number = model.number;
    }
}
