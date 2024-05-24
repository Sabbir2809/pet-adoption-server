"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 404 not found
const notFound = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: "API NOT FOUND!",
        error: {
            path: req.originalUrl,
            message: "Your Requested Path is Not Found!",
        },
    });
};
exports.default = notFound;
