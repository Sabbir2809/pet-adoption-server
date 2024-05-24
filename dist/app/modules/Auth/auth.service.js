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
exports.AuthServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const JWT_1 = require("../../utils/JWT");
const prisma_1 = __importDefault(require("../../utils/prisma"));
const registrationIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check user already exits
    const isUserExist = yield prisma_1.default.user.findFirst({
        where: {
            email: payload.email,
            username: payload.username,
        },
    });
    if (isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.id) {
        throw new AppError_1.default(409, "User Already Exits");
    }
    // password hashing
    const hashPassword = yield bcrypt_1.default.hash(payload.password, 8);
    // create user
    const result = yield prisma_1.default.user.create({
        data: Object.assign(Object.assign({}, payload), { password: hashPassword }),
        select: {
            id: true,
            username: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return result;
});
const loginFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // find valid user
    const userData = yield prisma_1.default.user.findFirstOrThrow({
        where: {
            email: payload.email,
            isActive: true,
        },
    });
    const { password, needPasswordChange, id: userId, role, email } = userData;
    // password compare
    const isCorrectPassword = yield bcrypt_1.default.compare(payload.password, password);
    if (!isCorrectPassword) {
        throw new AppError_1.default(401, "Password Incorrect!");
    }
    // access token
    const accessToken = (0, JWT_1.generateToken)({ userId, email, role }, config_1.default.jwt.jwt_secret, config_1.default.jwt.jwt_expires_in);
    // access token
    const refreshToken = (0, JWT_1.generateToken)({ userId, email, role }, config_1.default.jwt.refresh_jwt_secret, config_1.default.jwt.refresh_jwt_expires_in);
    return {
        accessToken,
        refreshToken,
        needPasswordChange,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let decodedData = null;
    try {
        decodedData = (0, JWT_1.verifyToken)(token, config_1.default.jwt.refresh_jwt_secret);
    }
    catch (error) {
        throw new AppError_1.default(403, "Invalid Refresh Token");
    }
    const { userId, email, role } = decodedData;
    const isUserExist = yield prisma_1.default.user.findUnique({
        where: {
            id: userId,
            email: email,
            isActive: true,
        },
    });
    if (!isUserExist) {
        throw new AppError_1.default(404, "User does not exist");
    }
    const newAccessToken = (0, JWT_1.generateToken)({ userId, email, role }, config_1.default.jwt.jwt_secret, config_1.default.jwt.jwt_expires_in);
    return {
        accessToken: newAccessToken,
    };
});
const changePasswordIntoDB = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: user.userId,
            email: user.email,
            isActive: true,
        },
    });
    const isCorrectPassword = yield bcrypt_1.default.compare(payload.oldPassword, userData.password);
    if (!isCorrectPassword) {
        throw new Error("Password Incorrect!");
    }
    const hashPassword = yield bcrypt_1.default.hash(payload.newPassword, 8);
    yield prisma_1.default.user.update({
        where: {
            id: user.userId,
            email: userData.email,
        },
        data: {
            password: hashPassword,
        },
    });
    return {
        success: true,
    };
});
exports.AuthServices = {
    registrationIntoDB,
    loginFromDB,
    refreshToken,
    changePasswordIntoDB,
};
