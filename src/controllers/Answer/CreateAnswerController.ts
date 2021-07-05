import { Request, Response } from "express";
import CreateAnswerService from "../../services/Answer/CreateAnswerService";

class CreateAnswerController {
  async handle(request: Request, response: Response){
    const { user, question, category, answer } = request.body

    const myAnswer = await CreateAnswerService.execute(
      { user, question, category, answer }
    )

    return response.json(myAnswer)
  }
}
export default new CreateAnswerController()