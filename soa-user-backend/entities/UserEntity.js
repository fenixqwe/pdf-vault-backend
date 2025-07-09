module.exports = class UserEntity {
    user_id;
    name;
    number;
    email;
    password;
    constructor(userDto = {}) {
        this.user_id = userDto.userId;
        this.name = userDto.name;
        this.number = userDto.number;
        this.email = userDto.email;
        this.password = userDto.password;
    }
}
