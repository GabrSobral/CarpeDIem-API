import { Router } from "express";
import ListAllActivitiesController from "./controllers/Activity/ListAllActivitiesController";
import CreateCategoryController from "./controllers/Category/CreateCategoryController";
import ListAllCategoriesController from "./controllers/Category/ListAllCategoriesController";

import AuthenticateUserController from "./controllers/User/AuthenticateUserController";
import CreateUserController from "./controllers/User/CreateUserController";
import ListUsersController from "./controllers/User/ListUsersController";

import { CheckAuth } from './middlewares/CheckAuth'

const routes = Router()

routes.post('/users', CreateUserController.handle)
routes.get('/users', CheckAuth, ListUsersController.handle)
routes.post('/login', AuthenticateUserController.handle)

routes.post('/activity/new', CreateUserController.handle)
routes.get('/activity/list', ListAllActivitiesController.handle)

routes.post('/category/new', CreateCategoryController.handle)
routes.get('/category/list', ListAllCategoriesController.handle)

export { routes }