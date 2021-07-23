import { Router } from "express";
import { upload } from "./config/multer";
import { CheckAuth } from './middlewares/CheckAuth'

import ListUsersController from "./controllers/User/ListUsersController";
import CreateUserController from "./controllers/User/CreateUserController";
import AuthenticateUserController from "./controllers/User/AuthenticateUserController";

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
import DeleteArchiveController from "./controllers/Archive/DeleteArchiveController";
import ListAllArchivesController from "./controllers/Archive/ListAllArchivesController";

import CreateCategoryController from "./controllers/Category/CreateCategoryController";
import DeleteCategoryController from "./controllers/Category/DeleteCategoryController";
import ListAllCategoriesController from "./controllers/Category/ListAllCategoriesController";

import DeleteQuestionController from "./controllers/Question/DeleteQuestionController";
import CreateQuestionController from "./controllers/Question/CreateQuestionController";
import ListAllQuestionsController from "./controllers/Question/ListAllQuestionsController";

import DeleteArchiveActivityController from "./controllers/ArchiveActivity/DeleteArchiveActivityController";
import CreateArchiveActivityController from "./controllers/ArchiveActivity/CreateArchiveActivityController";
import ListAllArchiveActivityController from "./controllers/ArchiveActivity/ListAllArchiveActivityController";

import CreateFeedbackController from "./controllers/Feedback/CreateFeedbackController";
import ListMyFeedbacksController from "./controllers/Feedback/ListMyFeedbacksController";
import DeleteFeedbackController from "./controllers/Feedback/DeleteFeedbackController";


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
routes.delete('/question/delete/:id', CheckAuth, DeleteQuestionController.handle)

routes.post('/answer/new', CheckAuth, CreateAnswerController.handle)
routes.get('/answer/my-list', CheckAuth, ListMyAnswersController.handle)

routes.get('/archive/list', CheckAuth, upload, ListAllArchivesController.handle)
routes.post('/archive/new', CheckAuth, upload, CreateArchiveController.handle)
routes.delete('/archive/delete/:id', CheckAuth, DeleteArchiveController.handle)

routes.post('/archive-activity/new', CheckAuth, CreateArchiveActivityController.handle)
routes.get('/archive-activity/list', CheckAuth, ListAllArchiveActivityController.handle)
routes.delete('/archive-activity/delete/:id', CheckAuth, DeleteArchiveActivityController.handle)

routes.post('/feedback/new', CheckAuth, CreateFeedbackController.handle)
routes.get('/feedback/my-list', CheckAuth, ListMyFeedbacksController.handle)
routes.delete('/feedback/delete/:id', CheckAuth, DeleteFeedbackController.handle)

export { routes }