import { Router } from "express";
import { upload } from "./config/multer";
import { CheckAuth } from './middlewares/CheckAuth'

import ListActivitiesForMeController from "./controllers/ActivitiesOfTheDay/ListActivitiesForMeController";
import ListMyActivitiesController from "./controllers/ActivitiesOfTheDay/ListMyActivitiesController";
import FinishAnActivityController from "./controllers/ActivitiesOfTheDay/FinishAnActivityController";
import DeleteMyActivityController from "./controllers/ActivitiesOfTheDay/DeleteMyActivityController";

import ChangeActivityController from "./controllers/Activity/ChangeActivityController";
import CreateActivityController from "./controllers/Activity/CreateActivityController";
import ListAllActivitiesController from "./controllers/Activity/ListAllActivitiesController";
import ShowOneActivityController from "./controllers/Activity/ShowOneActivityController";
import DeleteActivityController from "./controllers/Activity/DeleteActivityController";

import CreateAnswerController from "./controllers/Answer/CreateAnswerController";
import ListMyAnswersController from "./controllers/Answer/ListMyAnswersController";

import CreateArchiveController from "./controllers/Archive/CreateArchiveController";
import ListAllArchivesController from "./controllers/Archive/ListAllArchivesController";
import CreateArchiveActivityController from "./controllers/ArchiveActivity/CreateArchiveActivityController";

import CreateCategoryController from "./controllers/Category/CreateCategoryController";
import ListAllCategoriesController from "./controllers/Category/ListAllCategoriesController";

import CreateQuestionController from "./controllers/Question/CreateQuestionController";
import ListAllQuestionsController from "./controllers/Question/ListAllQuestionsController";

import AuthenticateUserController from "./controllers/User/AuthenticateUserController";
import CreateUserController from "./controllers/User/CreateUserController";
import ListUsersController from "./controllers/User/ListUsersController";
import ListAllArchiveActivityController from "./controllers/ArchiveActivity/ListAllArchiveActivityController";
import DeleteArchiveActivityController from "./controllers/ArchiveActivity/DeleteArchiveActivityController";
import DeleteArchiveController from "./controllers/Archive/DeleteArchiveController";
import DeleteCategoryController from "./controllers/Category/DeleteCategoryController";


const routes = Router()

routes.post('/users', CreateUserController.handle)
routes.get('/users', CheckAuth, ListUsersController.handle)
routes.post('/login', AuthenticateUserController.handle)

routes.patch('/activity/update/:id', CheckAuth, ChangeActivityController.handle)
routes.post('/activity/new', CheckAuth, CreateActivityController.handle)
routes.get('/activity/list', CheckAuth, ListAllActivitiesController.handle)
routes.delete('/activity/delete/:id', CheckAuth, DeleteActivityController.handle)
routes.get('/activity/show/:id', CheckAuth, ShowOneActivityController.handle)

routes.get('/activity/my-list', CheckAuth, ListMyActivitiesController.handle)
routes.get('/activity/get-activities', CheckAuth, ListActivitiesForMeController.handle)
routes.delete('/activity/finish/:id', CheckAuth, FinishAnActivityController.handle)
routes.delete('/activity/my-delete/:id', CheckAuth, DeleteMyActivityController.handle)

routes.post('/category/new', CheckAuth, CreateCategoryController.handle)
routes.get('/category/list', CheckAuth,ListAllCategoriesController.handle)
routes.delete('/category/delete/:id', CheckAuth, DeleteCategoryController.handle)

routes.post('/question/new', CheckAuth,CreateQuestionController.handle)
routes.get('/question/list', CheckAuth,ListAllQuestionsController.handle)

routes.post('/answer/new', CheckAuth, CreateAnswerController.handle)
routes.get('/answer/my-list', CheckAuth, ListMyAnswersController.handle)

routes.get('/archive/list', CheckAuth, upload, ListAllArchivesController.handle)
routes.post('/archive/new', CheckAuth, upload, CreateArchiveController.handle)
routes.delete('/archive/delete/:id', CheckAuth, DeleteArchiveController.handle)

routes.post('/archive-activity/new', CheckAuth, CreateArchiveActivityController.handle)
routes.get('/archive-activity/list', CheckAuth, ListAllArchiveActivityController.handle)
routes.delete('/archive-activity/delete/:id', CheckAuth, DeleteArchiveActivityController.handle)

export { routes }