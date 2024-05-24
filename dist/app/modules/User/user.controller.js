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
exports.UserControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const pick_1 = __importDefault(require("../../utils/pick"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const user_constant_1 = require("./user.constant");
const user_service_1 = require("./user.service");
const getMyProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const result = yield user_service_1.UserServices.getMyProfileFromDB(userId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "User profile retrieved successfully",
        data: result,
    });
}));
const updateMyProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield user_service_1.UserServices.updateMyProfileInto(user, req);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "User profile updated successfully",
        data: result,
    });
}));
const getAllUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, user_constant_1.userFilterableFields);
    const options = (0, pick_1.default)(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = yield user_service_1.UserServices.getAllUserFormDB(filters, options);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Get All User profile successfully",
        meta: result.meta,
        data: result.data,
    });
}));
const changeProfileRole = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserServices.changeProfileRoleIntoDB(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "User Profile Role Change Successfully!",
        data: result,
    });
}));
const changeProfileStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserServices.changeProfileStatusIntoDB(req.params.id, req.body.status);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "User Profile Role Change Successfully!",
        data: result,
    });
}));
const dashboardMetadata = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserServices.getAdminMetadata();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "User profile retrieved successfully",
        data: result,
    });
}));
exports.UserControllers = {
    getMyProfile,
    updateMyProfile,
    getAllUser,
    changeProfileRole,
    changeProfileStatus,
    dashboardMetadata,
};
