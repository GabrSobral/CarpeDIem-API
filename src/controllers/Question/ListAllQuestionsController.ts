import { Request, Response } from "express";
import ListAllQuestionsService from "../../services/Question/ListAllQuestionsService";

class ListAllQuestionsController {
  async handle(request: Request, response: Response) {
    const AllQuestions = await ListAllQuestionsService.execute()

    return response.json(AllQuestions)
  }
}
export default new ListAllQuestionsController()