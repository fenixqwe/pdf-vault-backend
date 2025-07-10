const {Document} = require("../models/models");

class DocumentRepository {
    async getDocument(documentId) {
        return await Document.findOne({
            where: { document_id: documentId },
            attributes: { exclude: ['content'] }
        });
    }

    async uploadDocument(documentData) {
        return Document.create(documentData);
    }

    async downloadDocument(documentId) {
        return await Document.findOne({
            attributes: ['content'],
            where: { document_id: documentId }
        });
    }

    async deleteDocument(documentId) {
        return await Document.destroy({where: { document_id: documentId }});
    }

    async getAllDocuments(condition){
        return await Document.findAll({
            attributes: { exclude: ['content'] },
            where: condition
        });
    }
}

module.exports = new DocumentRepository();