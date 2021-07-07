import { Router } from "express";
import { upload } from "./config/multer";

import ListActivitiesForMeController from "./controllers/ActivitiesOfTheDay/ListActivitiesForMeController";
import ListMyActivitiesController from "./controllers/ActivitiesOfTheDay/ListMyActivitiesController";

import CreateActivityController from "./controllers/Activity/CreateActivityController";
import ListAllActivitiesController from "./controllers/Activity/ListAllActivitiesController";

import CreateAnswerController from "./controllers/Answer/CreateAnswerController";
import ListMyAnswersController from "./controllers/Answer/ListMyAnswersController";
import CreateArchiveController from "./controllers/Archive/CreateArchiveController";
import CreateArchiveActivityController from "./controllers/ArchiveActivity/CreateArchiveActivityController";

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

routes.get('/activity/my-list', CheckAuth, ListMyActivitiesController.handle)
routes.get('/activity/get-activities', CheckAuth, ListActivitiesForMeController.handle)

routes.post('/category/new', CreateCategoryController.handle)
routes.get('/category/list', ListAllCategoriesController.handle)

routes.post('/question/new', CreateQuestionController.handle)
routes.get('/question/list', ListAllQuestionsController.handle)

routes.post('/answer/new', CheckAuth, CreateAnswerController.handle)
routes.get('/answer/my-list', CheckAuth, ListMyAnswersController.handle)

routes.post('/archive/new', upload, CreateArchiveController.handle)
routes.post('/archive-activity/new', CreateArchiveActivityController.handle)

export { routes }