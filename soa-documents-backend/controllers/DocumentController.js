const documentService = require('../services/DocumentService');
const {ApiResponse} = require('common-lib');

class DocumentController {
    async uploadDocument(req, res, next) {
        try {
            const file = req.files.file;
            const token = req.headers.authorization.split(" ")[1];

            await documentService.uploadDocument(file, token)
            return res.json(new ApiResponse("File was uploaded successfully"));
        } catch (e) {
            next(e);
        }
    }

    async downloadDocument(req, res, next) {
        try {
            const documentId = req.params.documentId;

            const document = await documentService.downloadDocument(documentId)

            res.set({
                'Content-Type': document.type,
                'Content-Disposition': `attachment; filename="${document.name}"`
            });

            res.send(document.content);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new DocumentController();