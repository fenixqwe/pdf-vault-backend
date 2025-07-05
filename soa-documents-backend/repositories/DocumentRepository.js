const {Document} = require("../models/models");

class DocumentRepository {
    async uploadDocument(documentData) {
        return Document.create(documentData);
    }

    async downloadDocument(documentId) {
        return await Document.findOne({ where: { document_id: documentId } });
    }

    async getAllDocuments(condition){
        return await Document.findAll({
            attributes: { exclude: ['content'] },
            where: condition
        });
    }
}

module.exports = new DocumentRepository();