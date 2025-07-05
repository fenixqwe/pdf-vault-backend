module.exports = class UserEntity {
    user_id;
    name;
    number;
    email;
    password;
    role_id;
    constructor(userDto = {}) {
        this.user_id = userDto.userId;
        this.name = userDto.name;
        this.surname = userDto.surname;
        this.number = userDto.number;
        this.birthday = userDto.birthday;
        this.email = userDto.email;
        this.password = userDto.password;
        this.specialization = userDto.specialization
        this.role_id = userDto.roleId;
    }
}
