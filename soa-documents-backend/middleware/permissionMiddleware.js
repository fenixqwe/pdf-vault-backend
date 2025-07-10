const {ApiError, jwtService} = require("common-lib");

const documentRepository = require("../repositories/DocumentRepository");

module.exports = function() {
    return async function(req, res, next) {
        if (req.method === 'OPTIONS') {
            next();
        }
        try {
            const token = req.headers.authorization.split(" ")[1];

            const userData = jwtService.verifyToken(token);

            const documentId =  req.params.documentId || req.body.documentId || req.query.documentId;

            const document = await documentRepository.getDocument(documentId);

            if (userData.roles !== 'ADMIN' && document.user_id !== userData.userId) return next(ApiError.forbidden('No permission'));

            next();
        } catch (error) {
            return next(ApiError.forbidden("No permission"));
        }
    }
}