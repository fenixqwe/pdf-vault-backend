module.exports = class DocumentDto {
    document_id;
    name;
    type;
    user_id;
    updatedAt;

    constructor(model) {
        this.document_id = model.document_id;
        this.name = model.name;
        this.type = model.type;
        this.user_id = model.user_id;
        this.updatedAt = model.updatedAt;
    }
}
