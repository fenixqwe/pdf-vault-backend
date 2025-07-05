module.exports = class TokenPairDto {
    user_id;
    name;
    role_name;
    access_hash;
    refresh_hash;

    constructor(model) {
        this.user_id = model.user_id;
        this.name = model.name;
        this.role_name = model.role_name;
        this.access_hash = model.access_hash;
        this.refresh_hash = model.refresh_hash;
    }
}
