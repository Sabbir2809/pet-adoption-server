"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adoptionRequestRoutes = void 0;
const client_1 = require("@prisma/client");
const express_1 = require("express");
const CheckAuth_1 = __importDefault(require("../../middlewares/CheckAuth"));
const validationRequest_1 = __importDefault(require("../../middlewares/validationRequest"));
const adoptionRequest_controller_1 = require("./adoptionRequest.controller");
const adoptionRequest_validation_1 = require("./adoptionRequest.validation");
const adoptionRequestRouter = (0, express_1.Router)();
// Get Adoption Requests
// Endpoint: GET - BASE-URL/api/v1/adoption/requests
// Request Headers: Authorization: <USER_TOKEN>
adoptionRequestRouter.get("/requests", (0, CheckAuth_1.default)(client_1.UserRole.ADMIN), adoptionRequest_controller_1.AdoptionRequestControllers.getAllAdoptionRequests);
// Submit Adoption Request
// Endpoint: POST - BASE-URL/api/v1/adoption/requests
// Request Headers: Authorization: <USER_TOKEN>
adoptionRequestRouter.post("/request", (0, CheckAuth_1.default)(client_1.UserRole.USER), (0, validationRequest_1.default)(adoptionRequest_validation_1.AdoptionRequestValidationSchemes.submitAdoptionRequest), adoptionRequest_controller_1.AdoptionRequestControllers.submitAdoptionRequest);
// Update Adoption Request Status
// Endpoint: PATCH - BASE-URL/api/v1/adoption/request/:id
// Request Headers: Authorization: <ADMIN_TOKEN>
adoptionRequestRouter.patch("/request/:id", (0, CheckAuth_1.default)(client_1.UserRole.ADMIN), (0, validationRequest_1.default)(adoptionRequest_validation_1.AdoptionRequestValidationSchemes.updateAdoptionRequestStatus), adoptionRequest_controller_1.AdoptionRequestControllers.updateAdoptionRequestStatus);
exports.adoptionRequestRoutes = adoptionRequestRouter;
