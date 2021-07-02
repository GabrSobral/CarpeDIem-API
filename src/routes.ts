import { Router } from "express";
import CreateUserController from "./controllers/User/CreateUserController";

const routes = Router()

routes.post('/users', CreateUserController.handle)

export { routes }