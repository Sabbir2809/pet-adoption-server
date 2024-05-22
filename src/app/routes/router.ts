import { Router } from "express";
import { adoptionRequestRoutes } from "../modules/AdoptionRequest/adoptionRequest.routes";
import { AuthRoutes } from "../modules/Auth/auth.routes";
import { PetRoutes } from "../modules/Pet/pet.routes";
import { UserRoutes } from "../modules/User/user.routes";
const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/pets",
    route: PetRoutes,
  },
  {
    path: "/adoption",
    route: adoptionRequestRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
