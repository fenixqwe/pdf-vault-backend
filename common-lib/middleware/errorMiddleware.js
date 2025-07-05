const ApiError = require("../error/ApiError");

module.exports = function (err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({status: "Error", message: err.message, data: ""});
    }
    return res.status(500).json({status: "Error", message: "Unexpected error", data: ""});
}