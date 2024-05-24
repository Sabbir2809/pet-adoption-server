"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// send response
const sendResponse = (res, responseData) => {
    res.status(responseData.statusCode).json({
        success: responseData.success,
        statusCode: responseData.statusCode,
        message: responseData.message,
        meta: responseData.meta || null || undefined,
        data: responseData.data || null || undefined,
    });
};
exports.default = sendResponse;
