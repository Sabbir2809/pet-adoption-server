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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const client_1 = require("@prisma/client");
const fileUploader_1 = require("../../utils/fileUploader");
const pagination_1 = __importDefault(require("../../utils/pagination"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
const user_constant_1 = require("./user.constant");
const user_util_1 = require("./user.util");
const getMyProfileFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: userId,
        },
        select: {
            id: true,
            username: true,
            email: true,
            needPasswordChange: true,
            role: true,
            gender: true,
            phone: true,
            address: true,
            avatarURL: true,
            adoptionRequests: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return result;
});
const updateMyProfileInto = (user, req) => __awaiter(void 0, void 0, void 0, function* () {
    // check valid user
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: user.userId,
            isActive: true,
        },
    });
    const file = req.file;
    if (file) {
        const uploadToCloudinary = yield fileUploader_1.fileUploader.uploadToCloudinary(file);
        req.body.avatarURL = uploadToCloudinary === null || uploadToCloudinary === void 0 ? void 0 : uploadToCloudinary.secure_url;
    }
    let profileUpdateInfo;
    if (userData.role === client_1.UserRole.ADMIN) {
        profileUpdateInfo = yield prisma_1.default.user.update({
            where: {
                id: userData.id,
            },
            data: req.body,
        });
    }
    else if (userData.role === client_1.UserRole.USER) {
        profileUpdateInfo = yield prisma_1.default.user.update({
            where: {
                id: userData.id,
            },
            data: req.body,
        });
    }
    return Object.assign({}, profileUpdateInfo);
});
const getAllUserFormDB = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = (0, pagination_1.default)(options);
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    const andConditions = [];
    // only searchTerm
    if (params.searchTerm) {
        andConditions.push({
            OR: user_constant_1.userSearchAbleFields.map((field) => ({
                [field]: {
                    contains: params.searchTerm,
                    mode: "insensitive",
                },
            })),
        });
    }
    // specific field
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: filterData[key],
                },
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.user.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
                createdAt: "desc",
            },
        select: {
            id: true,
            username: true,
            email: true,
            needPasswordChange: true,
            role: true,
            phone: true,
            isActive: true,
            address: true,
            avatarURL: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    const total = yield prisma_1.default.user.count({
        where: whereConditions,
    });
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const changeProfileRoleIntoDB = (id, role) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const updateUserRole = yield prisma_1.default.user.update({
        where: {
            id,
        },
        data: role,
        select: {
            id: true,
            email: true,
            role: true,
            needPasswordChange: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return updateUserRole;
});
const changeProfileStatusIntoDB = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const updateUserRole = yield prisma_1.default.user.update({
        where: {
            id,
        },
        data: {
            isActive: status,
        },
        select: {
            id: true,
            email: true,
            role: true,
            needPasswordChange: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return updateUserRole;
});
const getAdminMetadata = () => __awaiter(void 0, void 0, void 0, function* () {
    const petCount = yield prisma_1.default.pet.count();
    const userCount = yield prisma_1.default.user.count();
    const approvedCount = yield prisma_1.default.adoptionRequest.aggregate({
        _count: {
            userId: true,
        },
        where: {
            adoptionStatus: client_1.AdoptionStatus.APPROVED,
        },
    });
    const pieChartData = yield (0, user_util_1.getPieChartData)();
    return {
        petCount,
        userCount,
        approvedCount,
        pieChartData,
    };
});
exports.UserServices = {
    getMyProfileFromDB,
    updateMyProfileInto,
    getAllUserFormDB,
    changeProfileRoleIntoDB,
    changeProfileStatusIntoDB,
    getAdminMetadata,
};
