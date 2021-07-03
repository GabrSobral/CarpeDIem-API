import { Router } from "express";
import AuthenticateUserController from "./controllers/User/AuthenticateUserController";

import CreateUserController from "./controllers/User/CreateUserController";
import ListUsersController from "./controllers/User/ListUsersController";

const routes = Router()

routes.post('/users', CreateUserController.handle)
routes.get('/users', ListUsersController.handle)
routes.post('/login', AuthenticateUserController.handle)

export { routes }