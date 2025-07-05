module.exports = class ApiError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
    }

    static unauthorized() {
        return new ApiError(401, 'User unauthorized');
    }

    static notFounded(message) {
        return new ApiError(404, message);
    }

    static badRequest(message) {
        return new ApiError(400, message);
    }

    static forbidden(message) {
        return new ApiError(403, message);
    }
}