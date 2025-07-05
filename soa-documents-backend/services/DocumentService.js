const {jwtService} = require('common-lib');

const documentRepository = require('../repositories/DocumentRepository');

class DocumentService {
    async uploadDocument(file, token) {
        const {userId} = jwtService.verifyToken(token);

        const buffer = file.data;
        const name = decodeURIComponent(file.name);
        const type = file.mimetype || 'application/pdf';

        await documentRepository.uploadDocument({
            name,
            type,
            content: buffer,
            user_id: userId
        });
    }

    async downloadDocument(documentId) {
        return await documentRepository.downloadDocument(documentId);
    }
}

module.exports = new DocumentService();