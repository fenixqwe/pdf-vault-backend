const {Document} = require("../models/models");

class DocumentRepository {
    async uploadDocument(documentData) {
        return Document.create(documentData);
    }

    async downloadDocument(documentId) {
        return await Document.findOne({ where: { document_id: documentId } });
    }
}

module.exports = new DocumentRepository();