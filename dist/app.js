"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const notFound_1 = __importDefault(require("./app/middlewares/notFound"));
const router_1 = __importDefault(require("./app/routes/router"));
// express app instance
const app = (0, express_1.default)();
// middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
// Router
app.use("/api/v1", router_1.default);
// Health Check
app.use("/", (req, res) => {
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Pet Adoption API Server: All is Well",
    });
});
// Global Error Handler
app.use(globalErrorHandler_1.default);
// Not Found Handler
app.use(notFound_1.default);
exports.default = app;
