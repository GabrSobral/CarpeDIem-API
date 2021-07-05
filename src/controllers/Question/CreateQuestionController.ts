import { Request, Response } from "express";
import CreateQuestionService from "../../services/Question/CreateQuestionService";

class CreateQuestionsController {
  async handle(request: Request, response: Response) {
    const { body, category } = request.body

    const question = await CreateQuestionService.execute({ body, category })

    return response.json(question)
  }
}
export default new CreateQuestionsController()