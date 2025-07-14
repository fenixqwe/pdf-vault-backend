const documentRepository = require("../../repositories/DocumentRepository");

const errorMessagesEnum = require("../../error/ErrorMessagesEnum");
const { ApiError } = require('common-lib');

class RecordExistenceService {
    async checkDocIsExists(documentId) {
        const doc = await documentRepository.getDocument(documentId);
        if (!doc) throw ApiError.badRequest(errorMessagesEnum.DOC_DOES_NOT_EXISTS);
        return doc;
    }
}

module.exports = new RecordExistenceService();