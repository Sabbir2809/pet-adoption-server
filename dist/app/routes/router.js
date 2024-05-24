"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adoptionRequest_routes_1 = require("../modules/AdoptionRequest/adoptionRequest.routes");
const auth_routes_1 = require("../modules/Auth/auth.routes");
const pet_routes_1 = require("../modules/Pet/pet.routes");
const user_routes_1 = require("../modules/User/user.routes");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/auth",
        route: auth_routes_1.AuthRoutes,
    },
    {
        path: "/user",
        route: user_routes_1.UserRoutes,
    },
    {
        path: "/pets",
        route: pet_routes_1.PetRoutes,
    },
    {
        path: "/adoption",
        route: adoptionRequest_routes_1.adoptionRequestRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
