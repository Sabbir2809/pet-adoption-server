"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const JWT_1 = require("../utils/JWT");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const prisma_1 = __importDefault(require("../utils/prisma"));
const checkAuth = (...roles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        // Extract token from the request headers
        const token = req.headers.authorization;
        if (!token) {
            throw new AppError_1.default(401, "Your are not Authorized!");
        }
        // check if the token is valid
        const decodedData = (0, JWT_1.verifyToken)(token, config_1.default.jwt.jwt_secret);
        // Check if the user exists in the database
        yield prisma_1.default.user.findUniqueOrThrow({
            where: {
                id: decodedData.userId,
            },
        });
        // role based authorization
        if (roles.length && !roles.includes(decodedData.role)) {
            throw new AppError_1.default(403, "Forbidden Access");
        }
        // Set decoded data in req.user
        req.user = decodedData;
        // Call next middleware
        next();
    }));
};
exports.default = checkAuth;
