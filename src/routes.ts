import { Router } from "express";
import CreateActivityController from "./controllers/Activity/CreateActivityController";
import ListAllActivitiesController from "./controllers/Activity/ListAllActivitiesController";
import CreateCategoryController from "./controllers/Category/CreateCategoryController";
import ListAllCategoriesController from "./controllers/Category/ListAllCategoriesController";
import CreateQuestionController from "./controllers/Question/CreateQuestionController";
import ListAllQuestionsController from "./controllers/Question/ListAllQuestionsController";

import AuthenticateUserController from "./controllers/User/AuthenticateUserController";
import CreateUserController from "./controllers/User/CreateUserController";
import ListUsersController from "./controllers/User/ListUsersController";

import { CheckAuth } from './middlewares/CheckAuth'

const routes = Router()

routes.post('/users', CreateUserController.handle)
routes.get('/users', CheckAuth, ListUsersController.handle)
routes.post('/login', AuthenticateUserController.handle)

routes.post('/activity/new', CreateActivityController.handle)
routes.get('/activity/list', ListAllActivitiesController.handle)

routes.post('/category/new', CreateCategoryController.handle)
routes.get('/category/list', ListAllCategoriesController.handle)

routes.post('/question/new', CreateQuestionController.handle)
routes.get('/question/list', ListAllQuestionsController.handle)

export { routes }