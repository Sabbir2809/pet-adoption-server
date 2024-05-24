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
exports.AdoptionRequestServices = void 0;
const pagination_1 = __importDefault(require("../../utils/pagination"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
const getAllAdoptionRequestsFromDB = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = (0, pagination_1.default)(options);
    const filterData = __rest(params, []);
    const andConditions = [];
    // specific field
    if (Object.keys(filterData).length > 0) {
        const filterConditions = Object.keys(filterData).map((key) => ({
            [key]: {
                equals: filterData[key],
            },
        }));
        andConditions.push(...filterConditions);
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    // find many
    const result = yield prisma_1.default.adoptionRequest.findMany({
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
        include: {
            user: {
                select: {
                    username: true,
                    email: true,
                    phone: true,
                    address: true,
                    avatarURL: true,
                },
            },
        },
    });
    // count pet table data
    const total = yield prisma_1.default.adoptionRequest.count({
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
const submitAdoptionRequestIntoDB = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: userId,
            isActive: true,
        },
    });
    const result = yield prisma_1.default.adoptionRequest.create({
        data: Object.assign(Object.assign({}, payload), { userId }),
    });
    return result;
});
const updateAdoptionRequestStatusIntoDB = (id, adoptionStatus) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.adoptionRequest.update({
        where: { id },
        data: { adoptionStatus },
    });
    return result;
});
exports.AdoptionRequestServices = {
    submitAdoptionRequestIntoDB,
    getAllAdoptionRequestsFromDB,
    updateAdoptionRequestStatusIntoDB,
};
