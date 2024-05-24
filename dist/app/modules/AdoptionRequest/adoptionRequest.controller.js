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
exports.AdoptionRequestControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const pick_1 = __importDefault(require("../../utils/pick"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const adoptionRequest_service_1 = require("./adoptionRequest.service");
const submitAdoptionRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const result = yield adoptionRequest_service_1.AdoptionRequestServices.submitAdoptionRequestIntoDB(userId, req.body);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Adoption request submitted successfully",
        data: result,
    });
}));
const getAllAdoptionRequests = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, ["adoptionStatus"]);
    const options = (0, pick_1.default)(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = yield adoptionRequest_service_1.AdoptionRequestServices.getAllAdoptionRequestsFromDB(filters, options);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Adoption requests retrieved successfully",
        meta: result.meta,
        data: result.data,
    });
}));
const updateAdoptionRequestStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield adoptionRequest_service_1.AdoptionRequestServices.updateAdoptionRequestStatusIntoDB(req.params.id, req.body.adoptionStatus);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Adoption request updated successfully",
        data: result,
    });
}));
exports.AdoptionRequestControllers = {
    submitAdoptionRequest,
    getAllAdoptionRequests,
    updateAdoptionRequestStatus,
};
