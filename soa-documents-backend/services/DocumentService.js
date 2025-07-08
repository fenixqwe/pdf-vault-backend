const {jwtService} = require('common-lib');

const documentRepository = require('../repositories/DocumentRepository');

const DocumentDto = require('../dtos/document/DocumentDto');
const {Op, where, col, fn} = require("sequelize");

class DocumentService {
    async uploadDocument(file, token, targetUserId = null) {
        const { userId: tokenUserId } = jwtService.verifyToken(token);

        const userId = targetUserId || tokenUserId;

        const buffer = file.data;
        const name = decodeURIComponent(file.name);
        const type = file.mimetype || 'application/pdf';

        const newDocument = await documentRepository.uploadDocument({
            name,
            type,
            content: buffer,
            user_id: userId
        })

        return new DocumentDto(newDocument)
    }

    async downloadDocument(documentId) {
        return await documentRepository.downloadDocument(documentId);
    }

    async deleteDocument(documentId) {
        return await documentRepository.deleteDocument(documentId);
    }

    async getAllDocuments() {
        const documents = await documentRepository.getAllDocuments()
        return documents.map(document => new DocumentDto(document));
    }

    async getAllUserDocuments(searchString, token, targetUserId = null) {
        const { userId: tokenUserId } = jwtService.verifyToken(token);

        const userId = targetUserId || tokenUserId;

        const condition = {
            [Op.and]: [
                where(fn('LOWER', col('name')), {
                    [Op.like]: `%${searchString.toLowerCase()}%`
                }),
                { user_id: userId }
            ]
        };

        const documents = await documentRepository.getAllDocuments(condition);

        return documents.map(document => new DocumentDto(document));
    }
}

module.exports = new DocumentService();